// ElRay Energy shared site behaviour
// Handles: footer year, scroll-reveal animation, active nav link.

function initTiltCards() {
  const cards = document.querySelectorAll('.serve-card');
  if (!cards.length) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return; // respect accessibility setting — no motion

  const maxTilt = 1; // degrees, keep this subtle

  cards.forEach(card => {
    let frame;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const px = (x / rect.width) - 0.5;
      const py = (y / rect.height) - 0.5;

      const rotateY = px * maxTilt * 2;
      const rotateX = -py * maxTilt * 2;

      card.classList.add('tilting');
      card.style.transition = 'box-shadow 0.3s ease'; // snappy while moving
      card.style.setProperty('--mx', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--my', `${(y / rect.height) * 100}%`);

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        card.style.transform =
          `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.015)`;
      });
    });

    card.addEventListener('mouseleave', () => {
      cancelAnimationFrame(frame);
      card.classList.remove('tilting');
      card.style.transition = 'transform 0.5s ease, box-shadow 0.3s ease'; // smooth return
      card.style.transform = '';
    });
  });
}

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

  initTiltCards();

});
