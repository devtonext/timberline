import {createContext,useContext,useEffect,useState,useCallback} from 'react';import {loadSite} from './api.js';import {defaultContent,defaultCollections} from './defaults.js';
const Ctx=createContext();export const useSite=()=>useContext(Ctx);
export function SiteProvider({children}){
 const [s,setS]=useState({content:defaultContent,collections:defaultCollections,ready:false});
 const reload=useCallback(async()=>{try{setS({...(await loadSite()),ready:true})}catch{setS(x=>({...x,ready:true}))}},[]);
 useEffect(()=>{reload()},[reload]);
 useEffect(()=>{const g=s.content.general,r=document.documentElement.style;r.setProperty('--primary',g.primary_color);r.setProperty('--accent',g.accent_color);
  const q=s.content.seo;document.title=q.meta_title;let m=document.querySelector('meta[name=description]');if(!m){m=document.createElement('meta');m.name='description';document.head.appendChild(m)}m.content=q.meta_description},[s]);
 return <Ctx.Provider value={{...s,reload}}>{children}</Ctx.Provider>}
