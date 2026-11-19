// ═══════════════════════════════════════════════════
//  WALID SARDI PORTFOLIO — Interactions
//  Clean, performant, delightful
// ═══════════════════════════════════════════════════

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Idioma de la página (las versiones en inglés viven en /en/)
const LANG = document.documentElement.lang === 'en' ? 'en' : 'es';
const MSG = {
  es: {
    badEmail: 'Revisa el email, parece incompleto.',
    missing: 'Rellena los campos marcados.',
    mailOpened: 'Se ha abierto tu correo con el mensaje listo para enviar.',
    sending: 'Enviando…',
    sent: '¡Mensaje enviado! Te respondo lo antes posible.',
    failed: 'No se ha podido enviar. Escríbeme a walidsardib@gmail.com.'
  },
  en: {
    badEmail: 'Please check your email address, it looks incomplete.',
    missing: 'Please fill in the highlighted fields.',
    mailOpened: 'Your email app has opened with the message ready to send.',
    sending: 'Sending…',
    sent: 'Message sent! I will get back to you as soon as possible.',
    failed: 'The message could not be sent. Please write to walidsardib@gmail.com.'
  }
}[LANG];

// ── Scroll Reveal ──
function initReveal() {
  const els = document.querySelectorAll('.reveal-up');
  if (!els.length) return;

  if (prefersReduced) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => io.observe(el));
}

// ── Smooth anchor scroll ──
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
        history.replaceState(null, '', href);
      }
    });
  });
}

// ── Navbar scroll effect ──
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ── Scroll spy (active nav link) ──
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-links a');
  if (!sections.length || !navLinks.length) return;

  // Línea fina en el centro del viewport: la sección que la cruza es la activa.
  // Independiente de la altura de la sección (Experiencia es muy alta).
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(l => {
          const href = l.getAttribute('href');
          // vale para /#id y /en/#id
          l.classList.toggle('active', !!href && href.endsWith(`#${id}`));
        });
      }
    });
  }, { threshold: 0, rootMargin: '-45% 0px -45% 0px' });

  sections.forEach(s => io.observe(s));
}

// ── Mobile menu toggle ──
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

// ── Cursor glow (desktop only) ──
function initCursorGlow() {
  if (prefersReduced) return;
  if (window.innerWidth < 768) return;
  if ('ontouchstart' in window) return;

  const glow = document.querySelector('.cursor-glow');
  if (!glow) return;

  let x = 0, y = 0, cx = 0, cy = 0;
  let raf = null;
  let visible = false;

  function lerp(a, b, n) { return (1 - n) * a + n * b; }

  function update() {
    cx = lerp(cx, x, 0.08);
    cy = lerp(cy, y, 0.08);
    glow.style.left = cx + 'px';
    glow.style.top = cy + 'px';
    raf = requestAnimationFrame(update);
  }

  document.addEventListener('mousemove', (e) => {
    x = e.clientX;
    y = e.clientY;
    if (!visible) {
      glow.classList.add('active');
      visible = true;
      if (!raf) update();
    }
  }, { passive: true });

  // reduce opacity when hovering interactive elements
  document.querySelectorAll('.project-card, .stat-card, .skill-chip, .btn').forEach(el => {
    el.addEventListener('mouseenter', () => glow.style.width = '500px');
    el.addEventListener('mouseleave', () => glow.style.width = '400px');
  });
}

// ── Project slideshow ──
function initSlideshows() {
  document.querySelectorAll('.project-slideshow').forEach(ss => {
    const slides = Array.from(ss.querySelectorAll('.slide'));
    if (slides.length < 2) return;

    let idx = 0;
    const interval = parseInt(ss.getAttribute('data-interval'), 10) || 3500;
    let timer = null;

    function show(i) {
      slides.forEach((s, n) => s.classList.toggle('active', n === i));
    }

    function next() {
      idx = (idx + 1) % slides.length;
      show(idx);
    }

    function start() { if (!timer) timer = setInterval(next, interval); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }

    ss.addEventListener('mouseenter', stop, { passive: true });
    ss.addEventListener('mouseleave', start, { passive: true });
    start();
  });
}

