/* ===== 背景スライド ===== */
const BG_IMAGES = [
  "../assets/hero_01.jpg",
  "../assets/hero_02.jpg",
  "../assets/hero_03.jpg",
];

function initBackgroundCarousel({
  el = "#bg",
  images = BG_IMAGES,
  interval = 9000,
  fade = 900,
  darken = 0.45,
} = {}) {
  const host = document.querySelector(el);
  if (!host || !images.length) return;

  Object.assign(host.style, { position:"fixed", inset:"0", zIndex:"-1", overflow:"hidden" });

  const layA = document.createElement("div");
  const layB = document.createElement("div");
  [layA, layB].forEach(l=>{
    Object.assign(l.style,{
      position:"absolute", inset:"0",
      backgroundSize:"cover", backgroundPosition:"center center",
      transition:`opacity ${fade}ms ease`
    });
    host.appendChild(l);
  });

  const veil = document.createElement("div");
  Object.assign(veil.style, {
    position: "absolute", inset: "0",
    background: `rgba(0,0,0,${darken})`, pointerEvents:"none"
  });
  host.appendChild(veil);

  const setImg = (div, url)=>div.style.backgroundImage=`url("${url}")`;
  let i=0, aTop=true;
  setImg(layA, images[0]); layA.style.opacity="1"; layB.style.opacity="0";

  setInterval(()=>{
    i = (i+1) % images.length;
    if(aTop){ setImg(layB, images[i]); layB.style.opacity="1"; layA.style.opacity="0"; }
    else    { setImg(layA, images[i]); layA.style.opacity="1"; layB.style.opacity="0"; }
    aTop = !aTop;
  }, interval);
}

/* ===== スムーズスクロール & スクロールスパイ ===== */
function initSmoothScrollAndSpy({
  navSelector='a[data-scroll]',
  sectionSelector='section[data-spy]',
  activeClass='is-active',
  headerOffset=72,
}={}){
  // クリックでスムーズスクロール
  document.querySelectorAll(navSelector).forEach(a=>{
    a.addEventListener('click',e=>{
      const href=a.getAttribute('href'); if(!href||!href.startsWith('#')) return;
      e.preventDefault();
      const t=document.querySelector(href); if(!t) return;
      const y=t.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({top:y,behavior:'smooth'}); history.replaceState(null,'',href);
    });
  });

  // スパイ
  const links=[...document.querySelectorAll(navSelector)];
  const map=new Map();
  links.forEach(l=>{ const id=(l.getAttribute('href')||'').replace('#',''); if(id) map.set(id,l); });
  const io=new IntersectionObserver(entries=>{
    entries.forEach(ent=>{
      const id=ent.target.id; const link=map.get(id); if(!link) return;
      if(ent.isIntersecting){ links.forEach(l=>l.classList.remove(activeClass)); link.classList.add(activeClass); }
    });
  },{ rootMargin:`-${headerOffset+1}px 0px -60% 0px`, threshold:0 });
  document.querySelectorAll(sectionSelector).forEach(sec=>io.observe(sec));
}

/* ===== init ===== */
document.addEventListener('DOMContentLoaded', ()=>{
  initBackgroundCarousel();
  initSmoothScrollAndSpy();
});
