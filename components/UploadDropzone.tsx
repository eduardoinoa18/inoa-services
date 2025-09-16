"use client";
import { useCallback, useState } from "react";

type Props = {
  label?: string;
  onUploaded: (file: { url: string; name: string; type: string; size: number }) => void;
  accept?: string;
};

export default function UploadDropzone({ label = "Upload image", onUploaded, accept = "image/*" }: Props) {
  const [dragOver, setDragOver] = useState(false);
  const [busy, setBusy] = useState(false);

  const uploadFile = useCallback(async (file: File) => {
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      if (!res.ok) throw new Error('Upload failed');
      const json = await res.json();
      onUploaded(json);
    } finally {
      setBusy(false);
    }
  }, [onUploaded]);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  }, [uploadFile]);

  const onPick = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  }, [uploadFile]);

  return (
    <div className={`rounded-xl border border-dashed p-4 text-center ${dragOver ? 'bg-blue-50' : 'bg-white'}`}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={onDrop}
    >
      <div className="text-sm text-gray-700 mb-2">{label}</div>
      <div className="text-xs text-gray-500 mb-3">Drag & drop or click to select</div>
      <input type="file" accept={accept} className="hidden" id="uploader-input" onChange={onPick} />
      <label htmlFor="uploader-input" className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm ${busy ? 'opacity-60 pointer-events-none' : ''}`}>Choose file</label>
    </div>
  );
}
