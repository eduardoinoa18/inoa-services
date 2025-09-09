"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const [otp, setOtp] = useState("");
  const [mfaToken, setMfaToken] = useState<string | null>(null);

  const start = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await fetch('/api/auth/mfa-start', {
      method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      const j = await res.json().catch(()=>({error:'Login failed'}));
      setError(j.error || 'Login failed');
      return;
    }
    const { token } = await res.json();
    setMfaToken(token);
    setStep(2);
  };

  const verify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await fetch('/api/auth/mfa-verify', {
      method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ token: mfaToken, otp })
    });
    if (!res.ok) {
      const j = await res.json().catch(()=>({error:'Invalid code'}));
      setError(j.error || 'Invalid code');
      return;
    }
    // On success, perform actual signIn (Credentials) to establish session
    await signIn('credentials', { redirect: true, email, password, callbackUrl: '/admin' });
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50/50">
      <form onSubmit={step===1?start:verify} className="bg-white/80 backdrop-blur p-6 md:p-8 rounded-2xl shadow border w-[92%] max-w-sm">
        <h2 className="text-2xl font-bold mb-1 text-center text-gray-800">Admin Login</h2>
        <p className="text-sm text-gray-500 mb-6 text-center">{step===1 ? 'Enter your credentials' : 'Enter the 6‑digit code we emailed you'}</p>
        {error && <div className="mb-3 text-sm text-red-600">{error}</div>}
        {step===1 ? (
          <>
            <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full p-2.5 mb-3 border rounded-xl" />
            <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full p-2.5 mb-4 border rounded-xl" />
            <button type="submit" className="bg-gray-900 text-white w-full py-2.5 rounded-xl font-medium">Continue</button>
          </>
        ) : (
          <>
            <input inputMode="numeric" pattern="[0-9]*" maxLength={6} placeholder="6-digit code" value={otp} onChange={(e)=>setOtp(e.target.value)} className="w-full p-2.5 mb-4 border rounded-xl tracking-widest text-center" />
            <div className="flex gap-2">
              <button type="button" onClick={()=>{setStep(1); setOtp("");}} className="w-1/2 border rounded-xl py-2.5">Back</button>
              <button type="submit" className="w-1/2 bg-gray-900 text-white py-2.5 rounded-xl font-medium">Verify</button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
