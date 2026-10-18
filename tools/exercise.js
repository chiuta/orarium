// usage: node tools/exercise.js [index.html] <lang> [dumpKeys.json]  — walks every screen/body in one language; reports missing translations, errors, NaN
const {JSDOM}=require('jsdom');
const fs=require('fs');
let av=process.argv.slice(2); if(av[0]&&!/\.html?$/.test(av[0]))av.unshift(require('path').join(__dirname,'..','index.html'));
const [file,lang,dump]=av;
const errs=[];
const dom=new JSDOM(fs.readFileSync(file,'utf8'),{runScripts:'dangerously',pretendToBeVisual:true,url:'http://x/',beforeParse(w){w.addEventListener('error',e=>errs.push(e.message));w.scrollTo=()=>{};}});
const w=dom.window,D=w.document,ev=w.eval.bind(w),$=i=>D.getElementById(i);
const fire=(el,t)=>el.dispatchEvent(new w.Event(t,{bubbles:true}));
const texts=[];
function snap(tag){const c=D.body.cloneNode(true);c.querySelectorAll('script').forEach(x=>x.remove());texts.push([tag,c.textContent.replace(/\s+/g,' ')])}
setTimeout(()=>{
 $('lang-z').value=lang;fire($('lang-z'),'change');ev('MISS.clear()');
 const ids=ev('B.map(b=>b.id)');
 for(const v of ['acum','metoda','conv','col','map','link','scen']){D.querySelector('#tabs button[data-v='+v+']').click();snap('tab:'+v)}
 // chips
 D.querySelector('#tabs button[data-v=acum]').click();
 D.querySelectorAll('#chips button').forEach(b=>{b.click()});
 // details of all bodies (also moon, mars extras)
 for(const id of ids){
  D.querySelector('#tabs button[data-v=acum]').click();
  ev("filter='toate';buildChips();buildBoard();tickBoard()");
  const c=D.querySelector('[data-id="'+id+'"]');c.click();
  const alt=$('d-alt');if(alt){alt.value=alt.max;fire(alt,'input')}
  if($('d-an')){$('d-an').value='06:30:00';$('d-anb').click();$('d-anr').click()}
  snap('det:'+id);
  ev('closeDetail()');
 }
 // maps for all bodies
 D.querySelector('#tabs button[data-v=map]').click();
 for(const id of ev('B.filter(b=>COL[b.id]).map(b=>b.id)')){$('mp-b').value=id;fire($('mp-b'),'change');ev('tickMap()');snap('map:'+id)}
 // conv
 D.querySelector('#tabs button[data-v=conv]').click();
 for(const id of ids){$('cv-b').value=id;fire($('cv-b'),'change');if($('cv-p').options.length>1){$('cv-p').selectedIndex=1;fire($('cv-p'),'change')};snap('conv:'+id)}
 // transmisii: stație personalizată
 D.querySelector('#tabs button[data-v=link]').click();
 for(const sid of ['1','2','3','4','','0']){$('lk-s').value=sid;fire($('lk-s'),'change');ev('buildLink()');snap('link:'+sid)}
 for(const [pa,pb] of [['terra','marte'],['marte','jupiter'],['terra','luna'],['phobos','marte'],['titan','europa'],['terra','ceres'],['marte','marte']]){$('pk-a').value=pa;$('pk-b').value=pb;fire($('pk-b'),'change');ev('buildPair()');snap('pair:'+pa+pb)}
 // DST gap / ambiguity
 $('cv-z').value='Europe/Bucharest';
 for(const t of ['2026-03-29T03:30','2026-10-25T03:30']){$('cv-t').value=t;fire($('cv-t'),'input');snap('conv-dst')}
 // ref zone change
 $('ref-z').value='Asia/Tokyo';fire($('ref-z'),'change');snap('ref');
 $('ref-z').value='Europe/Bucharest';fire($('ref-z'),'change');
 // colonization
 D.querySelector('#tabs button[data-v=col]').click();
 D.querySelectorAll('#cchips button').forEach(b=>{b.click();snap('colchip')});
 D.querySelectorAll('#cpre button').forEach(b=>{b.click()});
 // open detail from col list
 D.querySelector('#clist .crow').click();snap('col-det');ev('closeDetail()');
 D.querySelector('#tabs button[data-v=scen]').click();snap('scen');
 // language switch with detail open (re-render)
 D.querySelector('#tabs button[data-v=acum]').click();
 D.querySelector('[data-id=marte]').click();
 if(lang!=='ro'){$('lang-z').value='ro';fire($('lang-z'),'change');$('lang-z').value=lang;fire($('lang-z'),'change');snap('relang')}
 const miss=Array.from(ev('MISS'));
 if(dump)fs.writeFileSync(dump,JSON.stringify({miss,staticKeys:ev('STAT.map(p=>p[1])')},null,1));
 // Romanian leftovers check
 const ro=/[ăîșțâĂÎȘȚÂşţ]/;let leftovers=[];
 if(lang!=='ro'){for(const [tag,t] of texts){const m=t.replace(/Română/g,'').match(/.{0,50}[ăîșțâĂÎȘȚÂşţ].{0,30}/g);if(m)leftovers.push([tag,m.slice(0,3)])}}
 const nan=texts.filter(([t,x])=>/NaN|undefined|Infinity/.test(x)).map(x=>x[0]);
 console.log(JSON.stringify({lang,misses:miss.length,errors:errs,nanIn:nan,leftoverCount:leftovers.length,leftoverSample:leftovers.slice(0,6)},null,1));
 process.exit();
},800);
