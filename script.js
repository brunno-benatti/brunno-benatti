document.documentElement.classList.add('js');

const header = document.querySelector('header');
const links = [...document.querySelectorAll('.nav-links a')];
const sections = [...document.querySelectorAll('main section[id]')];
const year = document.querySelector('#year');
const revealItems = [...document.querySelectorAll('.reveal')];
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const language = document.documentElement.lang.toLowerCase().startsWith('pt') ? 'pt' : 'en';

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

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
}

const phraseSets = {
  en: [
    'understand current behavior first',
    'find root cause before patching symptoms',
    'change the smallest safe surface',
    'validate critical behavior explicitly'
  ],
  pt: [
    'entender o comportamento atual primeiro',
    'buscar a causa raiz antes do sintoma',
    'alterar a menor superfície segura',
    'validar explicitamente o comportamento crítico'
  ]
};
const phrases = phraseSets[language];
const message = document.querySelector('#terminal-message');
let phrase = 0;

if (message && !reduceMotion) {
  setInterval(() => {
    phrase = (phrase + 1) % phrases.length;
    message.animate([{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }], { duration: 520 });
    message.textContent = phrases[phrase];
  }, 4200);
}

refreshNavigation();
addEventListener('scroll', refreshNavigation, { passive: true });
