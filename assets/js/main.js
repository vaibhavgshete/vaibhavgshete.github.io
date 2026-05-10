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

  function initPortfolioAssistant() {
    const assistantRoot = document.querySelector('.portfolio-assistant');
    if (!assistantRoot) return;

    const fab = assistantRoot.querySelector('.assistant-fab');
    const panel = assistantRoot.querySelector('.assistant-panel');
    const closeButton = assistantRoot.querySelector('.assistant-close');
    const consoleEl = assistantRoot.querySelector('#assistant-console');
    const form = assistantRoot.querySelector('#assistant-form');
    const input = assistantRoot.querySelector('#assistant-input');
    const chips = assistantRoot.querySelectorAll('.assistant-chip');

    const sectionMap = {
      about: '#about',
      education: '#education',
      experience: '#experience',
      projects: '#projects',
      skills: '#skills',
      certifications: '#certifications',
      contact: '#contact'
    };

    const responses = [
      {
        keywords: ['kubernetes', 'k8s', 'container'],
        reply: 'Kubernetes experience includes 20+ deployments, EKS-based workloads, Helm-driven releases, and containerized delivery systems across platform and simulation environments.',
        target: '#skills',
        highlight: '.skill-icon-kubernetes'
      },
      {
        keywords: ['cicd', 'ci/cd', 'pipelines', 'gitlab', 'jenkins'],
        reply: 'CI/CD work spans 15+ optimized pipelines, GitLab runner infrastructure, Jenkins workflows, quality gates, and one-click deployment automation with measurable delivery gains.',
        target: '#experience',
        highlight: '.timeline-entry'
      },
      {
        keywords: ['cloud', 'aws', 'infrastructure', 'eks'],
        reply: 'Cloud infrastructure work centers on AWS, EKS, ALB ingress, Dockerized workloads, and production-style deployment systems built for reliability and scale.',
        target: '#projects',
        highlight: '.project-card'
      },
      {
        keywords: ['cert', 'certification', 'credly'],
        reply: 'Current certifications include four GitLab credentials plus Java full-stack training, covering Git workflows, project delivery, CI/CD, and services engineering.',
        target: '#certifications',
        highlight: '.certification-card'
      },
      {
        keywords: ['resume', 'cv'],
        reply: 'Resume is available as a direct download from the navbar or hero section. Opening the current PDF resource now.',
        action: () => window.open('assets/docs/Vaibhav_Shete_Resume.pdf', '_blank', 'noopener'),
        target: null
      },
      {
        keywords: ['contact', 'email', 'linkedin', 'github'],
        reply: 'Primary contact routes are GitHub, LinkedIn, and email. Scrolling to the contact section for direct access.',
        target: '#contact',
        highlight: '.info-wrap'
      },
      {
        keywords: ['skills', 'stack', 'tooling'],
        reply: 'Core stack covers platform engineering, cloud infrastructure, programming, observability, and CI/CD automation. Opening the skills showcase.',
        target: '#skills',
        highlight: '.skill-group'
      },
      {
        keywords: ['experience', 'summary', 'career'],
        reply: 'Experience centers on platform systems, distributed execution, simulation orchestration, and automation-first delivery across research engineering and DevOps roles.',
        target: '#experience',
        highlight: '.experience-card'
      },
      {
        keywords: ['projects', 'project'],
        reply: 'Featured projects include EKS deployments, drone simulation CI/CD, serverless Kubernetes workloads, and delivery automation systems.',
        target: '#projects',
        highlight: '.project-card'
      }
    ];

    function setPanelState(isOpen) {
      panel.classList.toggle('is-open', isOpen);
      panel.setAttribute('aria-hidden', String(!isOpen));
      fab.setAttribute('aria-expanded', String(isOpen));
      if (isOpen && input) {
        setTimeout(() => input.focus(), 140);
      }
    }

    function appendMessage(role, text) {
      const message = document.createElement('div');
      message.className = `assistant-message assistant-message-${role}`;
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      message.appendChild(paragraph);
      consoleEl.appendChild(message);
      consoleEl.scrollTop = consoleEl.scrollHeight;
    }

    function appendTyping() {
      const typing = document.createElement('div');
      typing.className = 'assistant-message assistant-message-typing';
      typing.innerHTML = '<span></span><span></span><span></span>';
      consoleEl.appendChild(typing);
      consoleEl.scrollTop = consoleEl.scrollHeight;
      return typing;
    }

    function highlightTarget(selector) {
      if (!selector) return;
      const target = document.querySelector(selector);
      if (!target) return;
      target.classList.add('assistant-target-flash');
      window.setTimeout(() => target.classList.remove('assistant-target-flash'), 1600);
    }

    function navigateToSection(targetSelector, highlightSelector) {
      if (!targetSelector) return;
      const section = document.querySelector(targetSelector);
      if (!section) return;

      const navOffset = floatingNavbar ? floatingNavbar.offsetHeight + 24 : 100;
      const top = section.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({
        top,
        behavior: prefersReducedMotion.matches ? 'auto' : 'smooth'
      });

      const selectorToHighlight = highlightSelector || targetSelector;
      window.setTimeout(() => highlightTarget(selectorToHighlight), prefersReducedMotion.matches ? 0 : 420);
    }

    function resolveCommand(rawValue) {
      const value = rawValue.trim().toLowerCase();
      if (!value) return null;

      const directSection = Object.keys(sectionMap).find(key => value.includes(key));
      if (directSection) {
        return {
          reply: `Navigating to ${directSection}.`,
          target: sectionMap[directSection],
          highlight: sectionMap[directSection]
        };
      }

      return responses.find(entry => entry.keywords.some(keyword => value.includes(keyword))) || {
        reply: 'Supported commands: kubernetes, projects, resume, contact, certifications, skills, experience, or cloud infrastructure.',
        target: null
      };
    }

    function handleAssistantCommand(commandText) {
      const command = resolveCommand(commandText);
      if (!command) return;

      appendMessage('user', commandText);
      const typing = appendTyping();

      window.setTimeout(() => {
        typing.remove();
        appendMessage('bot', command.reply);
        if (typeof command.action === 'function') {
          command.action();
        }
        if (command.target) {
          navigateToSection(command.target, command.highlight);
        }
      }, prefersReducedMotion.matches ? 0 : 360);
    }

    if (fab) {
      fab.addEventListener('click', () => {
        const willOpen = !panel.classList.contains('is-open');
        setPanelState(willOpen);
      });
    }

    if (closeButton) {
      closeButton.addEventListener('click', () => setPanelState(false));
    }

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const command = chip.getAttribute('data-command') || chip.textContent || '';
        if (!panel.classList.contains('is-open')) {
          setPanelState(true);
        }
        handleAssistantCommand(command);
      });
    });

    if (form) {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const value = input ? input.value : '';
        if (!value.trim()) return;
        handleAssistantCommand(value);
        input.value = '';
      });
    }

    document.addEventListener('keydown', (event) => {
      if (event.key === '/' && !event.metaKey && !event.ctrlKey && !event.altKey) {
        const target = event.target;
        const isTypingContext = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement;
        if (isTypingContext) return;
        event.preventDefault();
        setPanelState(true);
      }

      if (event.key === 'Escape' && panel.classList.contains('is-open')) {
        setPanelState(false);
      }
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
  window.addEventListener('load', () => {
    initMotionStagger();
    initAnchorScrolling();
    initPortfolioAssistant();
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
