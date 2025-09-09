"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await signIn("credentials", {
      redirect: true,
      email,
      password,
      callbackUrl: "/admin",
    });
    // signIn redirects on success; on error, next-auth appends ?error=CredentialsSignin
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50/50">
      <form onSubmit={handleLogin} className="bg-white/80 backdrop-blur p-6 md:p-8 rounded-2xl shadow border w-[92%] max-w-sm">
        <h2 className="text-2xl font-bold mb-1 text-center text-gray-800">Admin Login</h2>
        <p className="text-sm text-gray-500 mb-6 text-center">Access the Inoa Admin Dashboard</p>
        {error && <div className="mb-3 text-sm text-red-600">{error}</div>}
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full p-2.5 mb-3 border rounded-xl" />
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full p-2.5 mb-4 border rounded-xl" />
        <button type="submit" className="bg-gray-900 text-white w-full py-2.5 rounded-xl font-medium">Login</button>
      </form>
    </div>
  );
}