// ── Typewriter effect on hero greeting ──
function initTypewriter() {
  const el = document.getElementById('heroGreeting');
  if (!el || prefersReduced) return;

  const text = el.textContent.trim();
  el.textContent = '';
  el.classList.add('typing-cursor');

  let i = 0;
  const speed = 55;

  function step() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(step, speed + Math.random() * 35);
    } else {
      // remove cursor after a brief pause
      setTimeout(() => el.classList.remove('typing-cursor'), 1500);
    }
  }

  setTimeout(step, 400);
}

// ── Magnetic hover on social icons ──
function initMagneticIcons() {
  if (prefersReduced || window.innerWidth < 768) return;

  document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('mousemove', (e) => {
      const rect = icon.getBoundingClientRect();
      const mx = e.clientX - rect.left - rect.width / 2;
      const my = e.clientY - rect.top - rect.height / 2;
      icon.style.transform = `translate(${mx * 0.3}px, ${my * 0.3}px)`;
    });

    icon.addEventListener('mouseleave', () => {
      icon.style.transform = '';
      icon.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      setTimeout(() => icon.style.transition = '', 300);
    });
  });
}

// ── Tilt effect on project cards ──
function initCardTilt() {
  if (prefersReduced || window.innerWidth < 768) return;

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-8px) perspective(800px) rotateX(${y * -4}deg) rotateY(${x * 4}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ── Theme Toggle ──
function initTheme() {
  const toggleBtn = document.getElementById('themeToggle');
  const toggleBtnMobile = document.getElementById('themeToggleMobile');
  if (!toggleBtn && !toggleBtnMobile) return;

  // Por defecto tema claro editorial (cálido)
  const currentTheme = localStorage.getItem('theme') || 'light';

  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  function toggleTheme() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const newTheme = isLight ? 'dark' : 'light';
    
    if (newTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    localStorage.setItem('theme', newTheme);
  }

  if (toggleBtn) toggleBtn.addEventListener('click', toggleTheme);
  if (toggleBtnMobile) toggleBtnMobile.addEventListener('click', toggleTheme);
}

// ── Recorrido con scroll (LaRue3x3) ──
// El paso que cruza el centro del viewport activa su captura/vídeo en la pantalla fija.
function initStory() {
  const story = document.querySelector('[data-story]');
  if (!story) return;

  const steps = Array.from(story.querySelectorAll('[data-step]'));
  const media = Array.from(story.querySelectorAll('[data-media]'));
  const bar = story.querySelector('.story-progress span');
  let current = -1;

  function activate(i) {
    if (i === current) return;
    current = i;
    steps.forEach((s, n) => s.classList.toggle('is-active', n === i));
    media.forEach((m, n) => {
      const on = n === i;
      m.classList.toggle('is-active', on);
      const v = m.querySelector('video');
      if (!v) return;
      if (on && !prefersReduced) {
        if (!v.src) v.src = v.dataset.src; // carga diferida: solo al llegar a su paso
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
    if (bar) bar.style.transform = `scaleX(${(i + 1) / steps.length})`;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) activate(steps.indexOf(e.target));
    });
  }, {
    // En móvil la pantalla fija ocupa la mitad de arriba: el paso cambia en la zona de texto visible
    rootMargin: matchMedia('(max-width: 900px)').matches ? '-64% 0px -36% 0px' : '-50% 0px -50% 0px',
    threshold: 0
  });

  steps.forEach(s => io.observe(s));
  activate(0);
}

// ── Vídeos que se reproducen solo cuando están en pantalla ──
function initAutoVideos() {
  const vids = document.querySelectorAll('video[data-autoplay]');
  if (!vids.length || prefersReduced) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      const v = e.target;
      if (e.isIntersecting) {
        if (!v.src) v.src = v.dataset.src;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, { threshold: 0.25 });

  vids.forEach(v => io.observe(v));
}

// ── Formulario de contacto ──
// Pon aquí la URL de un servicio de formularios (Formspree, Web3Forms...) para recibir los mensajes.
// Mientras esté vacía, el formulario abre el correo del visitante con el mensaje ya redactado.
const FORM_ENDPOINT = 'https://api.web3forms.com/submit';

