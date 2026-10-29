import {useState} from 'react';import {useSearchParams} from 'react-router-dom';import {api} from '../lib/api.js';import {useSite} from '../lib/site.jsx';import {Lines} from '../components/Layout.jsx';
const Ico=({d})=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>;
const I={mail:'M3 6h18v12H3z M3 7l9 6 9-6',phone:'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',clock:'M12 7v5l3 2 M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',pin:'M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'};
export default function Contact(){const{content:c}=useSite();const ct=c.contact,cp=c.contact_page;const[sp]=useSearchParams();
 const[f,setF]=useState({name:'',email:'',phone:'',message:sp.get('msg')||''});const[st,setSt]=useState('idle'),[err,setErr]=useState({});
 const go=async e=>{e.preventDefault();const E={};if(!f.name.trim())E.name='Required';if(!/^\S+@\S+\.\S+$/.test(f.email))E.email='Valid email required';if(f.message.trim().length<5)E.message='Tell us a bit more';setErr(E);if(Object.keys(E).length)return;
  setSt('loading');try{await api.submit('inquiries',f);setSt('done')}catch{setSt('error')}};
 const cards=[['Email',ct.email,'mailto:'+ct.email,I.mail],['Phone',ct.phone,'tel:'+ct.phone,I.phone],['Working hours',ct.hours,null,I.clock],['Office',ct.address,null,I.pin]];
 return <section className="hero contact-hero"><div className="panel hero-l"><Lines as="h1" text={cp.title}/><p>{cp.text}</p>
  <div className="ig">{cards.map(([l,v,h,d])=>{const T=h?'a':'div';return <T className="ic" key={l} href={h||undefined}><span className="ico2"><Ico d={d}/></span><small>{l}</small><b>{v}</b></T>})}</div>
  <div className="social"><a href={ct.instagram} target="_blank" rel="noreferrer">Instagram</a><a href={ct.facebook} target="_blank" rel="noreferrer">Facebook</a></div></div>
  <div className="form-card">{st==='done'?<><h2>Thank you!</h2><p>We received your request and will contact you shortly.</p></>:<><h2>{cp.form_title}</h2><p>{cp.form_text}</p>
  <form onSubmit={go} noValidate>{[['name','Name'],['email','Email'],['phone','Phone (optional)']].map(([n,l])=><label key={n}>{l}<input className="in" value={f[n]} onChange={e=>setF({...f,[n]:e.target.value})}/>{err[n]&&<small className="err">{err[n]}</small>}</label>)}
  <label>Message<textarea className="in" rows="4" value={f.message} onChange={e=>setF({...f,message:e.target.value})}/>{err.message&&<small className="err">{err.message}</small>}</label>
  <button className="pill dark" disabled={st==='loading'}>{st==='loading'?'Sending…':'Send request'} <i aria-hidden="true"/></button>{st==='error'&&<small className="err">Something went wrong. Please try again.</small>}</form></>}</div></section>}
