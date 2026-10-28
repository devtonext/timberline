import {useState} from 'react';import {useSite} from '../lib/site.jsx';
export default function Projects(){const{collections:k}=useSite();const[q,setQ]=useState('');
 const rows=k.projects.filter(p=>(p.title+p.description).toLowerCase().includes(q.toLowerCase()));
 return <section className="page"><h1>Our projects</h1><input className="in" placeholder="Search projects…" value={q} onChange={e=>setQ(e.target.value)}/>
 <div className="grid4">{rows.map(p=><article key={p.id} className="proj tall" style={{backgroundImage:`url(${p.image})`}}><div><b>{p.title}</b><small>{p.price}</small><small>{p.description}</small></div></article>)}{!rows.length&&<p>No projects found.</p>}</div></section>}
