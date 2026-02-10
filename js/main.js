(function () {
  'use strict';

  const header = document.getElementById('siteHeader');
  const scrollTopBtn = document.getElementById('scrollTop');
  const hamburgerBtn = document.getElementById('hamburger');
  const nav = document.getElementById('mainNav');
  const heroHexes = document.querySelectorAll('.hex[data-speed]');
  const cardImages = document.querySelectorAll('.card-image');
  const isMobile = () => window.innerWidth <= 768;

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

  // --- Hero hexagon parallax ---
  function handleHeroParallax() {
    if (isMobile()) return;
    var scrollY = window.scrollY;
    heroHexes.forEach(function (hex) {
      var speed = parseFloat(hex.getAttribute('data-speed'));
      hex.style.transform = 'translateY(' + (scrollY * speed) + 'px)';
    });
  }

  // --- Card image parallax ---
  function handleCardParallax() {
    if (isMobile()) return;
    var viewportHeight = window.innerHeight;
    cardImages.forEach(function (img) {
      var rect = img.getBoundingClientRect();
      if (rect.top < viewportHeight && rect.bottom > 0) {
        var progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
        var shift = (progress - 0.5) * 20;
        img.style.transform = 'translateY(' + shift + 'px)';
      }
    });
  }

  // --- Combined scroll handler ---
  function onScroll() {
    handleHeaderScroll();
    handleScrollTopVisibility();
    handleHeroParallax();
    handleCardParallax();
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
    // Fallback: show everything
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // --- Mobile nav toggle ---
  hamburgerBtn.addEventListener('click', function () {
    hamburgerBtn.classList.toggle('active');
    nav.classList.toggle('open');
  });

  // Close nav when a link is clicked
  nav.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      hamburgerBtn.classList.remove('active');
      nav.classList.remove('open');
    });
  });
})();
