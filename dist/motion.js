(() => {
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 const active=new Set();
 const play=(element,keyframes,options)=>{
  if(preference.matches||!element.animate)return;
  const animation=element.animate(keyframes,options);active.add(animation);
  animation.finished.catch(()=>{}).finally(()=>active.delete(animation));
 };
 const hero=document.querySelector('.hero-photo img');
 if(hero)play(hero,[{transform:'scale(1.06)',filter:'saturate(.8)'},{transform:'scale(1)',filter:'saturate(1)'}],{duration:1100,easing:'cubic-bezier(.16,1,.3,1)'});
 if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>{
   entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    observer.unobserve(entry.target);
    const gallery=entry.target;
    const photos=[...gallery.querySelectorAll('.career-photo-button')];
    photos.forEach((photo,index)=>play(photo,[{transform:'translateY(18px) rotate('+(index===1?'1':'-1')+'deg)',opacity:.7},{transform:'translateY(0) rotate(0)',opacity:1}],{duration:650,delay:index*80,easing:'cubic-bezier(.16,1,.3,1)'}));
   });
  },{threshold:.12});
  document.querySelectorAll('.career-gallery').forEach(gallery=>observer.observe(gallery));
  preference.addEventListener('change',()=>{if(preference.matches){active.forEach(a=>a.cancel());observer.disconnect()}});
 }
})();
