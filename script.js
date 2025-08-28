// Smooth scroll for internal anchors
(function () {
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

// Highlight active nav link on same-page sections
(function () {
  const navLinks = document.querySelectorAll('.nav-links a');
  const currentPath = location.pathname.split('/').pop();
  navLinks.forEach((a) => {
    const href = a.getAttribute('href');
    const isSame = href === currentPath || (currentPath === '' && href === 'index.html');
    if (isSame) a.classList.add('active');
  });
})();