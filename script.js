const header = document.querySelector('header');
const links = [...document.querySelectorAll('.nav-links a')];
const sections = [...document.querySelectorAll('main section[id]')];
const year = document.querySelector('#year');

if (year) year.textContent = new Date().getFullYear();

const refreshNavigation = () => {
  header?.classList.toggle('scrolled', scrollY > 12);
  const marker = scrollY + 180;
  let active = '';

  for (const section of sections) {
    if (section.offsetTop <= marker) active = section.id;
  }

  for (const link of links) {
    link.classList.toggle('active', link.getAttribute('href') === `#${active}`);
  }
};

const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  }
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));

const phrases = [
  'menos mágica, mais clareza',
  'contratos explícitos, mudanças seguras',
  'ideias ambiciosas, execução incremental',
  'software compreensível, operação confiável'
];
const message = document.querySelector('#terminal-message');
let phrase = 0;

if (message) {
  setInterval(() => {
    phrase = (phrase + 1) % phrases.length;
    message.animate([{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }], { duration: 520 });
    message.textContent = phrases[phrase];
  }, 4200);
}

refreshNavigation();
addEventListener('scroll', refreshNavigation, { passive: true });
