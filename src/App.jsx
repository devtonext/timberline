import {lazy,Suspense} from 'react';import {Routes,Route} from 'react-router-dom';import About from './pages/About.jsx';import Services from './pages/Services.jsx';
const AdminApp=lazy(()=>import('./admin/AdminApp.jsx'));
import Layout from './components/Layout.jsx';import Home from './pages/Home.jsx';import Projects from './pages/Projects.jsx';
import Contact from './pages/Contact.jsx';import NotFound from './pages/NotFound.jsx';
export default function App(){return <Routes><Route path="admin/*" element={<Suspense fallback={<p style={{padding:40}}>Loading…</p>}><AdminApp/></Suspense>}/><Route element={<Layout/>}>
<Route index element={<Home/>}/><Route path="about" element={<About/>}/><Route path="services" element={<Services/>}/><Route path="projects" element={<Projects/>}/><Route path="contact" element={<Contact/>}/><Route path="*" element={<NotFound/>}/></Route></Routes>}
