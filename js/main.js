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

  // Cookie consent — gates Google Analytics behind an explicit choice
  const GA_ID = 'G-XXXXXXXXXX'; // your real Measurement ID

  function loadAnalytics() {
    const s1 = document.createElement('script');
    s1.async = true;
    s1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(s1);

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', GA_ID);
    window.gtag = gtag;
  }

  const consentBanner = document.getElementById('consent-banner');
  const consentChoice = localStorage.getItem('elray-consent');

  if (consentChoice === 'accepted') {
    loadAnalytics();
  } else if (consentChoice === null && consentBanner) {
    consentBanner.classList.add('show');
  }

  document.getElementById('consent-accept')?.addEventListener('click', () => {
    localStorage.setItem('elray-consent', 'accepted');
    consentBanner.classList.remove('show');
    gtag('consent', 'update', {
      'ad_storage': 'granted',
      'ad_user_data': 'granted',
      'ad_personalization': 'granted',
      'analytics_storage': 'granted'
    });
  });

  document.getElementById('consent-decline')?.addEventListener('click', () => {
    localStorage.setItem('elray-consent', 'declined');
    consentBanner.classList.remove('show');
    gtag('consent', 'update', {
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'analytics_storage': 'denied'
    });
  });

  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      // swap hamburger icon to an X while open
      navToggle.innerHTML = isOpen
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M6 18L18 6"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
    });

    // close the menu after tapping a link, so it doesn't stay open
    // when the new page loads
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

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
  document.querySelectorAll('nav.links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === current) link.classList.add('active');
  });

  initTiltCards();

});
