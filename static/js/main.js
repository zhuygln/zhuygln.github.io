(function () {
  'use strict';

  var header = document.getElementById('siteHeader');
  var scrollTopBtn = document.getElementById('scrollTop');
  var hamburgerBtn = document.getElementById('hamburger');
  var nav = document.getElementById('mainNav');

  // --- Header scroll effect ---
  function handleHeaderScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  // --- Scroll-to-top button ---
  function handleScrollTopVisibility() {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }

  scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- Combined scroll handler ---
  function onScroll() {
    handleHeaderScroll();
    handleScrollTopVisibility();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- Scroll reveal (IntersectionObserver) ---
  var revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15
    });

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // --- Mobile nav toggle ---
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', function () {
      hamburgerBtn.classList.toggle('active');
      nav.classList.toggle('open');
    });
  }

  if (nav) {
    nav.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        if (hamburgerBtn) hamburgerBtn.classList.remove('active');
        nav.classList.remove('open');
      });
    });
  }
})();
