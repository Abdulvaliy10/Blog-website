// Smooth scroll for internal anchors
(function () {
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const targetId = href && href.startsWith('#') ? href.slice(1) : null;
      const target = targetId ? document.getElementById(targetId) : null;
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

// Highlight active nav link on same-page sections and current page
(function () {
  const navLinks = document.querySelectorAll('.nav-links a');
  const currentPath = location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach((a) => {
    const href = a.getAttribute('href');
    if (!href) return;
    const hrefPath = href.split('#')[0] || 'index.html';
    if (hrefPath === currentPath) {
      a.classList.add('active');
    }
  });
})();

// Navbar shrink on scroll
(function () {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  const threshold = 10;
  const onScroll = () => {
    if (window.scrollY > threshold) navbar.classList.add('shrink');
    else navbar.classList.remove('shrink');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// Hamburger toggle
(function () {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav-links');
  if (!hamburger || !nav) return;
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    nav.classList.toggle('open');
  });
  // Close menu when clicking a link (mobile)
  nav.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.tagName === 'A') {
      hamburger.classList.remove('open');
      nav.classList.remove('open');
    }
  });
})();

// Typing effect for hero title
(function () {
  const el = document.getElementById('type-text');
  if (!el) return;
  const fullText = "Welcome to Iskandarov's Blog";
  const speed = 60;
  let index = 0;
  const typeNext = () => {
    el.textContent = fullText.slice(0, index++);
    if (index <= fullText.length) requestAnimationFrame(() => setTimeout(typeNext, speed));
  };
  // If there is already text, clear it then type
  setTimeout(() => { el.textContent = ''; typeNext(); }, 300);
})();

// Particles background
(function () {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = Math.min(90, Math.floor((width * height) / 25000));
  const hueBase = 200;

  function createParticles() {
    particles.length = 0;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.6 + 0.4,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        a: Math.random() * 0.6 + 0.2,
      });
    }
  }

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createParticles();
  }

  function step() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = width; if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height; if (p.y > height) p.y = 0;

      const hue = hueBase + (p.x / width) * 80;
      ctx.beginPath();
      ctx.fillStyle = `hsla(${hue}, 100%, 70%, ${p.a})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(step);
  }

  window.addEventListener('resize', resize);
  createParticles();
  step();
})();

// Fade-up animation on scroll
(function () {
  const animated = document.querySelectorAll('[data-animate="fade-up"]');
  if (!animated.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  animated.forEach((el) => io.observe(el));
})();