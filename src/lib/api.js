import {defaultContent,defaultCollections,defaultSubmissions} from './defaults.js';
const URL=import.meta.env.VITE_SUPABASE_URL,KEY=import.meta.env.VITE_SUPABASE_ANON_KEY;
export const isDemo=!(URL&&KEY);
const ls=(k,d)=>{try{return JSON.parse(localStorage.getItem('tl_'+k))??d}catch{return d}};
const set=(k,v)=>{try{localStorage.setItem('tl_'+k,JSON.stringify(v))}catch{}};
const sort=r=>[...r].sort((a,b)=>a.sort_order-b.sort_order);
const merge=m=>Object.fromEntries(Object.keys(defaultContent).map(k=>[k,{...defaultContent[k],...(m[k]||{})}]));
const demo={
 async getContent(){return merge(ls('content',{}))},
 async saveContent(key,data){const s=ls('content',{});s[key]={...(s[key]||{}),...data};set('content',s)},
 async list(t,{admin}={}){if(defaultSubmissions[t])return [...ls('sub_'+t,defaultSubmissions[t])].sort((a,b)=>b.created_at.localeCompare(a.created_at));
  const rows=ls('col_'+t,defaultCollections[t]||[]);return sort(admin?rows:rows.filter(r=>r.published))},
 async insert(t,row){const rows=ls('col_'+t,defaultCollections[t]||[]);rows.push({id:crypto.randomUUID(),sort_order:rows.length+1,published:true,...row});set('col_'+t,rows)},
 async update(t,id,p){set('col_'+t,ls('col_'+t,defaultCollections[t]||[]).map(r=>r.id===id?{...r,...p}:r))},
 async remove(t,id){set('col_'+t,ls('col_'+t,defaultCollections[t]||[]).filter(r=>r.id!==id))},
 async submit(t,row){const rows=ls('sub_'+t,defaultSubmissions[t]||[]);rows.push({id:crypto.randomUUID(),created_at:new Date().toISOString(),status:'new',...row});set('sub_'+t,rows)},
 async resetDemo(){Object.keys(localStorage).filter(k=>k.startsWith('tl_')).forEach(k=>localStorage.removeItem(k))}};
let sb;const client=async()=>sb||(sb=(await import('@supabase/supabase-js')).createClient(URL,KEY));
const remote={
 async getContent(){const c=await client();const{data}=await c.from('site_content').select('*');return merge(Object.fromEntries((data||[]).map(r=>[r.key,r.data])))},
 async saveContent(key,d){const c=await client();const cur=(await this.getContent())[key];await c.from('site_content').upsert({key,data:{...cur,...d}})},
 async list(t,{admin}={}){const c=await client();let q=c.from(t).select('*');
  if(defaultSubmissions[t])q=q.order('created_at',{ascending:false});else{if(!admin)q=q.eq('published',true);q=q.order('sort_order')}
  const{data}=await q;return data||[]},
 async insert(t,r){const c=await client();await c.from(t).insert(r)},
 async update(t,id,p){const c=await client();await c.from(t).update(p).eq('id',id)},
 async remove(t,id){const c=await client();await c.from(t).delete().eq('id',id)},
 async submit(t,r){const c=await client();const{error}=await c.from(t).insert(r);if(error)throw error},
 async resetDemo(){}};
export const api=isDemo?demo:remote;
export async function loadSite(){const cols=Object.keys(defaultCollections);
 const [content,...rows]=await Promise.all([api.getContent(),...cols.map(c=>api.list(c))]);
 return{content,collections:Object.fromEntries(cols.map((c,i)=>[c,rows[i]]))}}
