// ElRay Energy shared site behaviour
// Handles: footer year, scroll-reveal animation, active nav link,
// mobile nav toggle, cookie consent, service-card tilt.

function initTiltCards() {
  const cards = document.querySelectorAll('.serve-card');
  if (!cards.length) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  const maxTilt = 1;

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
      card.style.transition = 'box-shadow 0.3s ease';
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
      card.style.transition = 'transform 0.5s ease, box-shadow 0.3s ease';
      card.style.transform = '';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Cookie consent (Consent Mode v2) ----------
  // NOTE: this relies on `gtag` being defined by the <head> snippet on
  // every page. If that snippet is missing, gtag() calls below will
  // throw — this guard catches that case with a clear console warning
  // instead of silently failing.
  const consentBanner = document.getElementById('consent-banner');
  const consentChoice = localStorage.getItem('elray-consent');

  function updateConsent(granted) {
    if (typeof gtag !== 'function') {
      console.warn('gtag is not defined — check that the Google tag <head> snippet is present on this page.');
      return;
    }
    gtag('consent', 'update', {
      'ad_storage': granted ? 'granted' : 'denied',
      'ad_user_data': granted ? 'granted' : 'denied',
      'ad_personalization': granted ? 'granted' : 'denied',
      'analytics_storage': granted ? 'granted' : 'denied'
    });
  }

  if (consentChoice === null && consentBanner) {
    consentBanner.classList.add('show');
  }

  document.getElementById('consent-accept')?.addEventListener('click', () => {
    localStorage.setItem('elray-consent', 'accepted');
    consentBanner?.classList.remove('show');
    updateConsent(true);
  });

  document.getElementById('consent-decline')?.addEventListener('click', () => {
    localStorage.setItem('elray-consent', 'declined');
    consentBanner?.classList.remove('show');
    updateConsent(false);
  });

  // ---------- Mobile nav toggle ----------
  const navToggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      navToggle.innerHTML = isOpen
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M6 18L18 6"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---------- Footer year ----------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Scroll reveal ----------
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
    revealEls.forEach(el => el.classList.add('in'));
  }

  // ---------- Active nav link ----------
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav.links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === current) link.classList.add('active');
  });

  initTiltCards();

});