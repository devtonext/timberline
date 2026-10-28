import {useState} from 'react';import {useSearchParams} from 'react-router-dom';import {api} from '../lib/api.js';import {useSite} from '../lib/site.jsx';
export default function Contact(){const{content:c}=useSite();const[sp]=useSearchParams();const[f,setF]=useState({name:'',email:'',phone:'',message:sp.get('msg')||''});const[st,setSt]=useState('idle'),[err,setErr]=useState({});
 const go=async e=>{e.preventDefault();const E={};if(!f.name.trim())E.name='Required';if(!/^\S+@\S+\.\S+$/.test(f.email))E.email='Valid email required';if(f.message.trim().length<5)E.message='Tell us a bit more';setErr(E);if(Object.keys(E).length)return;
  setSt('loading');try{await api.submit('inquiries',f);setSt('done')}catch{setSt('error')}};
 return <section className="page narrow"><h1>Request a quote</h1><p>{c.contact.email} · {c.contact.phone}</p>
 {st==='done'?<div className="card l"><b>Thank you!</b><p>We will contact you shortly.</p></div>:
 <form onSubmit={go} noValidate>{['name','email','phone'].map(n=><label key={n}>{n[0].toUpperCase()+n.slice(1)}<input className="in" value={f[n]} onChange={e=>setF({...f,[n]:e.target.value})}/>{err[n]&&<small className="err">{err[n]}</small>}</label>)}
 <label>Message<textarea className="in" rows="5" value={f.message} onChange={e=>setF({...f,message:e.target.value})}/>{err.message&&<small className="err">{err.message}</small>}</label>
 <button className="pill dark" disabled={st==='loading'}>{st==='loading'?'Sending…':'Send request'}</button>{st==='error'&&<small className="err">Something went wrong.</small>}</form>}</section>}
