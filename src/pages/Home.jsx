import {useRef} from 'react';import {useSite} from '../lib/site.jsx';import {Lines,SmartLink} from '../components/Layout.jsx';import {ServicesGrid,Testimonials,FAQ,CTA} from '../components/Sections.jsx';
export default function Home(){const{content:c,collections:k}=useSite();const h=c.hero,t=c.tech,cat=c.catalog,tr=useRef();
 const scroll=d=>tr.current?.scrollBy({left:d*300,behavior:'smooth'});
 return <>
 <section className="hero"><div className="panel hero-l"><Lines as="h1" text={h.title}/><p>{h.text}</p>
  <SmartLink to={h.cta_link} className="pill dark">{h.cta_label} <i aria-hidden="true"></i></SmartLink>
  <div className="stats">{k.stats.map(s=><div className="stat" key={s.id}><img src={s.image} alt=""/><b>{s.value}<em>{s.suffix}</em></b><span>{s.label}</span></div>)}</div></div>
  <div className="hero-r"><img src={h.image} alt="Timber-frame house"/></div></section>
 <section className="tech"><div><Lines as="h2" text={t.title}/><p>{t.text}</p><img className="frame" src={t.image} alt="Timber frame structure"/></div>
  <div className="feats">{k.features.map(f=><div className="dcard" key={f.id}><img src={f.image} alt=""/><div><b>{f.title}</b><p>{f.text}</p></div></div>)}</div></section>
 <section className="panel catalog"><div className="cat-h"><Lines as="h2" text={cat.title}/><div><b>{cat.side_title}</b><small>{cat.side_sub}</small></div></div>
  <div className="track" ref={tr}>{k.projects.map(p=><article key={p.id} className="proj"><img src={p.image} alt={p.title}/><div><b>{p.title}</b><small>{p.price}</small></div></article>)}</div>
  <div className="cat-f"><SmartLink to="/projects" className="pill dark">{cat.cta_label} <i aria-hidden="true"></i></SmartLink><div><button aria-label="Previous" onClick={()=>scroll(-1)}>◁</button><button aria-label="Next" className="on" onClick={()=>scroll(1)}>▷</button></div></div></section>
 <section className="pay"><h2>{c.payments.title}</h2><div className="grid4">{k.payments.map((p,i)=><div key={p.id} className={'card '+(i%2?'d':'l')}><b>{p.title}</b><p>{p.text}</p><i aria-hidden="true"></i></div>)}</div></section>
 <section className="steps"><h2>{c.steps.title}</h2><div className="grid3">{k.steps.map((s,i)=><div key={s.id}><span className="num">{i+1}</span><Lines as="b" text={s.title}/><p>{s.text}</p></div>)}</div></section><ServicesGrid limit={3}/><Testimonials/><FAQ/><CTA/></>}
