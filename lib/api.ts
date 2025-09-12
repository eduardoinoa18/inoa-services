export async function apiGet<T = any>(url: string): Promise<T> {
  const res = await fetch(url, { credentials: 'include' });
  if (!res.ok) throw new Error(`GET ${url} ${res.status}`);
  return res.json();
}

export async function apiPost<T = any>(url: string, body: any): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`POST ${url} ${res.status}`);
  return res.json();
}