import {useState,useEffect} from 'react';import {Link,NavLink,Outlet,useLocation} from 'react-router-dom';import {useSite} from '../lib/site.jsx';
export const Lines=({text,as:T='span'})=><T>{String(text||'').split('\n').map((l,i)=><span key={i}>{i>0&&<br/>}{l}</span>)}</T>;
export const SmartLink=({to,children,...p})=>/^(https?:|mailto:|tel:)/.test(to)?<a href={to} target={/^https?:/.test(to)?'_blank':undefined} rel="noreferrer" {...p}>{children}</a>:<Link to={to||'/'} {...p}>{children}</Link>;
export default function Layout(){const{content:c,collections:k,ready}=useSite();const[open,setOpen]=useState(false);const{pathname}=useLocation();const g=c.general,ct=c.contact;
 const groups=[...new Set(k.footer_menu.map(x=>x.group_name))];
 useEffect(()=>{window.scrollTo(0,0);const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('shown');io.unobserve(e.target)}}),{threshold:.06});
  document.querySelectorAll('main section').forEach(el=>{el.classList.add('rv');io.observe(el)});return()=>io.disconnect()},[pathname,ready]);
 return <div className="shell"><a className="skip" href="#main">Skip to content</a>
 {g.announcement_on&&<SmartLink to={g.announcement_link} className="announce">{g.announcement_text}</SmartLink>}
 <header className="nav"><div className="nav-l"><Link to="/" className="logo"><b>{g.brand}</b><b>{g.brand_sub}</b></Link>
 <nav className={open?'open':''} onClick={()=>setOpen(false)}>{k.header_menu.map(m=>/^https?:/.test(m.url)?<a key={m.id} href={m.url} target="_blank" rel="noreferrer">{m.label}</a>:<NavLink key={m.id} to={m.url} end={m.url==='/'}>{m.label}</NavLink>)}</nav></div>
 <div className="nav-r"><SmartLink to={g.header_cta_link||'/contact'} className="wpill"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="6" cy="6" r="4.6"/><circle cx="6" cy="6" r="1.2" fill="currentColor"/></svg>{g.header_cta_label||'Request a quote'}</SmartLink>
 <a className="wpill" href={'tel:'+ct.phone}><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M3 1.5h1.8l.8 2.2-1.1.8a6 6 0 0 0 2.5 2.5l.8-1.1 2.2.8V8.5A1.5 1.5 0 0 1 8.5 10 7 7 0 0 1 2 3.5 1.5 1.5 0 0 1 3 1.5Z"/></svg>{ct.phone}</a></div>
 <button className="burger" aria-label="Menu" onClick={()=>setOpen(!open)}>☰</button></header>
 <main id="main"><Outlet/></main>
 <footer className="foot"><div><b>{g.brand}</b> {g.brand_sub}<p>{g.tagline}</p><p>{ct.address}<br/>{ct.hours}</p></div>
 {groups.map(n=><div key={n}><b>{n}</b>{k.footer_menu.filter(x=>x.group_name===n).map(x=><SmartLink key={x.id} to={x.url}>{x.label}</SmartLink>)}</div>)}
 <div><b>Contact</b><a href={'mailto:'+ct.email}>{ct.email}</a><a href={'tel:'+ct.phone}>{ct.phone}</a></div>
 <p className="copy">{g.footer_text} · <Link to="/admin">Admin</Link></p></footer></div>}
