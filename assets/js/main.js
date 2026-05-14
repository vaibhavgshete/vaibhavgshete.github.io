/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const themeStorageKey = 'vs-portfolio-theme';
  const portfolioRoot = document.querySelector('.portfolio-modern');
  const themeToggle = document.querySelector('.theme-toggle');
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  if (headerToggleBtn) {
    headerToggleBtn.addEventListener('click', headerToggle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');
  const floatingNavbar = document.querySelector('.floating-navbar');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion.matches ? 'auto' : 'smooth'
      });
    });
  }

  function toggleNavbarState() {
    if (!floatingNavbar) return;
    floatingNavbar.classList.toggle('is-scrolled', window.scrollY > 24);
  }

  function applyTheme(theme) {
    if (!portfolioRoot) return;

    const resolvedTheme = theme === 'light' ? 'light' : 'dark';
    portfolioRoot.classList.remove('theme-dark', 'theme-light');
    portfolioRoot.classList.add(`theme-${resolvedTheme}`);
    portfolioRoot.dataset.theme = resolvedTheme;

    if (themeToggle) {
      const isLight = resolvedTheme === 'light';
      themeToggle.setAttribute('aria-pressed', String(isLight));
      themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
    }

    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', resolvedTheme === 'light' ? '#eef3fb' : '#0b0f19');
    }
  }

  function initThemeToggle() {
    if (!portfolioRoot) return;

    const savedTheme = window.localStorage.getItem(themeStorageKey);
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: light)');
    const systemPrefersLight = colorSchemeQuery.matches;
    applyTheme(savedTheme || (systemPrefersLight ? 'light' : 'dark'));

    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const nextTheme = portfolioRoot.classList.contains('theme-light') ? 'dark' : 'light';
        applyTheme(nextTheme);
        window.localStorage.setItem(themeStorageKey, nextTheme);
      });
    }

    const handleThemePreferenceChange = (event) => {
      if (window.localStorage.getItem(themeStorageKey)) return;
      applyTheme(event.matches ? 'light' : 'dark');
    };

    if (typeof colorSchemeQuery.addEventListener === 'function') {
      colorSchemeQuery.addEventListener('change', handleThemePreferenceChange);
    } else if (typeof colorSchemeQuery.addListener === 'function') {
      colorSchemeQuery.addListener(handleThemePreferenceChange);
    }
  }

  function initMotionStagger() {
    const staggerGroups = [
      '.metrics-grid .metric-card',
      '.projects-grid .project-card',
      '.skills-grid .skill-card',
      '.certifications-grid .certification-card',
      '.education-grid .education-card',
      '.about-contact-grid .contact-card'
    ];

    staggerGroups.forEach(selector => {
      document.querySelectorAll(selector).forEach((item, index) => {
        item.setAttribute('data-aos', 'fade-up');
        item.setAttribute('data-aos-delay', String(Math.min(index * 70, 280)));
      });
    });
  }

  function initAnchorScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (event) => {
        const hash = anchor.getAttribute('href');
        if (!hash || hash === '#') return;

        const target = document.querySelector(hash);
        if (!target) return;

        event.preventDefault();
        const navOffset = floatingNavbar ? floatingNavbar.offsetHeight + 24 : 100;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - navOffset;

        window.scrollTo({
          top: targetTop,
          behavior: prefersReducedMotion.matches ? 'auto' : 'smooth'
        });

        if (window.location.hash !== hash) {
          history.replaceState(null, '', hash);
        }
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  window.addEventListener('load', toggleNavbarState);
  document.addEventListener('scroll', toggleScrollTop);
  document.addEventListener('scroll', toggleNavbarState);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: prefersReducedMotion.matches ? 1 : 720,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      once: true,
      mirror: false,
      offset: 18,
      disable: prefersReducedMotion.matches
    });
  }
  initThemeToggle();

  window.addEventListener('load', () => {
    initMotionStagger();
    initAnchorScrolling();
    aosInit();
  });

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          const navOffset = floatingNavbar ? floatingNavbar.offsetHeight + 24 : parseInt(scrollMarginTop);
          window.scrollTo({
            top: section.offsetTop - navOffset,
            behavior: prefersReducedMotion.matches ? 'auto' : 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();
