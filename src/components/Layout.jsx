import {useState,useEffect} from 'react';import {Link,NavLink,Outlet,useLocation} from 'react-router-dom';import {useSite} from '../lib/site.jsx';
export const Lines=({text,as:T='span'})=><T>{String(text||'').split('\n').map((l,i)=><span key={i}>{i>0&&<br/>}{l}</span>)}</T>;
export const SmartLink=({to,children,...p})=>/^(https?:|mailto:|tel:)/.test(to)?<a href={to} target={/^https?:/.test(to)?'_blank':undefined} rel="noreferrer" {...p}>{children}</a>:<Link to={to||'/'} {...p}>{children}</Link>;
export default function Layout(){const{content:c,collections:k,ready}=useSite();const[open,setOpen]=useState(false);const{pathname}=useLocation();const g=c.general,ct=c.contact;
 const groups=[...new Set(k.footer_menu.map(x=>x.group_name))];
 useEffect(()=>{window.scrollTo(0,0);const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.06});
  document.querySelectorAll('main section').forEach(el=>{el.classList.add('rv');io.observe(el)});return()=>io.disconnect()},[pathname,ready]);
 return <div className="shell"><a className="skip" href="#main">Skip to content</a>
 {g.announcement_on&&<SmartLink to={g.announcement_link} className="announce">{g.announcement_text}</SmartLink>}
 <header className="nav"><Link to="/" className="logo"><b>{g.brand}</b><small>{g.brand_sub}</small></Link>
 <nav className={open?'open':''} onClick={()=>setOpen(false)}>{k.header_menu.map(m=>/^https?:/.test(m.url)?<a key={m.id} href={m.url} target="_blank" rel="noreferrer">{m.label}</a>:<NavLink key={m.id} to={m.url} end={m.url==='/'}>{m.label}</NavLink>)}</nav>
 <a className="pill ghost" href={'tel:'+ct.phone}>{ct.phone}</a><button className="burger" aria-label="Menu" onClick={()=>setOpen(!open)}>☰</button></header>
 <main id="main"><Outlet/></main>
 <footer className="foot"><div><b>{g.brand}</b> {g.brand_sub}<p>{g.tagline}</p><p>{ct.address}<br/>{ct.hours}</p></div>
 {groups.map(n=><div key={n}><b>{n}</b>{k.footer_menu.filter(x=>x.group_name===n).map(x=><SmartLink key={x.id} to={x.url}>{x.label}</SmartLink>)}</div>)}
 <div><b>Contact</b><a href={'mailto:'+ct.email}>{ct.email}</a><a href={'tel:'+ct.phone}>{ct.phone}</a></div>
 <p className="copy">{g.footer_text} · <Link to="/admin">Admin</Link></p></footer></div>}
