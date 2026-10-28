import {Routes,Route} from 'react-router-dom';
import Layout from './components/Layout.jsx';import Home from './pages/Home.jsx';import Projects from './pages/Projects.jsx';
import Contact from './pages/Contact.jsx';import NotFound from './pages/NotFound.jsx';
export default function App(){return <Routes><Route element={<Layout/>}>
<Route index element={<Home/>}/><Route path="projects" element={<Projects/>}/><Route path="contact" element={<Contact/>}/><Route path="*" element={<NotFound/>}/></Route></Routes>}
