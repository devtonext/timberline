import {createContext,useContext,useEffect,useState,useCallback} from 'react';
import {NavLink,Routes,Route,Link,useParams} from 'react-router-dom';
import {api,isDemo} from '../lib/api.js';import {useSite} from '../lib/site.jsx';import {PAGES,COLLECTIONS} from './schema.js';import './admin.css';
const TC=createContext();const useToast=()=>useContext(TC);

function Field({f,v,set}){const[,label,t]=f;const toast=useToast();
 const up=async e=>{const file=e.target.files[0];if(!file)return;try{set(await api.uploadMedia(file));toast('Image uploaded')}catch(x){toast(x.message,1)}};
 return <label className="fld"><span>{label}</span>
 {t==='textarea'?<textarea rows="3" value={v??''} onChange={e=>set(e.target.value)}/>
 :t==='boolean'?<input type="checkbox" className="sw" checked={!!v} onChange={e=>set(e.target.checked)}/>
 :t==='color'?<span className="row"><input type="color" value={v||'#000000'} onChange={e=>set(e.target.value)}/><input value={v||''} onChange={e=>set(e.target.value)}/></span>
 :t==='image'?<span className="imgf">{v&&<img src={v} alt=""/>}<input value={v||''} placeholder="Paste a URL or upload" onChange={e=>set(e.target.value)}/><input type="file" accept="image/*" onChange={up}/></span>
 :<input value={v??''} onChange={e=>set(e.target.value)}/>}</label>}

function SectionCard({id,title,fields}){const{content,reload}=useSite();const toast=useToast();const base=content[id]||{};const sig=JSON.stringify(base);
 const[d,setD]=useState(base);useEffect(()=>setD(JSON.parse(sig)),[sig]);const dirty=JSON.stringify(d)!==sig;
 const save=async()=>{try{await api.saveContent(id,d);await reload();toast('Saved')}catch(e){toast(e.message,1)}};
 return <div className="acard"><div className="ach"><b>{title}</b>{dirty&&<em className="badge">Unsaved</em>}<span><button className="btn ghost" disabled={!dirty} onClick={()=>setD(JSON.parse(sig))}>Discard</button><button className="btn" disabled={!dirty} onClick={save}>Save</button></span></div>
 <div className="fgrid">{fields.map(f=><Field key={f[0]} f={f} v={d[f[0]]} set={v=>setD({...d,[f[0]]:v})}/>)}</div></div>}

function PageEditor(){const{page}=useParams();const p=PAGES[page];if(!p)return <p>Page not found.</p>;
 return <><div className="ph1"><h1>{p.label}</h1><Link className="btn ghost" to={p.path} target="_blank">Preview page ↗</Link></div>{p.sections.map(s=><SectionCard key={page+s[0]} id={s[0]} title={s[1]} fields={s[2]}/>)}</>}

function Modal({title,onClose,children}){useEffect(()=>{const k=e=>e.key==='Escape'&&onClose();addEventListener('keydown',k);return()=>removeEventListener('keydown',k)},[onClose]);
 return <div className="mback" onClick={onClose}><div className="modal" onClick={e=>e.stopPropagation()}><div className="ach"><b>{title}</b><button className="btn ghost" onClick={onClose}>✕</button></div>{children}</div></div>}

function Collection(){const{table}=useParams();const C=COLLECTIONS[table];const{reload}=useSite();const toast=useToast();
 const[rows,setRows]=useState(null),[q,setQ]=useState(''),[edit,setEdit]=useState(null),[d,setD]=useState({});
 const load=useCallback(async()=>setRows(await api.list(table,{admin:true})),[table]);useEffect(()=>{setRows(null);load()},[load]);
 if(!C)return <p>Not found.</p>;
 const done=async m=>{await load();await reload();m&&toast(m)};
 const run=(fn,m)=>fn().then(()=>done(m)).catch(e=>toast(e.message,1));
 const move=(i,x)=>{const a=rows[i],b=rows[i+x];if(!b)return;run(async()=>{await api.update(table,a.id,{sort_order:b.sort_order===a.sort_order?a.sort_order+x:b.sort_order});await api.update(table,b.id,{sort_order:a.sort_order})})};
 const open=r=>{setD(r?{...r}:{});setEdit(r||{})};
 const save=()=>{const{id,created_at,updated_at,...x}=d;run(async()=>{id?await api.update(table,id,x):await api.insert(table,{...x,sort_order:(rows?.length||0)+1});setEdit(null)},'Saved')};
 const list=(rows||[]).filter(r=>String(r[C.title]).toLowerCase().includes(q.toLowerCase()));
 return <><div className="ph1"><h1>{C.label} <small>{rows?rows.length:'…'} items</small></h1><span className="row"><input className="srch" placeholder="Search…" value={q} onChange={e=>setQ(e.target.value)}/><button className="btn" onClick={()=>open(null)}>+ Add</button></span></div>
 {!rows?<div className="skel"/>:<div className="acard lst">{list.map(r=>{const i=rows.indexOf(r);return <div className="item" key={r.id}>
  {C.img&&r[C.img]?<img src={r[C.img]} alt=""/>:<span className="noimg"/>}<b className="t">{String(r[C.title]).replace(/\n/g,' ')}</b>
  <button className={'tg '+(r.published?'on':'')} onClick={()=>run(()=>api.update(table,r.id,{published:!r.published}))}>{r.published?'Live':'Hidden'}</button>
  <span className="acts"><button onClick={()=>move(i,-1)} title="Up">↑</button><button onClick={()=>move(i,1)} title="Down">↓</button><button onClick={()=>open(r)}>Edit</button>
  <button onClick={()=>{const{id,created_at,updated_at,...x}=r;run(()=>api.insert(table,{...x,sort_order:rows.length+1}),'Duplicated')}}>Copy</button>
  <button className="danger" onClick={()=>confirm('Delete this item?')&&run(()=>api.remove(table,r.id),'Deleted')}>Delete</button></span></div>})}{!list.length&&<p className="empty">Nothing here yet.</p>}</div>}
 {edit&&<Modal title={d.id?'Edit item':'New item'} onClose={()=>setEdit(null)}><div className="fgrid">{C.fields.map(f=><Field key={f[0]} f={f} v={d[f[0]]} set={v=>setD({...d,[f[0]]:v})}/>)}</div><div className="mf"><button className="btn ghost" onClick={()=>setEdit(null)}>Cancel</button><button className="btn" onClick={save}>Save</button></div></Modal>}</>}

