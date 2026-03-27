// ═══════════════════════════════════════════════════
//  WALID SARDI PORTFOLIO — Interactions
//  Clean, performant, delightful
// ═══════════════════════════════════════════════════

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(l => {
          const href = l.getAttribute('href');
          l.classList.toggle('active', href === `#${id}` || href === `/#${id}`);
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-10% 0px -50% 0px' });

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

  // Default to dark explicitly regardless of OS to preserve the intended design baseline
  const currentTheme = localStorage.getItem('theme') || 'dark';
  
  if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
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
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
