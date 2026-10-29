import {useSite} from '../lib/site.jsx';import {Lines,SmartLink} from '../components/Layout.jsx';import {Team,Testimonials,CTA} from '../components/Sections.jsx';
export default function About(){const{content:c,collections:k}=useSite();const a=c.about;
 return <><section className="hero"><div className="panel hero-l"><Lines as="h1" text={a.title}/><p>{a.text}</p><SmartLink to="/contact" className="pill dark">Talk to us <i/></SmartLink></div><div className="hero-r"><img src={a.image} alt=""/></div></section>
 <section className="mission panel"><h2>{a.mission_title}</h2><p>{a.mission_text}</p><div className="stats">{k.stats.map(s=><div className="stat" key={s.id}><b>{s.value}<em>{s.suffix}</em></b><span>{s.label}</span></div>)}</div></section>
 <Team/><Testimonials/><CTA/></>}
