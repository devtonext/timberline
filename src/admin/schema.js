const T='text',A='textarea',I='image';
const cta=['cta','Call-to-action band',[['title','Heading',A],['text','Text',A],['button','Button label',T],['link','Button link',T],['image','Background image',I]]];
export const PAGES={
 home:{label:'Home',path:'/',sections:[
  {title:'Hero',hint:'The very top of the home page: heading, button, photo and the three stat cards.',content:[['hero','Hero content',[['title','Heading (one line per row)',A],['text','Text',A],['cta_label','Button label',T],['cta_link','Button link',T],['image','Hero photo',I]]]],collections:[['stats','Hero stat cards']]},
  {title:'Technology',hint:'Intro text, big image and the three dark feature cards.',content:[['tech','Technology content',[['title','Heading',A],['text','Text',A],['image','Image',I]]]],collections:[['features','Feature cards']]},
  {title:'Catalog',hint:'The project slider. Cards are shared with the Projects page.',content:[['catalog','Catalog heading',[['title','Heading',A],['side_title','Side title',T],['side_sub','Side subtitle',T],['cta_label','Button label',T]]]],collections:[['projects','Project cards']]},
  {title:'Payments',content:[['payments','Payments heading',[['title','Heading',T]]]],collections:[['payments','Payment cards']]},
  {title:'Process steps',content:[['steps','Steps heading',[['title','Heading',T]]]],collections:[['steps','Steps']]},
  {title:'Services',content:[['services_sec','Services heading',[['title','Heading',T],['text','Text',A]]]],collections:[['services','Services']]},
  {title:'Testimonials',content:[['testimonials_sec','Testimonials heading',[['title','Heading',T]]]],collections:[['testimonials','Testimonials']]},
  {title:'FAQ',content:[['faq_sec','FAQ heading',[['title','Heading',T]]]],collections:[['faqs','Questions']]},
  {title:'Call to action',content:[cta]}]},
 about:{label:'About',path:'/about',sections:[
  {title:'Intro',content:[['about','Intro',[['title','Heading',A],['text','Text',A],['image','Image',I]]]]},
  {title:'Mission & stats',content:[['about','Mission',[['mission_title','Mission title',T],['mission_text','Mission text',A]]]],collections:[['stats','Stat cards (shared with Home)']]},
  {title:'Team',content:[['team_sec','Team heading',[['title','Heading',T]]]],collections:[['team','Team members']]},
  {title:'Testimonials',content:[['testimonials_sec','Testimonials heading',[['title','Heading',T]]]],collections:[['testimonials','Testimonials']]},
  {title:'Call to action',content:[cta]}]},
 services:{label:'Services',path:'/services',sections:[
  {title:'Intro',content:[['services_page','Intro',[['title','Heading',A],['text','Text',A],['image','Image',I]]]]},
  {title:'Services',content:[['services_sec','Services heading',[['title','Heading',T],['text','Text',A]]]],collections:[['services','Services']]},
  {title:'Process steps',content:[['steps','Steps heading',[['title','Heading',T]]]],collections:[['steps','Steps']]},
  {title:'FAQ',content:[['faq_sec','FAQ heading',[['title','Heading',T]]]],collections:[['faqs','Questions']]},
  {title:'Call to action',content:[cta]}]},
 projects:{label:'Projects',path:'/projects',sections:[
  {title:'Intro',content:[['projects_page','Intro',[['title','Heading',A],['text','Text',A],['image','Image',I]]]]},
  {title:'Project grid',hint:'Set a category on each project to power the filter chips.',collections:[['projects','Projects']]},
  {title:'Why us',content:[['projects_why','Why-us heading',[['title','Heading',T],['text','Text',A]]]],collections:[['features','Feature cards']]},
  {title:'Process steps',content:[['steps','Steps heading',[['title','Heading',T]]]],collections:[['steps','Steps']]},
  {title:'Financing',content:[['payments','Payments heading',[['title','Heading',T]]]],collections:[['payments','Payment cards']]},
  {title:'Testimonials',content:[['testimonials_sec','Testimonials heading',[['title','Heading',T]]]],collections:[['testimonials','Testimonials']]},
  {title:'FAQ',content:[['faq_sec','FAQ heading',[['title','Heading',T]]]],collections:[['faqs','Questions']]},
  {title:'Call to action',content:[cta]}]},
 contact:{label:'Contact details',path:'/contact',sections:[{title:'Contact details',content:[['contact','Contact details',[['phone','Phone',T],['email','Email',T],['address','Address',T],['hours','Opening hours',T],['instagram','Instagram URL',T],['facebook','Facebook URL',T]]]]}]},
 menus:{label:'Menus',path:'/',sections:[
  {title:'Header menu',hint:'Links in the top navigation. Use /path for pages or https://… for external sites.',collections:[['header_menu','Header links']]},
  {title:'Footer menus',hint:'Each link belongs to a column. Links with the same column name are grouped together.',collections:[['footer_menu','Footer links']]}]},
 site:{label:'Brand & SEO',path:'/',sections:[
  {title:'Brand & theme',content:[['general','Brand & theme',[['brand','Brand name',T],['brand_sub','Brand suffix',T],['tagline','Tagline',T],['header_cta_label','Header button label',T],['header_cta_link','Header button link',T],['primary_color','Primary colour','color'],['accent_color','Accent colour','color'],['announcement_on','Show announcement bar','boolean'],['announcement_text','Announcement text',T],['announcement_link','Announcement link',T],['footer_text','Footer text',T]]]]},
  {title:'SEO',content:[['seo','SEO',[['meta_title','Meta title',T],['meta_description','Meta description',A],['og_image','Share image',I]]]]}]}};
export const COLLECTIONS={
 projects:{label:'Projects',title:'title',img:'image',fields:[['title','Title',T],['category','Category (e.g. Modern)',T],['price','Price',T],['description','Description',A],['image','Image',I]]},
 stats:{label:'Stats',title:'label',img:'image',fields:[['value','Value',T],['suffix','Suffix',T],['label','Label',T],['image','Icon image',I]]},
 features:{label:'Features',title:'title',img:'image',fields:[['title','Title',T],['text','Text',A],['image','Image',I]]},
 payments:{label:'Payment methods',title:'title',fields:[['title','Title',T],['text','Text',A]]},
 steps:{label:'Process steps',title:'title',fields:[['title','Title',A],['text','Text',A]]},
 services:{label:'Services',title:'title',fields:[['icon','Emoji icon',T],['title','Title',T],['text','Text',A]]},
 team:{label:'Team',title:'name',img:'image',fields:[['name','Name',T],['role','Role',T],['image','Photo',I]]},
 testimonials:{label:'Testimonials',title:'name',img:'image',fields:[['name','Name',T],['role','Role',T],['quote','Quote',A],['image','Photo',I]]},
 faqs:{label:'FAQs',title:'question',fields:[['question','Question',T],['answer','Answer',A]]},
 header_menu:{label:'Header menu',title:'label',fields:[['label','Menu name',T],['url','Link (/page or https://…)',T]]},
 footer_menu:{label:'Footer menu',title:'label',fields:[['group_name','Column name',T],['label','Menu name',T],['url','Link (/page or https://…)',T]]}};
