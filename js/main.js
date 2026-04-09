/* ============================================
   Main Initialization
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Particle Background
  const canvas = document.getElementById('particles-canvas');
  if (canvas) new ParticleBackground(canvas);

  // 2. Typing Animation
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

  // 3. Scroll Reveal
  new ScrollReveal();

  // 4. Navbar Logic
  new Navbar();

  // 5. Projects Carousel
  new ProjectCarousel();

  // 6. Smooth Scroll Defaults
  initSmoothScroll();

  // 7. Dynamic Footer Year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
