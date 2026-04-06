/* ============================================
   KRISH PATEL — PORTFOLIO
   Interactive Scripts
   ============================================ */

// ==================== PARTICLE BACKGROUND ====================
class ParticleBackground {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 150 };
    this.resize();
    this.init();
    this.animate();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => { this.mouse.x = e.clientX; this.mouse.y = e.clientY; });
  }

  resize() { this.canvas.width = window.innerWidth; this.canvas.height = window.innerHeight; }

  init() {
    this.particles = [];
    const count = Math.min(80, Math.floor((this.canvas.width * this.canvas.height) / 15000));
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(59, 130, 246, ${p.opacity})`;
      this.ctx.fill();

      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(59, 130, 246, ${0.08 * (1 - dist / 120)})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }

      if (this.mouse.x !== null) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.mouse.radius) {
          const force = (this.mouse.radius - dist) / this.mouse.radius;
          p.x += dx * force * 0.02;
          p.y += dy * force * 0.02;
        }
      }
    }
    requestAnimationFrame(() => this.animate());
  }
}

// ==================== TYPING ANIMATION ====================
class TypingAnimation {
  constructor(element, words, typeSpeed = 100, deleteSpeed = 50, pauseDuration = 2000) {
    this.element = element;
    this.words = words;
    this.typeSpeed = typeSpeed;
    this.deleteSpeed = deleteSpeed;
    this.pauseDuration = pauseDuration;
    this.wordIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.type();
  }

  type() {
    const currentWord = this.words[this.wordIndex];
    if (this.isDeleting) {
      this.charIndex--;
      this.element.textContent = currentWord.substring(0, this.charIndex);
    } else {
      this.charIndex++;
      this.element.textContent = currentWord.substring(0, this.charIndex);
    }

    let delay = this.isDeleting ? this.deleteSpeed : this.typeSpeed;
    if (!this.isDeleting && this.charIndex === currentWord.length) {
      delay = this.pauseDuration;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.wordIndex = (this.wordIndex + 1) % this.words.length;
      delay = 500;
    }
    setTimeout(() => this.type(), delay);
  }
}

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

// ==================== CONTACT FORM ====================
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('formName').value;
    const email = document.getElementById('formEmail').value;
    const message = document.getElementById('formMessage').value;
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:krishpatel2136@gmail.com?subject=${subject}&body=${body}`;
  });
}

// ==================== PROJECTS CAROUSEL ====================
class ProjectCarousel {
  constructor() {
    this.track = document.getElementById('carouselTrack');
    this.prevBtn = document.getElementById('carouselPrev');
    this.nextBtn = document.getElementById('carouselNext');
    this.dotsContainer = document.getElementById('carouselDots');
    this.counterEl = document.getElementById('carouselCounter');
    this.carousel = document.querySelector('.projects-carousel');
    if (!this.track) return;

    this.originalCards = Array.from(this.track.children);
    this.totalOriginal = this.originalCards.length;
    this.currentIndex = 0;
    this.touchStartX = 0;
    this.touchEndX = 0;
    this.isPaused = false;
    this.isTransitioning = false;
    this.autoplaySpeed = 4000;

    document.documentElement.style.setProperty('--autoplay-speed', this.autoplaySpeed + 'ms');

    this.setup();
    this.bindEvents();
    this.startAutoplay();
  }

  setup() {
    this.cardsPerView = this.getCardsPerView();
    this.totalSlides = this.totalOriginal; // dots = total original cards
    this.removeClones();
    this.createClones();
    this.createDots();
    this.updatePosition(false);
  }

  getCardsPerView() {
    const w = window.innerWidth;
    if (w <= 768) return 1;
    if (w <= 1024) return 2;
    return 3;
  }

  removeClones() {
    this.track.querySelectorAll('.carousel-clone').forEach(c => c.remove());
  }

  createClones() {
    // Clone first N cards and append to end
    for (let i = 0; i < this.cardsPerView; i++) {
      const clone = this.originalCards[i].cloneNode(true);
      clone.classList.add('carousel-clone');
      clone.setAttribute('aria-hidden', 'true');
      this.track.appendChild(clone);
    }
    // Clone last N cards and prepend to start
    for (let i = this.totalOriginal - 1; i >= Math.max(0, this.totalOriginal - this.cardsPerView); i--) {
      const clone = this.originalCards[i].cloneNode(true);
      clone.classList.add('carousel-clone');
      clone.setAttribute('aria-hidden', 'true');
      this.track.insertBefore(clone, this.track.firstChild);
    }
    this.prependedClones = Math.min(this.cardsPerView, this.totalOriginal);
  }

