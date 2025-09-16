"use client";
import { useEffect, useMemo, useState } from "react";
import UploadDropzone from "./UploadDropzone";

type TeamMember = { name: string; title?: string; bio?: string; image: string; socials?: { label: string; href: string }[] };
type State = {
  logoUrl?: string | null;
  faviconUrl?: string | null;
  founderUrl?: string | null;
  team: TeamMember[];
  aboutGallery: string[];
};

export default function SettingsMediaManager() {
  const [state, setState] = useState<State>({ team: [], aboutGallery: [] });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string|undefined>();

  useEffect(() => {
    let cancelled = false;
    fetch('/api/settings').then(r=>r.json()).then(json => {
      if (cancelled) return;
      setState({
        logoUrl: json?.data?.logoUrl ?? undefined,
        faviconUrl: json?.data?.faviconUrl ?? undefined,
        founderUrl: json?.data?.founderUrl ?? undefined,
        team: Array.isArray(json?.data?.team) ? json.data.team : [],
        aboutGallery: Array.isArray(json?.data?.aboutGallery) ? json.data.aboutGallery : [],
      });
    }).catch(()=>{});
    return () => { cancelled = true; };
  }, []);

  const save = async () => {
    setBusy(true); setError(undefined);
    try {
      const res = await fetch('/api/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(state) });
      if (!res.ok) {
        const j = await res.json().catch(()=>({}));
        throw new Error(j?.error || 'Failed to save');
      }
    } catch (e:any) { setError(e.message || 'Error'); }
    finally { setBusy(false); }
  };

  const addMember = () => setState(s => ({ ...s, team: [...s.team, { name: '', title: '', bio: '', image: '' }] }));
  const removeMember = (idx: number) => setState(s => ({ ...s, team: s.team.filter((_,i)=>i!==idx) }));

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="rounded-2xl border p-4 bg-white">
          <h3 className="font-semibold text-gray-800 mb-3">Logo</h3>
          <UploadDropzone label="Upload logo" onUploaded={(f)=>setState(s=>({...s, logoUrl:f.url}))} />
          <div className="text-xs text-gray-600 mt-2">Current: {state.logoUrl ? <a className="text-blue-600 underline" href={state.logoUrl} target="_blank">{short(state.logoUrl)}</a> : '—'}</div>
        </div>
        <div className="rounded-2xl border p-4 bg-white">
          <h3 className="font-semibold text-gray-800 mb-3">Favicon</h3>
          <UploadDropzone label="Upload favicon" onUploaded={(f)=>setState(s=>({...s, faviconUrl:f.url}))} />
          <div className="text-xs text-gray-600 mt-2">Current: {state.faviconUrl ? <a className="text-blue-600 underline" href={state.faviconUrl} target="_blank">{short(state.faviconUrl)}</a> : '—'}</div>
        </div>
        <div className="rounded-2xl border p-4 bg-white">
          <h3 className="font-semibold text-gray-800 mb-3">Founder Photo</h3>
          <UploadDropzone label="Upload founder photo" onUploaded={(f)=>setState(s=>({...s, founderUrl:f.url}))} />
          <div className="text-xs text-gray-600 mt-2">Current: {state.founderUrl ? <a className="text-blue-600 underline" href={state.founderUrl} target="_blank">{short(state.founderUrl)}</a> : '—'}</div>
        </div>
      </div>

      <div className="rounded-2xl border p-4 bg-white">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-800">About Gallery</h3>
          <UploadDropzone label="Add image to gallery" onUploaded={(f)=>setState(s=>({...s, aboutGallery:[...s.aboutGallery, f.url]}))} />
        </div>
        {state.aboutGallery.length===0 ? (
          <div className="text-sm text-gray-600 mt-3">No images yet</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {state.aboutGallery.map((u,idx)=> (
              <div key={u+idx} className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={u} alt="Gallery" className="w-full aspect-[4/3] object-cover rounded-xl border" />
                <button className="absolute top-2 right-2 px-2 py-1 rounded-md text-xs bg-white/90 border" onClick={()=>setState(s=>({...s, aboutGallery: s.aboutGallery.filter((_,i)=>i!==idx)}))}>Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-2xl border p-4 bg-white">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-800">Team Members</h3>
          <button className="px-3 py-1.5 rounded-lg border text-sm" onClick={addMember}>Add Member</button>
        </div>
        <div className="grid gap-4">
          {state.team.length===0 && <div className="text-sm text-gray-600">No team members yet</div>}
          {state.team.map((m,idx)=> (
            <div key={idx} className="grid md:grid-cols-[120px,1fr,auto] gap-3 items-start rounded-xl border p-3">
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {m.image ? <img src={m.image} alt={m.name||'Member'} className="w-24 h-24 object-cover rounded-xl border" /> : <div className="w-24 h-24 rounded-xl border grid place-items-center text-xs text-gray-500">No photo</div>}
                <div className="mt-2">
                  <UploadDropzone label="Upload photo" onUploaded={(f)=>setState(s=>({ ...s, team: s.team.map((mm,i)=> i===idx ? { ...mm, image: f.url } : mm ) }))} />
                </div>
              </div>
              <div className="grid gap-2">
                <input className="px-3 py-2 border rounded-lg" placeholder="Name" value={m.name} onChange={e=>setState(s=>({ ...s, team: s.team.map((mm,i)=> i===idx ? { ...mm, name: e.target.value } : mm ) }))} />
                <input className="px-3 py-2 border rounded-lg" placeholder="Title" value={m.title||''} onChange={e=>setState(s=>({ ...s, team: s.team.map((mm,i)=> i===idx ? { ...mm, title: e.target.value } : mm ) }))} />
                <textarea className="px-3 py-2 border rounded-lg" rows={3} placeholder="Bio" value={m.bio||''} onChange={e=>setState(s=>({ ...s, team: s.team.map((mm,i)=> i===idx ? { ...mm, bio: e.target.value } : mm ) }))} />
              </div>
              <div className="flex flex-col gap-2 items-end">
                <button className="px-3 py-1.5 rounded-lg border text-xs" onClick={()=>removeMember(idx)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}
      <button className="px-4 py-2 rounded-xl bg-gray-900 text-white text-sm font-medium" onClick={save} disabled={busy}>{busy ? 'Saving…' : 'Save Settings'}</button>
    </div>
  );
}

function short(url: string) {
  try { const u = new URL(url); return (u.hostname + u.pathname).slice(0, 48) + (u.pathname.length>48?'…':''); } catch { return url.slice(0,48) + (url.length>48?'…':''); }
}
