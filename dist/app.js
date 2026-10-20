const clubs = [
 ['도서관가는길','인문·교육·사회','책을 매개로 토론하고 소통하며, 독서 문화를 만들어갑니다.'],
 ['미래교육연대','인문·교육·사회','수업 설계와 모의 수업, 교육 봉사, 독서 토론으로 교육자의 꿈을 탐색합니다.'],
 ['또래상담반','인문·교육·사회','친구의 고민에 귀 기울이고, 공감과 상담 활동으로 따뜻한 학교를 만들어갑니다.'],
 ['경제 경영 인사이트','인문·교육·사회','뉴스와 책, 영화로 경제 문제와 경영 전략을 탐구하고 토론합니다.'],
 ['사회탐구연구소','인문·교육·사회','역사·정치·철학·사회 등 관심 주제를 독서와 토론으로 깊이 탐구합니다.'],
 ['랭귀지 오디세이','외국어·국제교류','여러 나라의 언어와 문화를 탐구하며 외국어 활용 능력과 세계를 보는 시야를 넓힙니다.'],
 ['세계를 잇는 대화','외국어·국제교류','독일 학생들과 영어로 교류하고, 서로의 교육·철학·문화를 알아갑니다.'],
 ['청소년적십자','봉사·보건의료','이웃을 위한 봉사와 응급처치·안전 활동으로 생명과 건강을 돌보는 마음을 기릅니다.'],
 ['휴먼케어','봉사·보건의료','간호 기초, 심폐소생술과 응급처치, 보건 캠페인으로 보건의료 진로를 탐색합니다.'],
 ['메디클럽','봉사·보건의료','간호와 보건 계열의 다양한 활동을 통해 보건의료 분야의 역량을 키웁니다.'],
 ['코드블루','봉사·보건의료','보건·의료 분야의 주제를 탐구하며 관련 지식과 진로 역량을 넓힙니다.'],
 ['지속가능한 K-보건','봉사·보건의료','교육·보건·환경·평화 프로젝트를 통해 공동체와 세계 시민의 역할을 배웁니다.'],
 ['미래 공학 연구회','수학·과학·공학','건축·기계·전기·정보 원리를 탐구하고 구조물, 회로와 센서 프로젝트에 도전합니다.'],
 ['매쓰컴','수학·과학·공학','수학과 컴퓨터 프로그래밍을 연결해 코딩으로 문제를 해결합니다.'],
 ['과학의가치','수학·과학·공학','심화 실험과 과학·공학 프로젝트를 직접 기획하며 협력하고 탐구합니다.'],
 ['과학나비','수학·과학·공학','관심 주제의 실험을 설계하고 결과를 분석해 과학 탐구 보고서를 작성합니다.'],
 ['바이오케미','수학·과학·공학','생명과학과 화학의 실험·토의·조사·프로젝트로 과학적 사고를 기릅니다.'],
 ['방송반','방송·예술·체육','교내 방송의 기획부터 제작·편집·송출까지 경험하며 미디어 역량을 키웁니다.'],
 ['그림자유','방송·예술·체육','만화, 드로잉, 일러스트와 애니메이션으로 나만의 이야기를 표현합니다.'],
 ['다음 프레임','방송·예술·체육','학교생활을 사진과 영상으로 기록하고 미디어 콘텐츠를 함께 기획·제작합니다.'],
 ['락앤락','방송·예술·체육','밴드 활동으로 음악을 함께 만들며 음악적 역량과 협동심을 키웁니다.'],
 ['셔틀콕','방송·예술·체육','배드민턴의 기본기를 익히고 꾸준히 연습하며 건강과 기초 체력을 기릅니다.'],
 ['환경 조형반','방송·예술·체육','그림과 조형물로 학교와 지역사회를 꾸미며 미술 재능을 나눕니다.']
];
const categories = ['전체',...new Set(clubs.map(c=>c[1]))];
const filters=document.querySelector('.filters'), list=document.querySelector('#club-list'), search=document.querySelector('#club-search');
let category='전체';
categories.forEach(name=>{const b=document.createElement('button');b.type='button';b.textContent=name;b.setAttribute('aria-pressed',name===category);b.addEventListener('click',()=>{category=name;filters.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));renderClubs()});filters.append(b)});
function renderClubs(){const query=search.value.trim().toLocaleLowerCase().replace(/\s+/g,'');const shown=clubs.filter(c=>(category==='전체'||c[1]===category)&&c.join(' ').toLocaleLowerCase().replace(/\s+/g,'').includes(query));list.replaceChildren();shown.forEach(([name,group,description])=>{const article=document.createElement('article');article.className='club-item';const tag=document.createElement('p');tag.className='club-category';tag.textContent=group;const h=document.createElement('h3');h.textContent=name;const p=document.createElement('p');p.textContent=description;article.append(tag,h,p);list.append(article)});document.querySelector('#club-count').textContent=`전체 23개 중 ${shown.length}개 동아리`;document.querySelector('#club-empty').hidden=shown.length!==0;}
search.addEventListener('input',renderClubs);document.querySelector('#reset-search').addEventListener('click',()=>{search.value='';category='전체';filters.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',b.textContent==='전체'));renderClubs();search.focus()});renderClubs();
const spaces=[['문제해결학습실','생각을 나누는 토의·토론 공간',.7,2.1],['동실동실','함께 만드는 동아리 활동 공간',33.6,2.1],['카페on종일 2','교실 가까이, 편안한 자습 공간',66.5,2.1],['자기주도적 학습 공간','스스로 계획하고 집중하는 곳',99.4,2.1],['카페on종일 1','나만의 공부에 몰입하는 공간',.7,86.5],['학생 체력 증진 공간','몸과 마음을 건강하게',33.6,86.5],['꿈다락','책과 함께 생각이 자라는 도서관',66.5,86.5],['성모SUM','친구들과 함께 쉬어가는 곳',99.4,86.5]];
const dialog=document.querySelector('#photo-dialog'), content=document.querySelector('#photo-content'),caption=document.querySelector('#photo-caption');
function openPhoto(name,src,space){caption.textContent=name;content.replaceChildren();if(src==='school-symbols'){const panel=document.createElement('div');panel.className='symbols-panel';panel.innerHTML='<img class="symbol-emblem" src="assets/school-emblem.png" alt="대전성모여자고등학교 교표"><p>정의와 진리와 사랑을 위하여 몸 바칠 여성</p><div class="symbol-plants"><figure><img src="assets/illustrations/tree.png" alt="교목 설송 일러스트"><figcaption>교목 · 설송</figcaption></figure><figure><img src="assets/illustrations/flower.png" alt="교화 목련 일러스트"><figcaption>교화 · 목련</figcaption></figure></div>';content.append(panel)}else if(space){const p=document.createElement('div');p.className='space-photo';p.style.backgroundImage='url(assets/illustrations/space-'+spaces.indexOf(space)+'.png)';p.setAttribute('role','img');p.setAttribute('aria-label',name);content.append(p)}else{const img=new Image();img.src='assets/'+src;img.alt=name;content.append(img)}dialog.showModal()}
spaces.forEach(space=>{const b=document.createElement('button');b.className='space-card';b.setAttribute('aria-label',space[0]+' 사진 크게 보기');const photo=document.createElement('div');photo.className='space-photo';photo.style.backgroundImage='url(assets/illustrations/space-'+spaces.indexOf(space)+'.png)';const h=document.createElement('h3');h.textContent=space[0];const p=document.createElement('p');p.textContent=space[1];b.append(photo,h,p);b.addEventListener('click',()=>openPhoto(space[0],null,space));document.querySelector('#space-list').append(b)});
document.querySelectorAll('[data-photo]').forEach(b=>b.addEventListener('click',()=>openPhoto(b.dataset.caption,b.dataset.photo)));document.querySelector('#close-photo').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
document.querySelectorAll('[data-uniform]').forEach(b=>b.addEventListener('click',()=>{const season=b.dataset.uniform,name=season==='summer'?'하복':'동복';document.querySelectorAll('[data-uniform]').forEach(x=>x.setAttribute('aria-pressed',x===b));const img=document.querySelector('#uniform-img');img.src=`assets/${season}.png`;img.alt=`성모 ${name}을 입은 캐릭터`;const enlarge=document.querySelector('#uniform-enlarge');enlarge.dataset.photo=season+'.png';enlarge.dataset.caption=`성모 ${name} 캐릭터`;}));
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#navigation');function closeMenu(){menu.setAttribute('aria-expanded','false');menu.textContent='메뉴 열기';nav.classList.remove('open')}menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',open);menu.textContent=open?'메뉴 닫기':'메뉴 열기';nav.classList.toggle('open',open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus()}});
document.querySelector('#copy-address').addEventListener('click',async()=>{const address='(34943) 대전광역시 중구 대흥로 62 대전성모여자고등학교';const status=document.querySelector('#copy-status');try{await navigator.clipboard.writeText(address);status.textContent='주소를 복사했습니다.'}catch{status.textContent='자동 복사가 되지 않았습니다. 위 주소를 길게 누르거나 드래그하여 복사해 주세요.'}});
const icons={heart:'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z',compass:'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM16 8l-2.5 5.5L8 16l2.5-5.5L16 8Z',book:'M12 5C8 2 4 3 2 4v15c3-1 6-1 10 1 4-2 7-2 10-1V4c-2-1-6-2-10 1Zm0 0v15',sprout:'M12 22V12M12 17C3 17 2 10 2 8c7 0 10 3 10 9Zm0-5c0-6 4-10 10-10 0 7-4 10-10 10Z',search:'M21 21l-5-5M10.5 3a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15Z'};document.querySelectorAll('[data-icon]').forEach(el=>{const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('aria-hidden','true');const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('d',icons[el.dataset.icon]);svg.append(path);el.append(svg)});

document.querySelectorAll('[data-career-photo]').forEach(button => {
  button.addEventListener('click', () => {
    caption.textContent = button.dataset.caption;
    const photo = button.querySelector('.career-photo').cloneNode(true);
    photo.querySelector('img').loading = 'eager';
    content.replaceChildren(photo);
    dialog.showModal();
  });
});

// Direct timetable links also reveal the optional full schedule.
(() => {
 const revealSchedule=()=>{if(location.hash==='#daily-schedule'){const d=document.querySelector('.schedule-details');if(d)d.open=true;}};
 window.addEventListener('hashchange',revealSchedule);
 document.querySelectorAll('a[href="#daily-schedule"]').forEach(a=>a.addEventListener('click',()=>{const d=document.querySelector('.schedule-details');if(d)d.open=true;}));
 revealSchedule();
})();
