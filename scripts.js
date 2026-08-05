// Nav transparente → sólida ao rolar
const nav = document.getElementById('nav');

function onScroll() {
  if (window.scrollY > 80) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}

let isScrolling = false;
window.addEventListener('scroll', () => {
  if (!isScrolling) {
    window.requestAnimationFrame(() => {
      onScroll();
      isScrolling = false;
    });
    isScrolling = true;
  }
});
// Força checagem inicial
onScroll();

// Lógica do Menu Mobile
const btnMenu = document.getElementById('btn-menu');
const menuMobile = document.getElementById('menu-mobile');
const iconMenuOpen = document.getElementById('icon-menu-open');
const iconMenuClose = document.getElementById('icon-menu-close');
const mobileLinks = document.querySelectorAll('.mobile-link');

let menuAberto = false;

function alternarMenu() {
  menuAberto = !menuAberto;
  if (menuAberto) {
    // Abre o menu
    menuMobile.classList.remove('opacity-0', 'pointer-events-none');
    menuMobile.classList.add('opacity-100', 'pointer-events-auto');
    iconMenuOpen.classList.add('hidden');
    iconMenuClose.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Trava o scroll do fundo
    nav.classList.add('menu-open'); // Força a cor escura no cabeçalho
  } else {
    // Fecha o menu
    menuMobile.classList.remove('opacity-100', 'pointer-events-auto');
    menuMobile.classList.add('opacity-0', 'pointer-events-none');
    iconMenuOpen.classList.remove('hidden');
    iconMenuClose.classList.add('hidden');
    document.body.style.overflow = ''; // Devolve o scroll do fundo
    nav.classList.remove('menu-open');
  }
}

// Adiciona os eventos de clique se o botão existir
if (btnMenu) {
  btnMenu.addEventListener('click', alternarMenu);
}

// Fecha o menu automaticamente quando clicar em um link (Cortes, Manifesto, etc)
mobileLinks.forEach(link => {
  link.addEventListener('click', alternarMenu);
});

// Intersection Observer Geral (Para blocos normais e imagens)
const reveals = document.querySelectorAll('.reveal');
const ioGeral = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      ioGeral.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach((el) => ioGeral.observe(el));

// Intersection Observer e formatação para Textos (Manifesto e Agendar)
const revealTexts = document.querySelectorAll('.reveal-text');
const ioText = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      ioText.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

revealTexts.forEach((p) => {
  // Pega o texto original e limpa espaços extras
  const content = p.textContent.trim().replace(/\s+/g, ' ');
  p.innerHTML = ''; // Limpa o parágrafo

  const words = content.split(' ');

  words.forEach((word, i) => {
    const span = document.createElement('span');
    span.textContent = word;
    span.className = 'word';
    // Aplica o atraso sequencial da palavra (30ms por palavra para ficar suave)
    span.style.transitionDelay = `${(i * 30)}ms`;

    p.appendChild(span);
    // Adiciona o espaço após a palavra
    p.appendChild(document.createTextNode(' '));
  });

  // Observa o parágrafo para ativar a animação no scroll
  ioText.observe(p);
});
