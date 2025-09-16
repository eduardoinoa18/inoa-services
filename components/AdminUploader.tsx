"use client";
import { useCallback, useRef, useState } from "react";

type Kind = "logo" | "favicon" | "founder" | "about" | "team" | "generic";

export default function AdminUploader({ label, kind = "generic", onUploaded }: { label: string; kind?: Kind; onUploaded: (url: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const [busy, setBusy] = useState(false);

  const onDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault(); setDrag(false);
    if (!e.dataTransfer.files?.length) return;
    await upload(e.dataTransfer.files[0]);
  }, []);

  const upload = async (file: File) => {
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('filename', file.name);
      fd.append('kind', kind);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Upload failed');
      onUploaded(json.url);
    } finally { setBusy(false); }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div
        className={`rounded-xl border-2 border-dashed p-4 text-sm text-gray-600 ${drag ? 'bg-blue-50 border-blue-300' : 'bg-white'}`}
        onDragOver={(e)=>{e.preventDefault(); setDrag(true);}}
        onDragLeave={()=>setDrag(false)}
        onDrop={onDrop}
      >
        <div className="flex items-center justify-between gap-3">
          <div>{busy ? 'Uploading…' : 'Drag & drop image here, or choose a file'}</div>
          <button type="button" className="px-3 py-1.5 rounded-lg border text-xs" onClick={()=>inputRef.current?.click()} disabled={busy}>Choose</button>
        </div>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e)=>{ const f=e.target.files?.[0]; if(f) upload(f); }} />
      </div>
    </div>
  );
}
