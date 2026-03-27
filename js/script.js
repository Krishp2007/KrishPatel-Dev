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
  initSmoothScroll();
  initContactForm();

  // Dynamic year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
