const img=(id,w=900)=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
export const defaultContent={
general:{brand:'Timberline',brand_sub:'HOMES',tagline:'Timber-frame homes',primary_color:'#2a2c2f',accent_color:'#c8844a',announcement_on:false,announcement_text:'Spring offer: free site survey',announcement_link:'/contact',footer_text:'© 2026 Timberline Homes. All rights reserved.'},
seo:{meta_title:'Timberline Homes — Timber-frame houses, turnkey in 2 months',meta_description:'Energy-efficient timber-frame homes built turnkey in as little as 2 months.',og_image:img('photo-1568605114967-8130f3a36994',1200)},
contact:{phone:'+1 (555) 989-9889',email:'hello@timberline.demo',address:'12 Pine Ridge Road, Portland, OR',hours:'Mon–Fri 9:00–18:00',map_embed_url:'',instagram:'#',facebook:'#'},
hero:{title:'A ready timber-frame home\nfrom 1,100 sq ft, turnkey in 2 months',text:'We build thoughtful, eco-friendly homes with high energy efficiency for comfortable family living.',cta_label:'Request a quote',cta_link:'/contact',image:img('photo-1449844908441-8829872d2607',1000)},
tech:{title:'We build homes\nusing timber-frame technology',text:'Cottages and saunas built with timber-frame technology are popular worldwide, and some have stood for centuries.',image:img('photo-1503387762-592deb58ef4e',1000)},
catalog:{title:'Our project catalog\nfor 2024',side_title:'Timber-frame construction',side_sub:'at the peak of its popularity',cta_label:'View catalog'},
payments:{title:'Ways to pay'},
steps:{title:'Three steps to your new home'}};
export const defaultCollections={
stats:[{id:'s1',sort_order:1,published:true,value:'65',suffix:'~',label:'average days to build',image:img('photo-1480074568708-e7b720bb3f09',200)},
{id:'s2',sort_order:2,published:true,value:'7',suffix:'+',label:'years of warranty on every home',image:img('photo-1449844908441-8829872d2607',200)},
{id:'s3',sort_order:3,published:true,value:'180',suffix:'+',label:'homes built since 2013',image:img('photo-1518780664697-55e3ad937233',200)}],
features:[{id:'f1',sort_order:1,published:true,title:'High strength',text:'Resistant to cracks and deformation.',image:img('photo-1503387762-592deb58ef4e',200)},
{id:'f2',sort_order:2,published:true,title:'Thermal insulation',text:'Warms up fast and holds heat for long.',image:img('photo-1523217582562-09d0def993a6',200)},
{id:'f3',sort_order:3,published:true,title:'No settling',text:'Move in right after the finishing work.',image:img('photo-1448630360428-65456885c650',200)}],
projects:[{id:'p1',sort_order:1,published:true,title:'Timber house, 830 sq ft',price:'from $72,000',image:img('photo-1518780664697-55e3ad937233'),description:'Compact dark-clad A-frame cottage.'},
{id:'p2',sort_order:2,published:true,title:'Timber house, 1,010 sq ft',price:'from $96,000',image:img('photo-1564013799919-ab600027ffc6'),description:'Glass-front modern two-storey home.'},
{id:'p3',sort_order:3,published:true,title:'Timber house, 700 sq ft',price:'from $80,000',image:img('photo-1449844908441-8829872d2607'),description:'Cantilevered balcony house in the pines.'},
{id:'p4',sort_order:4,published:true,title:'Timber house, 650 sq ft',price:'from $69,000',image:img('photo-1480074568708-e7b720bb3f09'),description:'Gabled wood-clad family cabin.'}],
payments:[{id:'m1',sort_order:1,published:true,title:'Home loan',text:'We partner with several major banks offering loans from 5.5% a year.'},
{id:'m2',sort_order:2,published:true,title:'Family capital',text:'Use state family capital towards building your home.'},
{id:'m3',sort_order:3,published:true,title:'Subsidies',text:'We work with government subsidy programs. Call us for details.'},
{id:'m4',sort_order:4,published:true,title:'Bank transfer',text:'Sign a contract with the company and pay for work by invoice.'}],
steps:[{id:'t1',sort_order:1,published:true,title:'Consultation\nand design',text:'Share your wishes and budget, and get a tailored project proposal.'},
{id:'t2',sort_order:2,published:true,title:'Construction',text:'Our team builds the frame house on schedule with quality control.'},
{id:'t3',sort_order:3,published:true,title:'Finishing',text:'We complete interior and exterior finishing and hand over the keys.'}]};
export const defaultSubmissions={inquiries:[{id:'i1',created_at:'2026-10-01T10:00:00Z',status:'new',name:'Anna Lee',email:'anna@example.com',phone:'+1 555 0101',message:'I would like a quote for a 900 sq ft house.'}]};