function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;
  const status = form.querySelector('[data-status]');
  const btn = form.querySelector('button[type="submit"]');

  function setStatus(msg, type) {
    status.textContent = msg;
    status.className = 'cform-status' + (type ? ' ' + type : '');
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    if (data.get('web')) return; // bot

    // Validación propia con mensajes claros
    let firstBad = null;
    form.querySelectorAll('input[required], textarea[required]').forEach(f => {
      const bad = !f.checkValidity() || !f.value.trim();
      f.classList.toggle('is-invalid', bad);
      if (bad && !firstBad) firstBad = f;
    });
    if (firstBad) {
      setStatus(firstBad.type === 'email' && firstBad.value ? MSG.badEmail : MSG.missing, 'err');
      firstBad.focus();
      return;
    }

    const nombre = data.get('nombre').trim();
    const motivo = data.get('motivo');
    const mensaje = data.get('mensaje').trim();

    if (!FORM_ENDPOINT) {
      const body = `${mensaje}

— ${nombre} (${data.get('email')})`;
      location.href = `mailto:walidsardib@gmail.com?subject=${encodeURIComponent(motivo + ' · ' + nombre)}&body=${encodeURIComponent(body)}`;
      setStatus(MSG.mailOpened, 'ok');
      return;
    }

    // Asunto del correo que recibirás y quitar el campo trampa
    data.set('subject', `Portfolio · ${motivo} · ${nombre}`);
    data.delete('web');

    btn.disabled = true;
    setStatus(MSG.sending);
    try {
      const res = await fetch(FORM_ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.success === false) throw new Error(json.message || res.status);
      form.reset();
      setStatus(MSG.sent, 'ok');
    } catch {
      setStatus(MSG.failed, 'err');
    } finally {
      btn.disabled = false;
    }
  });

  form.addEventListener('input', (e) => e.target.classList.remove('is-invalid'));
}

// ── Números que cuentan hacia arriba al aparecer ──
function initCountUp() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length || prefersReduced) return;

  const fmt = (n, d) => n.toLocaleString(LANG === 'en' ? 'en-GB' : 'es-ES', { minimumFractionDigits: d, maximumFractionDigits: d });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      const el = e.target;
      const end = parseFloat(el.dataset.count);
      const dec = parseInt(el.dataset.decimals || '0', 10);
      const dur = 1400;
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min((now - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 4); // frena al final
        el.textContent = fmt(end * eased, dec);
        if (p < 1) requestAnimationFrame(tick);
      };
      el.textContent = fmt(0, dec);
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });

  els.forEach(el => io.observe(el));
}

// ── Párrafo cuyas palabras se encienden según avanzas con el scroll ──
function initWordReveal() {
  const blocks = document.querySelectorAll('[data-words]');
  if (!blocks.length || prefersReduced) return;

  blocks.forEach(block => {
    const words = block.textContent.trim().split(/\s+/);
    block.innerHTML = words.map(w => `<span class="w">${w}</span>`).join(' ');
    const spans = block.querySelectorAll('.w');

    let ticking = false;
    const update = () => {
      ticking = false;
      const r = block.getBoundingClientRect();
      // 0 cuando el párrafo asoma por abajo, 1 cuando su final pasa el centro de la pantalla
      const start = innerHeight * 0.85;
      const end = innerHeight * 0.45;
      const p = Math.min(Math.max((start - r.top) / (start - end + r.height), 0), 1);
      const lit = Math.round(p * spans.length);
      spans.forEach((s, i) => s.classList.toggle('on', i < lit));
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    addEventListener('scroll', onScroll, { passive: true });
    update();
  });
}

// ── Init ──
function init() {
  initTheme();
  initReveal();
  initSmoothScroll();
  initNavbar();
  initScrollSpy();
  initMobileMenu();
  initCursorGlow();
  initSlideshows();
  initTypewriter();
  initMagneticIcons();
  initCardTilt();
  initStory();
  initAutoVideos();
  initContactForm();
  initCountUp();
  initWordReveal();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
