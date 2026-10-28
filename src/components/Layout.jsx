import {useState} from 'react';import {Link,NavLink,Outlet} from 'react-router-dom';import {useSite} from '../lib/site.jsx';
export const Lines=({text,as:T='span'})=><T>{String(text||'').split('\n').map((l,i)=><span key={i}>{i>0&&<br/>}{l}</span>)}</T>;
export const SmartLink=({to,children,...p})=>/^https?:/.test(to)?<a href={to} target="_blank" rel="noreferrer" {...p}>{children}</a>:<Link to={to||'/'} {...p}>{children}</Link>;
export default function Layout(){const{content:c}=useSite();const[open,setOpen]=useState(false);const g=c.general,ct=c.contact;
 return <div className="shell"><a className="skip" href="#main">Skip to content</a>
 <header className="nav"><Link to="/" className="logo"><b>{g.brand}</b><small>{g.brand_sub}</small></Link>
 <nav className={open?'open':''} onClick={()=>setOpen(false)}><NavLink to="/" end>Home</NavLink><NavLink to="/projects">Projects</NavLink><NavLink to="/contact">Contact</NavLink></nav>
 <a className="pill ghost" href={'tel:'+ct.phone}>{ct.phone}</a><button className="burger" aria-label="Menu" onClick={()=>setOpen(!open)}>☰</button></header>
 <main id="main"><Outlet/></main>
 <footer className="foot"><div><b>{g.brand}</b> {g.brand_sub}<p>{ct.address} · {ct.hours}</p></div><div><a href={'mailto:'+ct.email}>{ct.email}</a><p>{g.footer_text}</p></div></footer></div>}