function Inbox(){const toast=useToast();const[rows,setRows]=useState(null),[f,setF]=useState('all'),[q,setQ]=useState(''),[sel,setSel]=useState(null);
 const load=useCallback(async()=>setRows(await api.list('inquiries',{admin:true})),[]);useEffect(()=>{load()},[load]);
 const setSt=async(r,status)=>{await api.update('inquiries',r.id,{status});load()};
 const csv=()=>{const h=['created_at','status','name','email','phone','message'];const t=[h.join(','),...rows.map(r=>h.map(k=>'"'+String(r[k]??'').replace(/"/g,'""')+'"').join(','))].join('\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([t],{type:'text/csv'}));a.download='inquiries.csv';a.click()};
 const list=(rows||[]).filter(r=>(f==='all'||r.status===f)&&(r.name+r.email+r.message).toLowerCase().includes(q.toLowerCase()));const n=s=>(rows||[]).filter(r=>r.status===s).length;
 return <><div className="ph1"><h1>Inbox</h1><span className="row"><input className="srch" placeholder="Search…" value={q} onChange={e=>setQ(e.target.value)}/><button className="btn ghost" onClick={csv} disabled={!rows?.length}>Export CSV</button></span></div>
 <div className="tabs">{['all','new','read','done'].map(s=><button key={s} className={f===s?'on':''} onClick={()=>setF(s)}>{s} <em>{s==='all'?rows?.length||0:n(s)}</em></button>)}</div>
 {!rows?<div className="skel"/>:<div className="acard lst">{list.map(r=><div className="item" key={r.id}><div className="t" onClick={()=>{setSel(r);r.status==='new'&&setSt(r,'read')}} style={{cursor:'pointer'}}><b>{r.name}</b><small>{r.email} · {new Date(r.created_at).toLocaleDateString()}</small></div>
  <select value={r.status} onChange={e=>setSt(r,e.target.value)}>{['new','read','done'].map(s=><option key={s}>{s}</option>)}</select>
  <button className="danger" onClick={()=>confirm('Delete message?')&&api.remove('inquiries',r.id).then(()=>{load();toast('Deleted')})}>Delete</button></div>)}{!list.length&&<p className="empty">No messages.</p>}</div>}
 {sel&&<Modal title={sel.name} onClose={()=>setSel(null)}><p><a href={'mailto:'+sel.email}>{sel.email}</a>{sel.phone&&<> · <a href={'tel:'+sel.phone}>{sel.phone}</a></>}</p><p className="msg">{sel.message}</p></Modal>}</>}

function Overview(){const[s,setS]=useState({});useEffect(()=>{(async()=>{const i=await api.list('inquiries',{admin:true});const p=await api.list('projects',{admin:true});setS({inq:i,new:i.filter(x=>x.status==='new').length,proj:p.filter(x=>x.published).length})})()},[]);
 return <><h1>Welcome back 👋</h1>{isDemo&&<div className="banner">Demo mode — changes are saved in this browser only. Connect Supabase to go live (see Setup).</div>}
 <div className="cards4"><div className="acard stc"><small>New inquiries</small><b>{s.new??'–'}</b></div><div className="acard stc"><small>Total inquiries</small><b>{s.inq?.length??'–'}</b></div><div className="acard stc"><small>Live projects</small><b>{s.proj??'–'}</b></div></div>
 <h3>Edit pages</h3><div className="chips">{Object.entries(PAGES).map(([k,p])=><Link key={k} to={'/admin/pages/'+k}>{p.label}</Link>)}</div>
 <h3>Latest inquiries</h3><div className="acard lst">{(s.inq||[]).slice(0,5).map(r=><div className="item" key={r.id}><div className="t"><b>{r.name}</b><small>{r.message.slice(0,80)}</small></div><span className="badge">{r.status}</span></div>)}</div></>}

function Setup(){const{reload}=useSite();const toast=useToast();
 return <><h1>Setup</h1><div className="acard pad"><p>Status: <b>{isDemo?'Demo mode (localStorage)':'Connected to Supabase'}</b></p>
 <p>Go live: 1) Create a Supabase project. 2) Paste <code>supabase/setup.sql</code> in the SQL Editor and run. 3) Add the values below to <code>.env</code>. 4) Create the first admin at /admin. 5) Turn off "Allow new users to sign up".</p>
 <pre>{'VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co\nVITE_SUPABASE_ANON_KEY=your-anon-key\nVITE_SUPABASE_BUCKET=media'}</pre><p>Never use the service_role key.</p>
 {isDemo&&<button className="btn danger" onClick={async()=>{if(confirm('Reset all demo data?')){await api.resetDemo();await reload();toast('Demo data reset')}}}>Reset demo data</button>}</div></>}

