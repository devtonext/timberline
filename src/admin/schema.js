const T='text',A='textarea',I='image';
export const PAGES={
 home:{label:'Home',path:'/',sections:[
  ['hero','Hero',[['title','Heading (one line per row)',A],['text','Text',A],['cta_label','Button label',T],['cta_link','Button link',T],['image','Image',I]]],
  ['tech','Technology section',[['title','Heading',A],['text','Text',A],['image','Image',I]]],
  ['catalog','Catalog section',[['title','Heading',A],['side_title','Side title',T],['side_sub','Side subtitle',T],['cta_label','Button label',T]]],
  ['payments','Payments heading',[['title','Heading',T]]],['steps','Steps heading',[['title','Heading',T]]],
  ['services_sec','Services heading',[['title','Heading',T],['text','Text',A]]],
  ['testimonials_sec','Testimonials heading',[['title','Heading',T]]],['faq_sec','FAQ heading',[['title','Heading',T]]],
  ['cta','Call-to-action band',[['title','Heading',A],['text','Text',A],['button','Button label',T],['link','Button link',T],['image','Background image',I]]]]},
 about:{label:'About',path:'/about',sections:[
  ['about','About page',[['title','Heading',A],['text','Text',A],['image','Image',I],['mission_title','Mission title',T],['mission_text','Mission text',A]]],
  ['team_sec','Team heading',[['title','Heading',T]]]]},
 services:{label:'Services',path:'/services',sections:[['services_page','Services page',[['title','Heading',A],['text','Text',A],['image','Image',I]]]]},
 contact:{label:'Contact details',path:'/contact',sections:[['contact','Contact details',[['phone','Phone',T],['email','Email',T],['address','Address',T],['hours','Opening hours',T],['instagram','Instagram URL',T],['facebook','Facebook URL',T]]]]},
 site:{label:'Brand & SEO',path:'/',sections:[
  ['general','Brand & theme',[['brand','Brand name',T],['brand_sub','Brand suffix',T],['tagline','Tagline',T],['primary_color','Primary colour','color'],['accent_color','Accent colour','color'],['announcement_on','Show announcement bar','boolean'],['announcement_text','Announcement text',T],['announcement_link','Announcement link',T],['footer_text','Footer text',T]]],
  ['seo','SEO',[['meta_title','Meta title',T],['meta_description','Meta description',A],['og_image','Share image',I]]]]}};
export const COLLECTIONS={
 projects:{label:'Projects',title:'title',img:'image',fields:[['title','Title',T],['price','Price',T],['description','Description',A],['image','Image',I]]},
 stats:{label:'Stats',title:'label',img:'image',fields:[['value','Value',T],['suffix','Suffix',T],['label','Label',T],['image','Icon image',I]]},
 features:{label:'Features',title:'title',img:'image',fields:[['title','Title',T],['text','Text',A],['image','Image',I]]},
 payments:{label:'Payment methods',title:'title',fields:[['title','Title',T],['text','Text',A]]},
 steps:{label:'Process steps',title:'title',fields:[['title','Title',A],['text','Text',A]]},
 services:{label:'Services',title:'title',fields:[['icon','Emoji icon',T],['title','Title',T],['text','Text',A]]},
 team:{label:'Team',title:'name',img:'image',fields:[['name','Name',T],['role','Role',T],['image','Photo',I]]},
 testimonials:{label:'Testimonials',title:'name',img:'image',fields:[['name','Name',T],['role','Role',T],['quote','Quote',A],['image','Photo',I]]},
 faqs:{label:'FAQs',title:'question',fields:[['question','Question',T],['answer','Answer',A]]}};
