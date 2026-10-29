import {useState,useEffect} from 'react';import {Link,NavLink,Outlet,useLocation} from 'react-router-dom';import {useSite} from '../lib/site.jsx';
export const Lines=({text,as:T='span'})=><T>{String(text||'').split('\n').map((l,i)=><span key={i}>{i>0&&<br/>}{l}</span>)}</T>;
export const SmartLink=({to,children,...p})=>/^https?:/.test(to)?<a href={to} target="_blank" rel="noreferrer" {...p}>{children}</a>:<Link to={to||'/'} {...p}>{children}</Link>;
export default function Layout(){const{content:c,ready}=useSite();const[open,setOpen]=useState(false);const{pathname}=useLocation();const g=c.general,ct=c.contact;
 useEffect(()=>{window.scrollTo(0,0);const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.06});
  document.querySelectorAll('main section').forEach(el=>{el.classList.add('rv');io.observe(el)});return()=>io.disconnect()},[pathname,ready]);
 return <div className="shell"><a className="skip" href="#main">Skip to content</a>
 {g.announcement_on&&<SmartLink to={g.announcement_link} className="announce">{g.announcement_text}</SmartLink>}
 <header className="nav"><Link to="/" className="logo"><b>{g.brand}</b><small>{g.brand_sub}</small></Link>
 <nav className={open?'open':''} onClick={()=>setOpen(false)}><NavLink to="/" end>Home</NavLink><NavLink to="/about">About</NavLink><NavLink to="/services">Services</NavLink><NavLink to="/projects">Projects</NavLink><NavLink to="/contact">Contact</NavLink></nav>
 <a className="pill ghost" href={'tel:'+ct.phone}>{ct.phone}</a><button className="burger" aria-label="Menu" onClick={()=>setOpen(!open)}>☰</button></header>
 <main id="main"><Outlet/></main>
 <footer className="foot"><div><b>{g.brand}</b> {g.brand_sub}<p>{g.tagline}</p><p>{ct.address}<br/>{ct.hours}</p></div>
 <div><b>Pages</b><Link to="/about">About</Link><Link to="/services">Services</Link><Link to="/projects">Projects</Link><Link to="/contact">Contact</Link></div>
 <div><b>Contact</b><a href={'mailto:'+ct.email}>{ct.email}</a><a href={'tel:'+ct.phone}>{ct.phone}</a><Link to="/admin">Admin</Link></div>
 <p className="copy">{g.footer_text}</p></footer></div>}