function Login({onDone,canCreate}){const[e,setE]=useState(isDemo?'admin@demo.com':''),[p,setP]=useState(isDemo?'demo1234':''),[err,setErr]=useState(''),[b,setB]=useState(false);
 const go=async ev=>{ev.preventDefault();setB(true);setErr('');try{canCreate?await api.signUp(e,p):await api.signIn(e,p);await onDone()}catch(x){setErr(x.message)}setB(false)};
 return <div className="login"><form onSubmit={go} className="acard pad"><h2>{canCreate?'Create the admin account':'Admin sign in'}</h2>{isDemo&&<div className="banner">Demo login: admin@demo.com / demo1234</div>}
 <label className="fld"><span>Email</span><input type="email" value={e} onChange={x=>setE(x.target.value)} required/></label><label className="fld"><span>Password</span><input type="password" value={p} onChange={x=>setP(x.target.value)} required minLength="6"/></label>
 {err&&<p className="errt">{err}</p>}<button className="btn" disabled={b}>{b?'Please wait…':canCreate?'Create account':'Sign in'}</button><Link to="/">← Back to website</Link></form></div>}

export default function AdminApp(){const[st,setSt]=useState('loading'),[create,setCreate]=useState(false),[email,setEmail]=useState(''),[toast,setToast]=useState(null),[nav,setNav]=useState(false);
 const check=useCallback(async()=>{try{const s=await api.getSession();if(!s){setCreate(!(await api.adminExists()));return setSt('out')}setEmail(s.email||s.user?.email||'');setSt((await api.isAdmin())?'in':'noadmin')}catch{setSt('out')}},[]);useEffect(()=>{check()},[check]);
 const t=useCallback((m,bad)=>{setToast({m,bad});setTimeout(()=>setToast(null),2600)},[]);
 if(st==='loading')return <div className="login"><p>Loading…</p></div>;
 if(st==='out')return <Login onDone={check} canCreate={create}/>;
 if(st==='noadmin')return <div className="login"><div className="acard pad"><h2>No admin access</h2><p>{email} is not an admin.</p><button className="btn" onClick={async()=>{await api.signOut();check()}}>Sign out</button> <Link to="/">← Website</Link></div></div>;
 const L=({to,children})=><NavLink to={to} end onClick={()=>setNav(false)}>{children}</NavLink>;
 return <TC.Provider value={t}><div className="adm"><aside className={nav?'open':''}><Link to="/admin" className="alogo">Timberline <small>Admin</small></Link>
 <L to="/admin">Overview</L><h4>Pages</h4>{Object.entries(PAGES).map(([k,p])=><L key={k} to={'/admin/pages/'+k}>{p.label}</L>)}
 <h4>Collections</h4>{Object.entries(COLLECTIONS).map(([k,c])=><L key={k} to={'/admin/c/'+k}>{c.label}</L>)}<h4>Inbox</h4><L to="/admin/inbox">Messages</L><h4>System</h4><L to="/admin/setup">Setup</L></aside>
 <div className="amain"><header className="atop"><button className="burger2" onClick={()=>setNav(!nav)}>☰</button><span className="badge">{isDemo?'Demo mode':'Connected to Supabase'}</span><span className="sp"/><Link className="btn ghost" to="/" target="_blank">View site ↗</Link><span className="av">{(email||'A')[0].toUpperCase()}</span><button className="btn ghost" onClick={async()=>{await api.signOut();check()}}>Sign out</button></header>
 <div className="acont"><Routes><Route index element={<Overview/>}/><Route path="pages/:page" element={<PageEditor/>}/><Route path="c/:table" element={<Collection/>}/><Route path="inbox" element={<Inbox/>}/><Route path="setup" element={<Setup/>}/></Routes></div></div>
 {toast&&<div className={'toast'+(toast.bad?' bad':'')}>{toast.m}</div>}</div></TC.Provider>}
