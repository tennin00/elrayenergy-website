// ElRay Energy shared site behaviour
// Handles: footer year, scroll-reveal animation, active nav link.

document.addEventListener('DOMContentLoaded', () => {

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Scroll reveal (respects prefers-reduced-motion)
  const revealEls = document.querySelectorAll('.reveal');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    revealEls.forEach(el => el.classList.add('in'));
  } else if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    // no IntersectionObserver support, just show everything
    revealEls.forEach(el => el.classList.add('in'));
  }

  // Mark the current page's nav link as active
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav.links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === current) link.classList.add('active');
  });

});