  createDots() {
    if (!this.dotsContainer) return;
    this.dotsContainer.innerHTML = '';
    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement('button');
      dot.classList.add('carousel-dot');
      dot.setAttribute('aria-label', `Go to project ${i + 1}`);
      dot.addEventListener('click', () => {
        this.currentIndex = i;
        this.updatePosition(true);
        this.restartAutoplay();
      });
      this.dotsContainer.appendChild(dot);
    }
  }

  getTranslateIndex() {
    // Account for prepended clones
    return this.currentIndex + this.prependedClones;
  }

  updatePosition(animate = true) {
    if (!animate) {
      this.track.classList.add('no-transition');
    } else {
      this.track.classList.remove('no-transition');
    }

    const translateIdx = this.getTranslateIndex();
    const percent = (100 / this.cardsPerView) * translateIdx;
    this.track.style.transform = `translateX(-${percent}%)`;

    if (!animate) {
      void this.track.offsetWidth; // Force reflow
      this.track.classList.remove('no-transition');
    }

    // Update dots
    const realIndex = ((this.currentIndex % this.totalSlides) + this.totalSlides) % this.totalSlides;
    const dots = this.dotsContainer?.querySelectorAll('.carousel-dot');
    dots?.forEach((d, i) => {
      d.classList.toggle('active', i === realIndex);
      d.classList.toggle('paused', this.isPaused);
    });

    // Update counter
    if (this.counterEl) {
      this.counterEl.textContent = `${realIndex + 1} / ${this.totalSlides}`;
    }

    // Hide/show arrows (never fully disable for infinite loop)
    if (this.prevBtn) this.prevBtn.style.opacity = '';
    if (this.nextBtn) this.nextBtn.style.opacity = '';
  }

  goNext() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.currentIndex++;
    this.updatePosition(true);

    // If we've gone into the cloned region, silently snap back
    if (this.currentIndex >= this.totalSlides) {
      setTimeout(() => {
        this.currentIndex = 0;
        this.updatePosition(false);
        this.isTransitioning = false;
      }, 650); // Match CSS transition duration
    } else {
      setTimeout(() => { this.isTransitioning = false; }, 650);
    }
  }

  goPrev() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.currentIndex--;
    this.updatePosition(true);

    // If we've gone before 0 into prepended clones
    if (this.currentIndex < 0) {
      setTimeout(() => {
        this.currentIndex = this.totalSlides - 1;
        this.updatePosition(false);
        this.isTransitioning = false;
      }, 650);
    } else {
      setTimeout(() => { this.isTransitioning = false; }, 650);
    }
  }

  startAutoplay() {
    this.stopAutoplay();
    this.autoplayTimer = setInterval(() => {
      if (!this.isPaused && !this.isTransitioning) this.goNext();
    }, this.autoplaySpeed);
  }

  stopAutoplay() {
    if (this.autoplayTimer) clearInterval(this.autoplayTimer);
  }

  restartAutoplay() {
    this.startAutoplay();
    const activeDot = this.dotsContainer?.querySelector('.carousel-dot.active');
    if (activeDot) {
      activeDot.classList.remove('active');
      void activeDot.offsetWidth;
      activeDot.classList.add('active');
      if (this.isPaused) activeDot.classList.add('paused');
    }
  }

  pause() {
    this.isPaused = true;
    const dots = this.dotsContainer?.querySelectorAll('.carousel-dot');
    dots?.forEach(d => d.classList.add('paused'));
  }

  resume() {
    this.isPaused = false;
    const dots = this.dotsContainer?.querySelectorAll('.carousel-dot');
    dots?.forEach(d => d.classList.remove('paused'));
  }

  bindEvents() {
    this.prevBtn?.addEventListener('click', () => {
      this.goPrev();
      this.restartAutoplay();
    });
    this.nextBtn?.addEventListener('click', () => {
      this.goNext();
      this.restartAutoplay();
    });

    // Hover pause (desktop)
    this.carousel?.addEventListener('mouseenter', () => this.pause());
    this.carousel?.addEventListener('mouseleave', () => this.resume());

    // Touch
    this.track.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
      this.pause();
    }, { passive: true });

    this.track.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
      setTimeout(() => this.resume(), 2000);
    }, { passive: true });

    // Resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const newPerView = this.getCardsPerView();
        if (newPerView !== this.cardsPerView) {
          this.currentIndex = 0;
          this.setup();
        }
      }, 200);
    });

    // Tab visibility
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.pause();
      else this.resume();
    });
  }

  handleSwipe() {
    const diff = this.touchStartX - this.touchEndX;
    if (diff > 50) { this.goNext(); this.restartAutoplay(); }
    else if (diff < -50) { this.goPrev(); this.restartAutoplay(); }
  }
}

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('particles-canvas');
  if (canvas) new ParticleBackground(canvas);

  const typedElement = document.getElementById('typedText');
  if (typedElement) {
    new TypingAnimation(typedElement, [
      'scalable web apps',
      'REST APIs',
      'data-driven systems',
      'backend solutions',
      'elegant code',
    ]);
  }

  new ScrollReveal();
  new Navbar();
  new ProjectCarousel();
  initSmoothScroll();
  initContactForm();

  // Dynamic year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
