"use client";
import { useEffect, useMemo, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from 'recharts';

/************************* Types *************************/
interface ClientRecord {
  id: string;
  name: string;
  email: string;
  phone?: string;
  services: string[];
  tags: string[];
  notes?: string;
  createdAt: string; // ISO Date
  status: 'prospect' | 'active' | 'inactive';
  assignedTo?: string; // staff email
}

interface AppointmentRecord {
  id: string;
  title: string;
  date: string; // ISO
  type: 'appointment' | 'task' | 'off';
  service?: string;
  notes?: string;
}

interface SOPRecord {
  id: string;
  title: string;
  category: string;
  content: string;
  link?: string;
  createdAt: string;
}

interface RevenueRecord {
  id: string;
  date: string; // ISO
  service: string;
  amount: number;
  clientId?: string;
  notes?: string;
}

interface SettingsData {
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  adminLoginUrl: string;
  currentRole: Role; // UI/permissions prototype
  otpExpiryMins?: number;
  rateLimitWindow?: number;
}

type Role = 'owner' | 'admin' | 'staff' | 'viewer';
interface StaffUser { id: string; name: string; email: string; role: Role }

// Leads / Forms / Content models
interface LeadRecord {
  id: string;
  name: string;
  email: string;
  phone?: string;
  tags: string[];
  notes?: string;
  score?: number; // 1-100
  stage: 'new' | 'contacted' | 'negotiation' | 'won' | 'lost';
  source?: string;
  createdAt: string;
  assignedTo?: string;
}

interface SubmissionRecord {
  id: string;
  type: 'contact' | 'estimate' | 'custom';
  name: string;
  email: string;
  phone?: string;
  message?: string;
  payload?: any;
  createdAt: string;
  assignedTo?: string;
}

interface SiteContent {
  about: string;
  disclosures: string;
  navLinks: { label: string; href: string }[];
  brand: { logoUrl?: string; faviconUrl?: string; primary?: string };
}

/************************* Helpers *************************/
const uid = () => Math.random().toString(36).slice(2, 11);
const todayISO = () => new Date().toISOString().slice(0,10);

function loadLS<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) as T : fallback; } catch { return fallback; }
}
function saveLS<T>(key: string, value: T) { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} }

/************************* UI Primitives *************************/
function Card(props: {title?: string; children: any; actions?: any; className?: string; subtle?: boolean}) {
  return (
    <div className={`rounded-2xl border ${props.subtle ? 'border-gray-200 bg-white/60 backdrop-blur-md' : 'border-gray-200 bg-white'} shadow-sm p-5 flex flex-col gap-4 ${props.className||''}`}>
      <div className="flex items-start justify-between gap-4 min-h-[1.5rem]">
        {props.title && <h3 className="font-semibold tracking-tight text-gray-800">{props.title}</h3>}
        {props.actions}
      </div>
      {props.children}
    </div>
  );
}

