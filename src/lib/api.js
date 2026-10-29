import {defaultContent,defaultCollections,defaultSubmissions} from './defaults.js';
const URL=import.meta.env.VITE_SUPABASE_URL,KEY=import.meta.env.VITE_SUPABASE_ANON_KEY;
export const isDemo=!(URL&&KEY);
const ls=(k,d)=>{try{return JSON.parse(localStorage.getItem('tl_'+k))??d}catch{return d}};
const set=(k,v)=>{try{localStorage.setItem('tl_'+k,JSON.stringify(v))}catch{}};
const sort=r=>[...r].sort((a,b)=>a.sort_order-b.sort_order);
const merge=m=>Object.fromEntries(Object.keys(defaultContent).map(k=>[k,{...defaultContent[k],...(m[k]||{})}]));
const K=t=>defaultSubmissions[t]?['sub_'+t,defaultSubmissions[t]]:['col_'+t,defaultCollections[t]||[]];
const demo={
 async getContent(){return merge(ls('content',{}))},
 async saveContent(key,data){const s=ls('content',{});s[key]={...(s[key]||{}),...data};set('content',s)},
 async list(t,{admin}={}){if(defaultSubmissions[t])return [...ls('sub_'+t,defaultSubmissions[t])].sort((a,b)=>b.created_at.localeCompare(a.created_at));
  const rows=ls('col_'+t,defaultCollections[t]||[]);return sort(admin?rows:rows.filter(r=>r.published))},
 async insert(t,row){const rows=ls('col_'+t,defaultCollections[t]||[]);rows.push({id:crypto.randomUUID(),sort_order:rows.length+1,published:true,...row});set('col_'+t,rows)},
 async update(t,id,p){const[k,d]=K(t);set(k,ls(k,d).map(r=>r.id===id?{...r,...p}:r))},
 async remove(t,id){const[k,d]=K(t);set(k,ls(k,d).filter(r=>r.id!==id))},
 async submit(t,row){const rows=ls('sub_'+t,defaultSubmissions[t]||[]);rows.push({id:crypto.randomUUID(),created_at:new Date().toISOString(),status:'new',...row});set('sub_'+t,rows)},
 async getSession(){return ls('session',null)},
 async signIn(e,p){if(e==='admin@demo.com'&&p==='demo1234'){set('session',{email:e});return}throw new Error('Invalid demo credentials')},
 async signUp(){throw new Error('Not available in demo mode')},
 async signOut(){localStorage.removeItem('tl_session')},
 async isAdmin(){return !!ls('session',null)},
 async adminExists(){return true},
 async uploadMedia(f){if(f.size>1.5e6)throw new Error('Image must be under 1.5 MB in demo mode');return new Promise(r=>{const x=new FileReader();x.onload=()=>r(x.result);x.readAsDataURL(f)})},
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
 async getSession(){const c=await client();return (await c.auth.getSession()).data.session},
 async signIn(e,p){const c=await client();const{error}=await c.auth.signInWithPassword({email:e,password:p});if(error)throw error},
 async signUp(e,p){const c=await client();const{error}=await c.auth.signUp({email:e,password:p});if(error)throw error},
 async signOut(){const c=await client();await c.auth.signOut()},
 async isAdmin(){const c=await client();const{data}=await c.rpc('is_admin');return !!data},
 async adminExists(){const c=await client();const{data}=await c.rpc('admin_exists');return !!data},
 async uploadMedia(f){const c=await client();const b=import.meta.env.VITE_SUPABASE_BUCKET||'media';const n=Date.now()+'-'+f.name.replace(/[^\w.-]/g,'_');const{error}=await c.storage.from(b).upload(n,f);if(error)throw error;return c.storage.from(b).getPublicUrl(n).data.publicUrl},
 async resetDemo(){}};
export const api=isDemo?demo:remote;
export async function loadSite(){const cols=Object.keys(defaultCollections);
 const [content,...rows]=await Promise.all([api.getContent(),...cols.map(c=>api.list(c))]);
 return{content,collections:Object.fromEntries(cols.map((c,i)=>[c,rows[i]]))}}
