/* ============================================
   Navbar, Scroll Reveal & Smooth Scroll
   ============================================ */

// ==================== SCROLL REVEAL ====================
class ScrollReveal {
  constructor() {
    this.elements = document.querySelectorAll('.reveal');
    this.observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('active'); }); },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    this.elements.forEach((el) => this.observer.observe(el));
  }
}

// ==================== NAVBAR ====================
class Navbar {
  constructor() {
    this.navbar = document.getElementById('navbar');
    this.navLinks = document.getElementById('navLinks');
    this.hamburger = document.getElementById('navHamburger');
    this.links = document.querySelectorAll('.nav-links a:not(.nav-cta)');
    this.sections = document.querySelectorAll('section[id]');
    this.initScroll();
    this.initHamburger();
    this.initActiveLink();
  }

  initScroll() {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 50) this.navbar.classList.add('scrolled');
      else this.navbar.classList.remove('scrolled');
    });
  }

  initHamburger() {
    this.hamburger.addEventListener('click', () => {
      this.hamburger.classList.toggle('active');
      this.navLinks.classList.toggle('open');
      document.body.style.overflow = this.navLinks.classList.contains('open') ? 'hidden' : '';
    });
    this.links.forEach((link) => {
      link.addEventListener('click', () => {
        this.hamburger.classList.remove('active');
        this.navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  initActiveLink() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            this.links.forEach((link) => {
              link.classList.remove('active');
              if (link.getAttribute('href') === '#' + id) link.classList.add('active');
            });
          }
        });
      },
      { threshold: 0.15, rootMargin: '-80px 0px -20% 0px' }
    );
    this.sections.forEach((section) => observer.observe(section));
  }
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}