function TabButton({active, onClick, children}:{active:boolean; onClick:()=>void; children:any}) {
  return <button onClick={onClick} className={`px-4 h-11 rounded-xl text-sm font-medium transition relative ${active ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>{children}</button>;
}

function Pill({children}:{children:any}) { return <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-[11px] font-medium tracking-wide">{children}</span>; }

/************************* Main Component *************************/
export default function AdminPage() {
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [clients, setClients] = useState<ClientRecord[]>(() => loadLS('adm_clients', []));
  const [appointments, setAppointments] = useState<AppointmentRecord[]>(() => loadLS('adm_appts', []));
  const [leads, setLeads] = useState<LeadRecord[]>(() => loadLS('adm_leads', []));
  const [sops, setSops] = useState<SOPRecord[]>(() => loadLS('adm_sops', []));
  const [revenue, setRevenue] = useState<RevenueRecord[]>(() => loadLS('adm_revenue', []));
  const [settings, setSettings] = useState<SettingsData>(() => loadLS('adm_settings', {
    businessName: 'Inoa Services', ownerName: '', email: '', phone: '', address: '', adminLoginUrl: '/admin', currentRole: 'owner' as Role, otpExpiryMins: 5, rateLimitWindow: 5
  }));
  const [staff, setStaff] = useState<StaffUser[]>(() => loadLS('adm_staff', []));
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>(() => loadLS('adm_submissions', []));
  const [site, setSite] = useState<SiteContent>(() => loadLS('adm_site', { about: '', disclosures: '', navLinks: [
    {label: 'Home', href: '/'}, {label: 'Services', href: '#services'}, {label: 'Pricing', href: '/pricing'}, {label: 'About', href: '/about'}
  ], brand: {} }));

  useEffect(()=>saveLS('adm_clients', clients),[clients]);
  useEffect(()=>saveLS('adm_appts', appointments),[appointments]);
  useEffect(()=>saveLS('adm_sops', sops),[sops]);
  useEffect(()=>saveLS('adm_revenue', revenue),[revenue]);
  useEffect(()=>saveLS('adm_settings', settings),[settings]);
  useEffect(()=>saveLS('adm_staff', staff),[staff]);
  useEffect(()=>saveLS('adm_leads', leads),[leads]);
  useEffect(()=>saveLS('adm_submissions', submissions),[submissions]);
  useEffect(()=>saveLS('adm_site', site),[site]);

  /* Derived metrics */
  const activeClients = clients.filter(c=>c.status==='active').length;
  const monthRevenue = useMemo(()=>{
    const month = new Date().toISOString().slice(0,7); // YYYY-MM
    return revenue.filter(r=>r.date.startsWith(month)).reduce((a,b)=>a+b.amount,0);
  },[revenue]);
  const topServices = useMemo(()=>{
    const counts: Record<string, number> = {};
    revenue.forEach(r=>{ counts[r.service] = (counts[r.service]||0) + r.amount; });
    return Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,5);
  },[revenue]);

  const revenueByMonth = useMemo(()=>{
    const map: Record<string, number> = {};
    revenue.forEach(r=>{ const key = r.date.slice(0,7); map[key] = (map[key]||0) + r.amount; });
    return Object.entries(map).sort((a,b)=>a[0].localeCompare(b[0])).map(([m,v])=>({month:m, value:v}));
  },[revenue]);

  // Role-based tabs
  type TabKey = 'dashboard'|'crm'|'calendar'|'website'|'forms'|'content'|'analytics'|'revenue'|'users'|'settings'|'help';
  const [tab, setTab] = useState<TabKey>('dashboard');

  const navItems: { key: TabKey; label: string; roles: Role[] }[] = [
    { key: 'dashboard', label: 'Dashboard', roles: ['owner','admin','staff','viewer'] },
    { key: 'crm', label: 'CRM', roles: ['owner','admin','staff','viewer'] },
    { key: 'calendar', label: 'Calendar', roles: ['owner','admin','staff','viewer'] },
    { key: 'website', label: 'Website', roles: ['owner','admin'] },
    { key: 'forms', label: 'Forms', roles: ['owner','admin'] },
    { key: 'content', label: 'Content', roles: ['owner','admin'] },
    { key: 'analytics', label: 'Analytics', roles: ['owner','admin'] },
    { key: 'revenue', label: 'Revenue', roles: ['owner','admin'] },
    { key: 'users', label: 'Users', roles: ['owner','admin'] },
    { key: 'settings', label: 'Settings', roles: ['owner','admin'] },
    { key: 'help', label: 'Help', roles: ['owner','admin','staff','viewer'] },
  ];
  const visibleNav = navItems.filter(n => n.roles.includes(settings.currentRole));
  useEffect(() => {
  if (!visibleNav.find(n=>n.key===tab)) setTab(visibleNav[0]?.key || 'dashboard');
  }, [settings.currentRole]);

  const currentUserEmail = (session?.user?.email as string) || settings.email; // prefer authenticated email

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/40 flex">
      {/* Sidebar */}
      <aside className={`fixed z-30 inset-y-0 left-0 w-64 transform transition-transform duration-200 ease-out bg-white border-r ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:block`}>
        <div className="h-16 px-4 flex items-center gap-3 border-b">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 grid place-items-center text-white font-bold text-sm shadow">IN</div>
          <div>
            <div className="font-semibold tracking-tight text-gray-800">Admin</div>
            <div className="text-xs text-gray-500 capitalize">{settings.currentRole}</div>
          </div>
        </div>
        <nav className="p-3 space-y-1">
          {visibleNav.map(n => (
            <button key={n.key} onClick={()=>{setTab(n.key); setSidebarOpen(false);}} className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium ${tab===n.key ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>{n.label}</button>
          ))}
        </nav>
      </aside>

      {/* Main column */}
      <div className="flex-1 min-w-0 flex flex-col">
    <header className="h-16 px-4 md:px-6 flex items-center justify-between border-b bg-white/70 backdrop-blur">
          <button className="md:hidden px-3 py-2 rounded-lg border" onClick={()=>setSidebarOpen(v=>!v)}>Menu</button>
          <div className="flex items-center gap-3">
      <a href="/" target="_blank" className="px-3 py-1.5 rounded-lg border text-xs">View Landing Page</a>
      <div className="text-sm text-gray-600 truncate">{currentUserEmail || 'Set your email in Settings'}</div>
            <button onClick={()=>signOut({ callbackUrl: '/admin-login' })} className="px-3 py-1.5 rounded-lg border text-xs">Sign out</button>
          </div>
        </header>
        <main className="flex-1 px-4 md:px-6 py-6 max-w-7xl w-full mx-auto space-y-8">
    {tab==='dashboard' && <DashboardTab activeClients={activeClients} totalClients={clients.length} monthRevenue={monthRevenue} topServices={topServices} revenueByMonth={revenueByMonth} />}
    {tab==='crm' && <CRMTab leads={leads} setLeads={setLeads} clients={clients} setClients={setClients} staff={staff} role={settings.currentRole} currentUserEmail={currentUserEmail} />}
    {tab==='calendar' && <CalendarTab appointments={appointments} setAppointments={setAppointments} />}
    {tab==='website' && <WebsiteTab site={site} setSite={setSite} />}
    {tab==='forms' && <FormsTab submissions={submissions} setSubmissions={setSubmissions} />}
    {tab==='content' && <ContentTab sops={sops} setSops={setSops} />}
    {tab==='analytics' && <AnalyticsTab leads={leads} revenueByMonth={revenueByMonth} topServices={topServices} />}
    {tab==='revenue' && <RevenueTab revenue={revenue} setRevenue={setRevenue} />}
    {tab==='users' && <UsersTab staff={staff} setStaff={setStaff} />}
    {tab==='settings' && <SettingsTab settings={settings} setSettings={setSettings} staff={staff} setStaff={setStaff} />}
    {tab==='help' && <HelpTab />}
        </main>
        <footer className="h-14 border-t bg-white/70 backdrop-blur flex items-center justify-between px-4 md:px-6 text-xs text-gray-500">
          <div>© {new Date().getFullYear()} {settings.businessName || 'Inoa Services'} Admin</div>
          <a href={settings.adminLoginUrl || '/admin/login'} className="px-3 py-1.5 rounded-lg border border-gray-300 hover:border-gray-400 hover:bg-gray-100 text-gray-700 font-medium">Login</a>
        </footer>
      </div>
    </div>
  );
}
/************************* CRM (Leads + Clients) *************************/
function CRMTab({leads,setLeads,clients,setClients, staff, role, currentUserEmail}:{leads:LeadRecord[]; setLeads:(l:LeadRecord[])=>void; clients:ClientRecord[]; setClients:(c:ClientRecord[])=>void; staff:StaffUser[]; role:Role; currentUserEmail?:string|null}){
  const [inner, setInner] = useState<'leads'|'clients'>('leads');
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <TabButton active={inner==='leads'} onClick={()=>setInner('leads')}>Leads</TabButton>
        <TabButton active={inner==='clients'} onClick={()=>setInner('clients')}>Clients</TabButton>
      </div>
      {inner==='leads' ? (
        <LeadsTab leads={leads} setLeads={setLeads} staff={staff} role={role} currentUserEmail={currentUserEmail} />
      ) : (
        <ClientsTab clients={clients} setClients={setClients} staff={staff} role={role} currentUserEmail={currentUserEmail} />
      )}
    </div>
  );
}

function LeadsTab({leads,setLeads, staff, role, currentUserEmail}:{leads:LeadRecord[]; setLeads:(l:LeadRecord[])=>void; staff:StaffUser[]; role:Role; currentUserEmail?:string|null}){
  const blank: LeadRecord = { id: uid(), name:'', email:'', phone:'', tags:[], notes:'', score:50, stage:'new', source:'', createdAt: new Date().toISOString(), assignedTo: role==='staff' ? (currentUserEmail||'') : '' };
  const [form, setForm] = useState<LeadRecord>(blank);
  const [editing, setEditing] = useState<string|null>(null);
  const [query, setQuery] = useState('');
  const canEdit = role==='owner' || role==='admin' || role==='staff';
  const roleFiltered = role==='staff' ? leads.filter(l=>l.assignedTo===currentUserEmail) : leads;
  const filtered = roleFiltered.filter(l=> [l.name,l.email,l.phone,l.tags.join(' '),l.source,l.stage].some(v=>v?.toLowerCase().includes(query.toLowerCase())));
  const submit = (e:any)=>{ e.preventDefault(); if(!canEdit) return; if(!form.name||!form.email) return; if(editing){ setLeads(leads.map(l=>l.id===editing?{...form,id:editing}:l)); } else { setLeads([...leads, form]); } setForm({...blank,id:uid()}); setEditing(null); };
  const edit = (l:LeadRecord)=>{ if(!canEdit) return; setForm(l); setEditing(l.id); };
  const remove = (id:string)=>{ if(!canEdit) return; if(confirm('Delete lead?')) setLeads(leads.filter(l=>l.id!==id)); };
  return (
    <div className="grid lg:grid-cols-3 gap-6 items-start">
      <Card title={editing? 'Edit Lead':'New Lead'} className="lg:col-span-1 sticky top-4">
        <form onSubmit={submit} className="space-y-3">
          <input className="w-full px-3 py-2 rounded-lg border" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} disabled={!canEdit} />
          <input className="w-full px-3 py-2 rounded-lg border" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} disabled={!canEdit} />
          <input className="w-full px-3 py-2 rounded-lg border" placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} disabled={!canEdit} />
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 w-24">Stage</label>
            <select className="w-full px-3 py-2 rounded-lg border" value={form.stage} onChange={e=>setForm({...form,stage:e.target.value as any})} disabled={!canEdit}>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="negotiation">Negotiation</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 w-24">Score</label>
            <input type="number" min={0} max={100} className="w-full px-3 py-2 rounded-lg border" value={form.score||0} onChange={e=>setForm({...form,score:Number(e.target.value)})} disabled={!canEdit} />
          </div>
          <input className="w-full px-3 py-2 rounded-lg border" placeholder="Tags (comma)" value={form.tags.join(', ')} onChange={e=>setForm({...form,tags:e.target.value.split(',').map(s=>s.trim()).filter(Boolean)})} disabled={!canEdit} />
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 w-24">Assigned</label>
            {role==='staff' ? (
              <input disabled className="w-full px-3 py-2 rounded-lg border bg-gray-50" value={form.assignedTo || ''} />
            ) : (
              <select className="w-full px-3 py-2 rounded-lg border" value={form.assignedTo || ''} onChange={e=>setForm({...form,assignedTo:e.target.value})}>
                <option value="">Unassigned</option>
                {staff.map(u=> <option key={u.id} value={u.email}>{u.name || u.email} ({u.role})</option>)}
              </select>
            )}
          </div>
          <textarea className="w-full px-3 py-2 rounded-lg border" rows={3} placeholder="Notes" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} disabled={!canEdit} />
          <div className="flex gap-3 pt-2">
            <button className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium" disabled={!canEdit}>{editing? 'Update':'Add Lead'}</button>
            {editing && <button type="button" onClick={()=>{setForm({...blank,id:uid()}); setEditing(null);}} className="px-3 py-2 rounded-lg border text-sm">Cancel</button>}
          </div>
        </form>
      </Card>
      <div className="lg:col-span-2 space-y-4">
        <Card className="sticky top-4" subtle actions={<input placeholder="Search" className="px-3 py-2 rounded-lg border text-sm" value={query} onChange={e=>setQuery(e.target.value)} />}> 
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="py-2 pr-2">Name</th>
                  <th className="py-2 pr-2">Email</th>
                  <th className="py-2 pr-2">Stage</th>
                  <th className="py-2 pr-2">Score</th>
                  <th className="py-2 pr-2">Assigned</th>
                  <th className="py-2 pr-2">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map(l=> (
                  <tr key={l.id} className="hover:bg-gray-50/80">
                    <td className="py-2 pr-2 font-medium text-gray-800">{l.name}</td>
                    <td className="py-2 pr-2 text-gray-600">{l.email}</td>
                    <td className="py-2 pr-2"><Pill>{l.stage}</Pill></td>
                    <td className="py-2 pr-2 text-gray-600">{l.score ?? '—'}</td>
                    <td className="py-2 pr-2 text-gray-600">{l.assignedTo || '—'}</td>
                    <td className="py-2 pr-2 flex gap-1">
                      <button onClick={()=>edit(l)} className="px-2 py-1 rounded-md border text-xs" disabled={!canEdit || (role==='staff' && l.assignedTo!==currentUserEmail)}>Edit</button>
                      <button onClick={()=>remove(l.id)} className="px-2 py-1 rounded-md border text-xs text-red-600" disabled={!canEdit || (role==='staff' && l.assignedTo!==currentUserEmail)}>Del</button>
                    </td>
                  </tr>
                ))}
                {filtered.length===0 && <tr><td colSpan={6} className="py-6 text-center text-gray-500">No leads</td></tr>}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

/************************* Dashboard *************************/
function Stat({label, value, sub}:{label:string; value:any; sub?:string}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 flex flex-col gap-2 min-w-[160px]">
      <span className="text-xs font-medium text-gray-500 tracking-wide">{label}</span>
      <span className="text-2xl font-semibold tracking-tight text-gray-800">{value}</span>
      {sub && <span className="text-[11px] text-gray-500">{sub}</span>}
    </div>
  );
}

function DashboardTab({activeClients,totalClients,monthRevenue,topServices,revenueByMonth}:{activeClients:number; totalClients:number; monthRevenue:number; topServices:[string,number][]; revenueByMonth:{month:string;value:number}[]}) {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Active Clients" value={activeClients} sub={totalClients+" total"} />
        <Stat label="MTD Revenue" value={currency(monthRevenue)} sub="Collected this month" />
        <Stat label="Top Service" value={topServices[0] ? topServices[0][0] : '—'} sub={topServices[0] ? currency(topServices[0][1]) : 'No data'} />
        <Stat label="Avg Ticket" value={currency(avg(revenueByMonth.flatMap(m=>Array(m.value))))} sub="(rough)" />
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <Card title="Revenue Trend" className="lg:col-span-2">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} tickFormatter={v=>'$'+v} />
                <Tooltip formatter={(v)=>currency(Number(v))} />
                <Line type="monotone" dataKey="value" stroke="#0d6efd" strokeWidth={3} dot={{r:4}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card title="Top Services" className="flex flex-col">
          <div className="space-y-3">
            {topServices.length === 0 && <div className="text-sm text-gray-500">No revenue yet</div>}
            {topServices.map(([svc, amt]) => (
              <div key={svc} className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">{svc}</span>
                <span className="text-gray-600">{currency(amt)}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

/************************* Clients (CRM) *************************/
function ClientsTab({clients,setClients, staff, role, currentUserEmail}:{clients:ClientRecord[]; setClients:(c:ClientRecord[])=>void; staff: StaffUser[]; role: Role; currentUserEmail?: string|null}) {
  const blank: ClientRecord = { id: uid(), name:'', email:'', phone:'', services:[], tags:[], notes:'', createdAt: new Date().toISOString(), status:'prospect', assignedTo: role==='staff' ? (currentUserEmail||'') : '' };
  const [form, setForm] = useState<ClientRecord>(blank);
  const [editing, setEditing] = useState<string|null>(null);
  const [query, setQuery] = useState('');

  const roleFiltered = role==='staff' ? clients.filter(c=>c.assignedTo===currentUserEmail) : clients;
  const filtered = roleFiltered.filter(c=> [c.name,c.email,c.phone,c.tags.join(' '),c.services.join(' ')].some(v=>v?.toLowerCase().includes(query.toLowerCase())));

  const submit = (e: any) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    if (editing) {
      setClients(clients.map(c=>c.id===editing? {...form, id: editing}: c));
    } else {
      setClients([...clients, form]);
    }
    setForm({...blank, id: uid()});
    setEditing(null);
  };

  const edit = (c: ClientRecord) => { setForm(c); setEditing(c.id); };
  const remove = (id: string) => { if (confirm('Delete client?')) setClients(clients.filter(c=>c.id!==id)); };

  return (
    <div className="grid lg:grid-cols-3 gap-6 items-start">
      <Card title={editing ? 'Edit Client' : 'New Client'} className="lg:col-span-1 sticky top-4">
        <form onSubmit={submit} className="space-y-3">
          <input className="w-full px-3 py-2 rounded-lg border" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
          <input className="w-full px-3 py-2 rounded-lg border" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
          <input className="w-full px-3 py-2 rounded-lg border" placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
          <input className="w-full px-3 py-2 rounded-lg border" placeholder="Services (comma)" value={form.services.join(', ')} onChange={e=>setForm({...form,services: e.target.value.split(',').map(s=>s.trim()).filter(Boolean)})} />
          <input className="w-full px-3 py-2 rounded-lg border" placeholder="Tags (comma)" value={form.tags.join(', ')} onChange={e=>setForm({...form,tags: e.target.value.split(',').map(s=>s.trim()).filter(Boolean)})} />
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 w-28">Assigned To</label>
            {role==='staff' ? (
              <input disabled className="w-full px-3 py-2 rounded-lg border bg-gray-50" value={form.assignedTo || ''} />
            ) : (
              <select className="w-full px-3 py-2 rounded-lg border" value={form.assignedTo || ''} onChange={e=>setForm({...form,assignedTo:e.target.value})}>
                <option value="">Unassigned</option>
                {staff.map(u=> <option key={u.id} value={u.email}>{u.name || u.email} ({u.role})</option>)}
              </select>
            )}
          </div>
          <textarea className="w-full px-3 py-2 rounded-lg border" rows={3} placeholder="Notes" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} />
          <select className="w-full px-3 py-2 rounded-lg border" value={form.status} onChange={e=>setForm({...form,status:e.target.value as any})}>
            <option value="prospect">Prospect</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <div className="flex gap-3 pt-2">
            <button className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium">{editing ? 'Update' : 'Add Client'}</button>
            {editing && <button type="button" onClick={()=>{setForm({...blank, id: uid()}); setEditing(null);}} className="px-3 py-2 rounded-lg border text-sm">Cancel</button>}
          </div>
        </form>
      </Card>
      <div className="lg:col-span-2 space-y-4">
        <Card className="sticky top-4" subtle actions={<input placeholder="Search" className="px-3 py-2 rounded-lg border text-sm" value={query} onChange={e=>setQuery(e.target.value)} />}> 
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="py-2 pr-2">Name</th>
                  <th className="py-2 pr-2">Email</th>
                  <th className="py-2 pr-2">Status</th>
                  <th className="py-2 pr-2">Tags</th>
                  <th className="py-2 pr-2">Assigned</th>
                  <th className="py-2 pr-2">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map(c=> (
                  <tr key={c.id} className="hover:bg-gray-50/80">
                    <td className="py-2 pr-2 font-medium text-gray-800">{c.name}</td>
                    <td className="py-2 pr-2 text-gray-600">{c.email}</td>
                    <td className="py-2 pr-2"><Pill>{c.status}</Pill></td>
                    <td className="py-2 pr-2"><div className="flex flex-wrap gap-1">{c.tags.map(t=><Pill key={t}>{t}</Pill>)}</div></td>
                    <td className="py-2 pr-2 text-gray-600">{c.assignedTo || '—'}</td>
                    <td className="py-2 pr-2 flex gap-1">
                      <button onClick={()=>edit(c)} className="px-2 py-1 rounded-md border text-xs" disabled={role==='staff' && c.assignedTo!==currentUserEmail}>Edit</button>
                      <button onClick={()=>remove(c.id)} className="px-2 py-1 rounded-md border text-xs text-red-600" disabled={role==='staff' && c.assignedTo!==currentUserEmail}>Del</button>
                    </td>
                  </tr>
                ))}
                {filtered.length===0 && <tr><td colSpan={5} className="py-6 text-center text-gray-500">No clients</td></tr>}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

/************************* Calendar *************************/
function CalendarTab({appointments,setAppointments}:{appointments:AppointmentRecord[]; setAppointments:(a:AppointmentRecord[])=>void}) {
  const blank: AppointmentRecord = { id: uid(), title:'', date: todayISO(), type:'appointment', service:'', notes:'' };
  const [form, setForm] = useState<AppointmentRecord>(blank);

  const submit = (e:any) => { e.preventDefault(); if(!form.title) return; setAppointments([...appointments, form]); setForm({...blank, id: uid()}); };
  const remove = (id:string) => { if (confirm('Delete entry?')) setAppointments(appointments.filter(a=>a.id!==id)); };

  const grouped = appointments.slice().sort((a,b)=>a.date.localeCompare(b.date));

  return (
    <div className="grid lg:grid-cols-3 gap-6 items-start">
      <Card title="Add Entry" className="lg:col-span-1 sticky top-4">
        <form onSubmit={submit} className="space-y-3">
          <input className="w-full px-3 py-2 rounded-lg border" placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
          <input type="date" className="w-full px-3 py-2 rounded-lg border" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} />
          <select className="w-full px-3 py-2 rounded-lg border" value={form.type} onChange={e=>setForm({...form,type:e.target.value as any})}>
            <option value="appointment">Appointment</option>
            <option value="task">Task</option>
            <option value="off">Off / Block</option>
          </select>
          <input className="w-full px-3 py-2 rounded-lg border" placeholder="Service (optional)" value={form.service} onChange={e=>setForm({...form,service:e.target.value})} />
          <textarea className="w-full px-3 py-2 rounded-lg border" rows={3} placeholder="Notes" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} />
          <button className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium">Add</button>
        </form>
      </Card>
      <div className="lg:col-span-2 space-y-4">
        <Card title="Schedule" subtle>
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="py-2 pr-2">Date</th>
                  <th className="py-2 pr-2">Title</th>
                  <th className="py-2 pr-2">Type</th>
                  <th className="py-2 pr-2">Service</th>
                  <th className="py-2 pr-2">Notes</th>
                  <th className="py-2 pr-2">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {grouped.map(a=> (
                  <tr key={a.id} className="hover:bg-gray-50/80">
                    <td className="py-2 pr-2 whitespace-nowrap font-medium text-gray-800">{a.date}</td>
                    <td className="py-2 pr-2 text-gray-700">{a.title}</td>
                    <td className="py-2 pr-2"><Pill>{a.type}</Pill></td>
                    <td className="py-2 pr-2 text-gray-600">{a.service||'—'}</td>
                    <td className="py-2 pr-2 text-gray-500 max-w-[260px]">{a.notes?.slice(0,60)}</td>
                    <td className="py-2 pr-2"><button onClick={()=>remove(a.id)} className="px-2 py-1 rounded-md border text-xs text-red-600">Del</button></td>
                  </tr>
                ))}
                {grouped.length===0 && <tr><td colSpan={6} className="py-6 text-center text-gray-500">Empty</td></tr>}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

/************************* Content (SOPs etc.) *************************/
function ContentTab({sops,setSops}:{sops:SOPRecord[]; setSops:(s:SOPRecord[])=>void}) {
  const blank: SOPRecord = { id: uid(), title:'', category:'General', content:'', link:'', createdAt: new Date().toISOString() };
  const [form, setForm] = useState<SOPRecord>(blank);
  const [filter, setFilter] = useState('');

  const categories = Array.from(new Set(sops.map(s=>s.category)));
  const filtered = sops.filter(s => [s.title,s.category,s.content,s.link].some(v=>v?.toLowerCase().includes(filter.toLowerCase())));

  const submit = (e:any) => { e.preventDefault(); if(!form.title) return; setSops([...sops, form]); setForm({...blank, id: uid()}); };
  const remove = (id:string) => { if (confirm('Delete SOP?')) setSops(sops.filter(s=>s.id!==id)); };

  return (
    <div className="grid lg:grid-cols-3 gap-6 items-start">
      <Card title="New SOP / Doc" className="lg:col-span-1 sticky top-4">
        <form onSubmit={submit} className="space-y-3">
          <input className="w-full px-3 py-2 rounded-lg border" placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
          <input className="w-full px-3 py-2 rounded-lg border" placeholder="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})} />
          <textarea className="w-full px-3 py-2 rounded-lg border" rows={3} placeholder="Content / Description" value={form.content} onChange={e=>setForm({...form,content:e.target.value})} />
          <input className="w-full px-3 py-2 rounded-lg border" placeholder="Link (optional)" value={form.link} onChange={e=>setForm({...form,link:e.target.value})} />
          <button className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium">Add</button>
        </form>
      </Card>
      <div className="lg:col-span-2 space-y-4">
        <Card subtle actions={<input placeholder="Search" className="px-3 py-2 rounded-lg border text-sm" value={filter} onChange={e=>setFilter(e.target.value)} />}> 
          <div className="space-y-4">
            {filtered.map(s => (
              <div key={s.id} className="p-4 rounded-xl border bg-white/80 backdrop-blur flex flex-col gap-2">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-medium text-gray-800 leading-tight">{s.title}</h4>
                    <div className="flex gap-2 mt-1"><Pill>{s.category}</Pill><Pill>{s.createdAt.slice(0,10)}</Pill></div>
                  </div>
                  <button onClick={()=>remove(s.id)} className="px-2 py-1 rounded-md border text-xs text-red-600 self-start">Delete</button>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{s.content}</p>
                {s.link && <a href={s.link} target="_blank" className="text-xs text-blue-600 underline break-all">{s.link}</a>}
              </div>
            ))}
            {filtered.length===0 && <div className="text-sm text-gray-500 py-6 text-center">No SOPs yet</div>}
          </div>
        </Card>
      </div>
    </div>
  );
}

/************************* Website Management *************************/
function WebsiteTab({site,setSite}:{site:SiteContent; setSite:(s:SiteContent)=>void}){
  const [form, setForm] = useState(site);
  const save = (e:any)=>{ e.preventDefault(); setSite(form); };
  return (
    <div className="grid lg:grid-cols-2 gap-6 items-start">
      <Card title="Content Editor">
        <form onSubmit={save} className="grid gap-3">
          <label className="text-sm font-medium text-gray-700">About Us Content</label>
          <textarea className="w-full px-3 py-2 rounded-lg border min-h-[160px]" value={form.about} onChange={e=>setForm({...form,about:e.target.value})} />
          <label className="text-sm font-medium text-gray-700">Disclosures Content</label>
          <textarea className="w-full px-3 py-2 rounded-lg border min-h-[160px]" value={form.disclosures} onChange={e=>setForm({...form,disclosures:e.target.value})} />
          <button className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium w-fit">Save</button>
        </form>
      </Card>
      <Card title="Brand & Navigation">
        <div className="space-y-3">
          <div className="grid gap-2">
            <label className="text-sm text-gray-700">Logo URL</label>
            <input className="px-3 py-2 border rounded-lg" value={form.brand.logoUrl||''} onChange={e=>setForm({...form, brand:{...form.brand, logoUrl:e.target.value}})} />
          </div>
          <div className="grid gap-2">
            <label className="text-sm text-gray-700">Favicon URL</label>
            <input className="px-3 py-2 border rounded-lg" value={form.brand.faviconUrl||''} onChange={e=>setForm({...form, brand:{...form.brand, faviconUrl:e.target.value}})} />
          </div>
          <div className="grid gap-2">
            <label className="text-sm text-gray-700">Primary Color (hex)</label>
            <input className="px-3 py-2 border rounded-lg" value={form.brand.primary||''} onChange={e=>setForm({...form, brand:{...form.brand, primary:e.target.value}})} />
          </div>
          <div className="grid gap-2">
            <label className="text-sm text-gray-700">Header Links</label>
            <div className="space-y-2">
              {form.navLinks.map((l,idx)=> (
                <div key={idx} className="flex gap-2">
                  <input className="px-2 py-1 border rounded w-40" value={l.label} onChange={e=>{
                    const arr=[...form.navLinks]; arr[idx]={...l,label:e.target.value}; setForm({...form,navLinks:arr});
                  }} />
                  <input className="px-2 py-1 border rounded flex-1" value={l.href} onChange={e=>{
                    const arr=[...form.navLinks]; arr[idx]={...l,href:e.target.value}; setForm({...form,navLinks:arr});
                  }} />
                </div>
              ))}
              <button className="px-3 py-1.5 rounded border text-xs" onClick={()=>setForm({...form, navLinks:[...form.navLinks,{label:'New', href:'/'}]})}>Add Link</button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

/************************* Forms & Submissions *************************/
function FormsTab({submissions,setSubmissions}:{submissions:SubmissionRecord[]; setSubmissions:(s:SubmissionRecord[])=>void}){
  const remove = (id:string)=>{ if(confirm('Delete submission?')) setSubmissions(submissions.filter(s=>s.id!==id)); };
  return (
    <div className="space-y-4">
      <Card title="Submissions">
        <div className="text-sm text-gray-600 mb-3">Landing form submissions would appear here when wired to store. You can also import older records as CSV.</div>
        <div className="overflow-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="py-2 pr-2">When</th>
                <th className="py-2 pr-2">Type</th>
                <th className="py-2 pr-2">Name</th>
                <th className="py-2 pr-2">Email</th>
                <th className="py-2 pr-2">Message</th>
                <th className="py-2 pr-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {submissions.map(s=> (
                <tr key={s.id} className="hover:bg-gray-50/80">
                  <td className="py-2 pr-2 whitespace-nowrap text-gray-600">{s.createdAt.slice(0,16).replace('T',' ')}</td>
                  <td className="py-2 pr-2"><Pill>{s.type}</Pill></td>
                  <td className="py-2 pr-2 text-gray-800">{s.name}</td>
                  <td className="py-2 pr-2 text-gray-600">{s.email}</td>
                  <td className="py-2 pr-2 text-gray-600 max-w-[280px]">{s.message?.slice(0,80) || '—'}</td>
                  <td className="py-2 pr-2"><button onClick={()=>remove(s.id)} className="px-2 py-1 rounded-md border text-xs text-red-600">Del</button></td>
                </tr>
              ))}
              {submissions.length===0 && <tr><td colSpan={6} className="py-6 text-center text-gray-500">No submissions</td></tr>}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/************************* Analytics *************************/
function AnalyticsTab({leads,revenueByMonth,topServices}:{leads:LeadRecord[]; revenueByMonth:{month:string;value:number}[]; topServices:[string,number][]}){
  const byStage = useMemo(()=>{
    const map:Record<string,number>={};
    leads.forEach(l=>{ map[l.stage]=(map[l.stage]||0)+1; });
    return Object.entries(map).map(([stage,count])=>({stage,count}));
  },[leads]);
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <Card title="Leads by Stage" className="lg:col-span-1">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={byStage}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="stage" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Bar dataKey="count" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <Card title="Revenue Trend" className="lg:col-span-2">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} tickFormatter={v=>'$'+v} />
              <Tooltip formatter={(v)=>currency(Number(v))} />
              <Line type="monotone" dataKey="value" stroke="#0d6efd" strokeWidth={3} dot={{r:4}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}

/************************* Users *************************/
function UsersTab({staff,setStaff}:{staff:StaffUser[]; setStaff:(u:StaffUser[])=>void}){
  const [userForm, setUserForm] = useState<StaffUser>({ id: uid(), name: '', email: '', role: 'staff' });
  const add = (e:any)=>{ e.preventDefault(); if(!userForm.email) return; setStaff([...staff, userForm]); setUserForm({ id: uid(), name:'', email:'', role:'staff' }); };
  const remove = (id:string)=>{ if(confirm('Remove user?')) setStaff(staff.filter(u=>u.id!==id)); };
  return (
    <div className="space-y-4">
      <Card title="Team">
        <form onSubmit={add} className="grid grid-cols-1 md:grid-cols-4 gap-2 items-end">
          <input className="px-3 py-2 border rounded-xl md:col-span-1" placeholder="Name" value={userForm.name} onChange={e=>setUserForm({...userForm, name: e.target.value})} />
          <input className="px-3 py-2 border rounded-xl md:col-span-2" placeholder="Email" value={userForm.email} onChange={e=>setUserForm({...userForm, email: e.target.value})} />
          <select className="px-3 py-2 border rounded-xl" value={userForm.role} onChange={e=>setUserForm({...userForm, role: e.target.value as any})}>
            <option value="viewer">Viewer</option>
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
            <option value="owner">Owner</option>
          </select>
          <button className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium">Add</button>
        </form>
        <div className="mt-4 overflow-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="py-2 pr-2">Name</th>
                <th className="py-2 pr-2">Email</th>
                <th className="py-2 pr-2">Role</th>
                <th className="py-2 pr-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {staff.map(u => (
                <tr key={u.id}>
                  <td className="py-2 pr-2 font-medium text-gray-800">{u.name || '—'}</td>
                  <td className="py-2 pr-2 text-gray-600">{u.email}</td>
                  <td className="py-2 pr-2"><Pill>{u.role}</Pill></td>
                  <td className="py-2 pr-2"><button onClick={()=>remove(u.id)} className="px-2 py-1 rounded-md border text-xs text-red-600">Remove</button></td>
                </tr>
              ))}
              {staff.length===0 && <tr><td colSpan={4} className="py-6 text-center text-gray-500">No team members</td></tr>}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/************************* Help *************************/
function HelpTab(){
  return (
    <div className="space-y-4">
      <Card title="Help & Support">
        <div className="text-sm text-gray-700 space-y-2">
          <p>Welcome to the Admin. This is a prototype control panel with local storage. Planned upgrades include database persistence, file storage, and calendar sync.</p>
          <ul className="list-disc ml-5 space-y-1 text-gray-600">
            <li>CRM: manage Leads and Clients; assign to staff</li>
            <li>Website: edit About/Disclosures, brand, and navigation</li>
            <li>Forms: see submissions from the landing page</li>
            <li>Analytics: overview widgets and trends</li>
          </ul>
          <p>If you run into issues, try refreshing the page. Data here is kept in your browser only for now.</p>
        </div>
      </Card>
    </div>
  );
}

/************************* Revenue *************************/
function RevenueTab({revenue,setRevenue}:{revenue:RevenueRecord[]; setRevenue:(r:RevenueRecord[])=>void}) {
  const blank: RevenueRecord = { id: uid(), date: todayISO(), service:'', amount:0, clientId:'', notes:'' };
  const [form, setForm] = useState<RevenueRecord>(blank);

  const submit = (e:any) => { e.preventDefault(); if(!form.service || !form.amount) return; setRevenue([...revenue, form]); setForm({...blank, id: uid()}); };
  const remove = (id:string) => { if(confirm('Delete entry?')) setRevenue(revenue.filter(r=>r.id!==id)); };

  const total = revenue.reduce((a,b)=>a+b.amount,0);

  return (
    <div className="grid lg:grid-cols-3 gap-6 items-start">
      <Card title="Add Revenue" className="lg:col-span-1 sticky top-4">
        <form onSubmit={submit} className="space-y-3">
          <input className="w-full px-3 py-2 rounded-lg border" placeholder="Service" value={form.service} onChange={e=>setForm({...form,service:e.target.value})} />
          <input type="number" className="w-full px-3 py-2 rounded-lg border" placeholder="Amount" value={form.amount} onChange={e=>setForm({...form,amount:Number(e.target.value)})} />
          <input className="w-full px-3 py-2 rounded-lg border" placeholder="Client ID (optional)" value={form.clientId} onChange={e=>setForm({...form,clientId:e.target.value})} />
          <textarea className="w-full px-3 py-2 rounded-lg border" rows={3} placeholder="Notes" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} />
          <button className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium">Add</button>
        </form>
      </Card>
      <div className="lg:col-span-2 space-y-4">
        <Card title={`Entries (${revenue.length})`} subtle actions={<div className="text-sm text-gray-600">Total: <span className="font-semibold text-gray-800">{currency(total)}</span></div>}> 
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="py-2 pr-2">Date</th>
                  <th className="py-2 pr-2">Service</th>
                  <th className="py-2 pr-2">Amount</th>
                  <th className="py-2 pr-2">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {revenue.map(r=> (
                  <tr key={r.id} className="hover:bg-gray-50/80">
                    <td className="py-2 pr-2 whitespace-nowrap font-medium text-gray-800">{r.date}</td>
                    <td className="py-2 pr-2 text-gray-700">{r.service}</td>
                    <td className="py-2 pr-2 text-gray-600">{currency(r.amount)}</td>
                    <td className="py-2 pr-2"><button onClick={()=>remove(r.id)} className="px-2 py-1 rounded-md border text-xs text-red-600">Del</button></td>
                  </tr>
                ))}
                {revenue.length===0 && <tr><td colSpan={4} className="py-6 text-center text-gray-500">No revenue yet</td></tr>}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

/************************* Settings *************************/
function SettingsTab({settings,setSettings, staff, setStaff}:{settings:SettingsData; setSettings:(s:SettingsData)=>void; staff: StaffUser[]; setStaff:(u:StaffUser[])=>void}) {
  const [form, setForm] = useState(settings);
  const save = (e:any) => { e.preventDefault(); setSettings(form); };
  const [userForm, setUserForm] = useState<StaffUser>({ id: uid(), name: '', email: '', role: 'staff' });
  const addUser = (e:any) => { e.preventDefault(); if(!userForm.email) return; setStaff([...staff, userForm]); setUserForm({ id: uid(), name:'', email:'', role:'staff' }); };
  const removeUser = (id:string) => { if(confirm('Remove user?')) setStaff(staff.filter(u=>u.id!==id)); };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card title="Business Settings">
        <form onSubmit={save} className="grid grid-cols-1 gap-3">
          <input className="px-3 py-2 border rounded-xl" placeholder="Business Name" value={form.businessName} onChange={e=>setForm({...form, businessName:e.target.value})} />
          <input className="px-3 py-2 border rounded-xl" placeholder="Owner Name" value={form.ownerName} onChange={e=>setForm({...form, ownerName:e.target.value})} />
          <input className="px-3 py-2 border rounded-xl" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
            <input className="px-3 py-2 border rounded-xl" placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} />
            <input className="px-3 py-2 border rounded-xl" placeholder="Address" value={form.address} onChange={e=>setForm({...form, address:e.target.value})} />
            <input className="px-3 py-2 border rounded-xl" placeholder="Admin Login URL" value={form.adminLoginUrl} onChange={e=>setForm({...form, adminLoginUrl:e.target.value})} />
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600 w-36">Current Role</label>
              <select className="px-3 py-2 border rounded-xl" value={form.currentRole} onChange={e=>setForm({...form, currentRole: e.target.value as any})}>
                <option value="owner">Owner</option>
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600 w-36">OTP Expiry (mins)</label>
                <input type="number" className="px-3 py-2 border rounded-xl w-28" value={form.otpExpiryMins||5} onChange={e=>setForm({...form, otpExpiryMins:Number(e.target.value)})} />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600 w-36">Rate Limit Window (mins)</label>
                <input type="number" className="px-3 py-2 border rounded-xl w-28" value={form.rateLimitWindow||5} onChange={e=>setForm({...form, rateLimitWindow:Number(e.target.value)})} />
              </div>
            </div>
            <button className="px-4 py-2 bg-gray-900 text-white rounded-xl self-start text-sm font-medium">Save</button>
        </form>
      </Card>
      <Card title="Integrations Roadmap">
        <div className="text-sm text-gray-600 space-y-2">
          <p>Future enhancements you can wire in:</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>SMTP / SendGrid for outbound emails</li>
            <li>Stripe for invoices & payments</li>
            <li>Google Calendar sync for appointments</li>
            <li>Secure file storage (S3/Cloudflare R2)</li>
            <li>User auth & roles (NextAuth / custom JWT)</li>
            <li>Encryption & audit logging</li>
          </ul>
        </div>
      </Card>
  <Card title="Team (Owner/Admin)">
        <form onSubmit={addUser} className="grid grid-cols-1 md:grid-cols-4 gap-2 items-end">
          <input className="px-3 py-2 border rounded-xl md:col-span-1" placeholder="Name" value={userForm.name} onChange={e=>setUserForm({...userForm, name: e.target.value})} />
          <input className="px-3 py-2 border rounded-xl md:col-span-2" placeholder="Email" value={userForm.email} onChange={e=>setUserForm({...userForm, email: e.target.value})} />
          <select className="px-3 py-2 border rounded-xl" value={userForm.role} onChange={e=>setUserForm({...userForm, role: e.target.value as any})}>
    <option value="viewer">Viewer</option>
    <option value="staff">Staff</option>
            <option value="admin">Admin</option>
            <option value="owner">Owner</option>
          </select>
          <button className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium">Add</button>
        </form>
        <div className="mt-4 overflow-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="py-2 pr-2">Name</th>
                <th className="py-2 pr-2">Email</th>
                <th className="py-2 pr-2">Role</th>
                <th className="py-2 pr-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {staff.map(u => (
                <tr key={u.id}>
                  <td className="py-2 pr-2 font-medium text-gray-800">{u.name || '—'}</td>
                  <td className="py-2 pr-2 text-gray-600">{u.email}</td>
                  <td className="py-2 pr-2"><Pill>{u.role}</Pill></td>
                  <td className="py-2 pr-2"><button onClick={()=>removeUser(u.id)} className="px-2 py-1 rounded-md border text-xs text-red-600">Remove</button></td>
                </tr>
              ))}
              {staff.length===0 && <tr><td colSpan={4} className="py-6 text-center text-gray-500">No team members</td></tr>}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/************************* Utils *************************/
function currency(v:number) { return '$' + Intl.NumberFormat('en-US',{minimumFractionDigits:0,maximumFractionDigits:0}).format(v); }
function avg(arr:number[]) { if(!arr.length) return 0; return Math.round(arr.reduce((a,b)=>a+b,0)/arr.length); }
