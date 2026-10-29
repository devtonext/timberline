import {useState} from 'react';import {useSite} from '../lib/site.jsx';import {Lines,SmartLink} from './Layout.jsx';
export function ServicesGrid({limit}){const{content:c,collections:k}=useSite();const rows=limit?k.services.slice(0,limit):k.services;
 return <section className="blk"><div className="blk-h"><Lines as="h2" text={c.services_sec.title}/><p>{c.services_sec.text}</p></div><div className="grid3 sg">{rows.map(s=><div className="card l" key={s.id}><span className="ico">{s.icon}</span><b>{s.title}</b><p>{s.text}</p><i/></div>)}</div></section>}
export function Testimonials(){const{content:c,collections:k}=useSite();
 return <section className="blk"><h2 className="ctr">{c.testimonials_sec.title}</h2><div className="grid3">{k.testimonials.map((t,i)=><figure className={'card tq '+(i===1?'d':'l')} key={t.id}><blockquote>“{t.quote}”</blockquote><figcaption><img src={t.image} alt={t.name}/><span><b>{t.name}</b><small>{t.role}</small></span></figcaption></figure>)}</div></section>}
export function Team(){const{content:c,collections:k}=useSite();
 return <section className="blk"><h2 className="ctr">{c.team_sec.title}</h2><div className="grid4">{k.team.map(m=><div className="member" key={m.id}><div className="ph"><img src={m.image} alt={m.name}/></div><b>{m.name}</b><small>{m.role}</small></div>)}</div></section>}
export function FAQ(){const{content:c,collections:k}=useSite();const[o,setO]=useState(0);
 return <section className="blk narrow"><h2 className="ctr">{c.faq_sec.title}</h2>{k.faqs.map((f,i)=><div className={'faq'+(o===i?' open':'')} key={f.id}><button onClick={()=>setO(o===i?-1:i)} aria-expanded={o===i}><span>{f.question}</span><i>+</i></button><div className="ans"><p>{f.answer}</p></div></div>)}</section>}
export function CTA(){const{content:{cta:a}}=useSite();
 return <section className="cta" style={{backgroundImage:`linear-gradient(90deg,#000b,#0004),url(${a.image})`}}><div><Lines as="h2" text={a.title}/><p>{a.text}</p><SmartLink to={a.link} className="pill light">{a.button} <i/></SmartLink></div></section>}
export function Why(){const{content:c,collections:k}=useSite();const w=c.projects_why;
 return <section className="blk"><div className="blk-h"><Lines as="h2" text={w.title}/><p>{w.text}</p></div><div className="grid3">{k.features.map(f=><div className="dcard" key={f.id}><img src={f.image} alt=""/><div><b>{f.title}</b><p>{f.text}</p></div></div>)}</div></section>}
export function Process(){const{content:c,collections:k}=useSite();
 return <section className="steps"><h2>{c.steps.title}</h2><div className="grid3">{k.steps.map((s,i)=><div key={s.id}><span className="num">{i+1}</span><Lines as="b" text={s.title}/><p>{s.text}</p></div>)}</div></section>}
export function Financing(){const{content:c,collections:k}=useSite();
 return <section className="pay"><h2>{c.payments.title}</h2><div className="grid4">{k.payments.map((p,i)=><div key={p.id} className={'card '+(i%2?'d':'l')}><b>{p.title}</b><p>{p.text}</p><i/></div>)}</div></section>}
