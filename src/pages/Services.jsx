import {useSite} from '../lib/site.jsx';import {Lines,SmartLink} from '../components/Layout.jsx';import {ServicesGrid,FAQ,CTA} from '../components/Sections.jsx';
export default function Services(){const{content:c,collections:k}=useSite();const p=c.services_page;
 return <><section className="hero"><div className="panel hero-l"><Lines as="h1" text={p.title}/><p>{p.text}</p><SmartLink to="/contact" className="pill dark">Get an estimate <i/></SmartLink></div><div className="hero-r"><img src={p.image} alt=""/></div></section>
 <ServicesGrid/><section className="steps"><h2>{c.steps.title}</h2><div className="grid3">{k.steps.map((s,i)=><div key={s.id}><span className="num">{i+1}</span><Lines as="b" text={s.title}/><p>{s.text}</p></div>)}</div></section><FAQ/><CTA/></>}
