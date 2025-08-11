// Active nav link on scroll
const sections = document.querySelectorAll("section[id], main[id]");
const navLinks = document.querySelectorAll(".nav-link");
const linkById = id => document.querySelector(`.nav a[href="#${id}"]`);

const navObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    const id = entry.target.id;
    const link = linkById(id);
    if (!link) return;
    if (entry.isIntersecting){
      navLinks.forEach(a=>a.classList.remove("active"));
      link.classList.add("active");
    }
  });
},{rootMargin:"-45% 0px -45% 0px", threshold:0.01});

sections.forEach(s=> navObserver.observe(s));

// Reveal on scroll
const revealables = document.querySelectorAll(".reveal");
const revObserver = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add("revealed"); revObserver.unobserve(e.target); }
  });
},{rootMargin:"-10% 0px -5% 0px"});
revealables.forEach(el=> revObserver.observe(el));

// Smooth scroll fallback
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    const tgt = document.querySelector(a.getAttribute('href'));
    tgt?.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

// Back-to-top button
const toTop = document.querySelector(".to-top");
window.addEventListener("scroll", ()=>{
  if (scrollY > 600) toTop.classList.add("show"); else toTop.classList.remove("show");
});
toTop.addEventListener("click", ()=> window.scrollTo({top:0, behavior:"smooth"}));

document.getElementById('navToggle').addEventListener('click', function() {
  document.getElementById('navMenu').classList.toggle('active');
});