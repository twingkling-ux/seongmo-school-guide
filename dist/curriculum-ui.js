(() => {
const input=document.querySelector('#career-input'),field=document.querySelector('#career-field'),status=document.querySelector('#career-match'),result=document.querySelector('#career-result');
const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text)n.textContent=text;if(cls)n.className=cls;return n};
curriculum.profiles.forEach(p=>{const o=el('option',p.label);o.value=p.id;field.append(o)});
const picker=document.querySelector('#interest-options');
const syncPicker=()=>picker.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.field===field.value)));
curriculum.profiles.forEach(p=>{const b=el('button',p.label);b.type='button';b.dataset.field=p.id;b.setAttribute('aria-pressed','false');b.addEventListener('click',()=>{stale();input.value='';field.value=p.id;syncPicker();renderRecommendation(false);});picker.append(b);});
input.addEventListener('input',()=>queueMicrotask(syncPicker));field.addEventListener('change',syncPicker);
function stale(){if(!result.hidden){result.hidden=true;status.textContent='입력이 바뀌었습니다. 추천 과목을 다시 확인해 주세요.'}}
input.addEventListener('input',()=>{stale();const matches=matchCareer(input.value);field.value=matches.length===1?matches[0].id:'';status.textContent=matches.length===1?'관련 분야를 제안했습니다. 원하는 분야인지 확인해 주세요.':matches.length>1?'여러 분야와 연결되는 진로입니다. 추천받을 분야를 직접 선택해 주세요.':'위의 관심 분야를 직접 선택해 주세요. 세부 진로는 선생님과 함께 조정할 수 있습니다.'});
field.addEventListener('change',stale);
document.querySelector('#career-form').addEventListener('submit',e=>{
 e.preventDefault();renderRecommendation(true);
});
function renderRecommendation(moveFocus){const profile=curriculum.profiles.find(p=>p.id===field.value);
 if(!profile){status.textContent='추천받을 분야를 먼저 선택해 주세요.';picker.querySelector('button').focus();return}
 result.replaceChildren();result.hidden=false;
 result.append(el('h3',profile.label+' · 학년별 과목 안내'),el('p','진로 연계성을 바탕으로 만든 추천 예시입니다. 합격 요건이나 필수 선수 과목을 뜻하지 않습니다.','small'));
 const featured=el('section',null,'recommended-preview');featured.append(el('h4','먼저 만나볼 진로 연계 과목'));
 const available=new Set(curriculum.groups.flatMap(g=>g.courses));const highlights=profile.priority.filter(name=>available.has(name)).slice(0,4);
 if(highlights.length){const list=el('ul');highlights.forEach(name=>{const item=el('li');item.append(el('strong',name));const grades=[...new Set(curriculum.groups.filter(g=>g.courses.includes(name)).map(g=>g.term[0]+'학년'))];item.append(el('span',grades.join(' · ')+' 선택 과목'));list.append(item)});featured.append(list,el('p',profile.reason));}else featured.append(el('p','아직 진로를 정하지 않아도 괜찮아요. 아래 학년별 과목을 비교하며 관심을 찾아보세요.'));
 featured.append(el('p','진로와 연결해 살펴볼 후보입니다. 실제 선택군과 신청 조건은 아래 학년별 안내에서 확인하세요.','small'));result.append(featured);
 const selections={};
 const summary=el('p','','course-plan-status');summary.setAttribute('role','status');summary.setAttribute('aria-live','polite');
 const update=()=>{const incomplete=curriculum.groups.filter(g=>selections[g.id]?.size!==g.count);summary.textContent=incomplete.length?'선택 확인 필요: '+incomplete.map(g=>g.id+'군 '+(selections[g.id]?.size||0)+'/'+g.count+'과목').join(' · '):'모든 선택군의 과목 수가 편성표와 일치합니다. 선택 과목 총 64학점 · 학교 지정 교과와 합산 174학점';};
 const gradeSections={};
for(const grade of ['1','2','3']){const d=el('details',null,'grade-plan');d.open=true;d.append(el('summary',grade+'학년 · '+({'1':'기초를 다지는 시간','2':'관심을 넓히는 시간','3':'진로를 깊이 탐구하는 시간'}[grade])));gradeSections[grade]=d;result.append(d);}
 for(const term of Object.keys(curriculum.fixed)){
  const [grade,semester]=term.split('-');const section=el('section',null,'course-term');section.append(el('h4',grade+'학년 '+semester+'학기'));
  const fixed=el('details');fixed.open=true;fixed.append(el('summary','학교 지정 과목 '+curriculum.fixed[term].split('|').length+'개'),el('p',curriculum.fixed[term].split('|').join(' · ')));section.append(fixed);
  const groups=curriculum.groups.filter(g=>g.term===term);
  if(!groups.length)section.append(el('p','이 학기는 학생 선택 과목 없이 공통 기초를 다집니다. 관심 분야와 연결되는 수업·탐구 경험을 찾아보세요.','small'));
  groups.forEach(g=>{
   const selected=new Set(suggest(g,profile));selections[g.id]=selected;
   const box=el('fieldset',null,'course-group');box.append(el('legend',g.id+'군 · '+g.count+'과목 선택 · 과목당 '+g.credits+'학점'));
   const count=el('p','','small');const refresh=()=>count.textContent=selected.size+'/'+g.count+'과목 선택';refresh();box.append(count);
   g.courses.forEach(name=>{
    const label=el('label',null,'course-option'),check=el('input');check.type='checkbox';check.checked=selected.has(name);
    const text=el('span',name);const note=el('small',profile.priority.includes(name)?'진로 연계 후보':'관심에 따라 비교할 과목');
    text.append(note);label.append(check,text);box.append(label);
    check.addEventListener('change',()=>{
     if(check.checked&&selected.size>=g.count){check.checked=false;summary.textContent=g.id+'군은 '+g.count+'과목까지 선택할 수 있습니다. 기존 선택을 먼저 해제해 주세요.';return}
     if(check.checked)selected.add(name);else selected.delete(name);refresh();update();
    });
   });section.append(box);
  });gradeSections[grade].append(section);
 }
 result.append(summary);update();
 const joint=el('section',null,'joint-guide');joint.append(el('h4','공동교육과정 · 개설 여부 확인 후 신청'),el('p','학교에 편성되지 않은 관심 과목은 공동교육과정에서 찾아볼 수 있습니다. 이 화면에는 해당 학기 개설 목록이 연결되어 있지 않아 수강 가능한 과목을 확정하지 않습니다.'));
 joint.append(el('p','확인할 내용: 희망 과목 개설 여부 · 대상 학년 · 신청 기간과 정원 · 시간표 · 선수 조건 · 학점 인정과 학교 선택 과목 대체 가능 여부','small'));
 result.append(joint,el('p','상담할 때 이 조합을 함께 확인해 주세요. 분야별 연결은 안내용이며, 실제 수강 신청은 학교 절차에 따릅니다.','small'));
 status.textContent=profile.label+' 추천을 표시했습니다. 과목을 바꾸려면 현재 선택을 해제한 뒤 다른 과목을 선택하세요.';
 if(moveFocus)result.focus();
}
})();
