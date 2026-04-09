/* ============================================
   Projects Carousel — Infinite Loop
   ============================================ */

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
    this.totalSlides = this.totalOriginal;
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

    // Keep arrows visible for infinite loop
    if (this.prevBtn) this.prevBtn.style.opacity = '';
    if (this.nextBtn) this.nextBtn.style.opacity = '';
  }

  goNext() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.currentIndex++;
    this.updatePosition(true);

    if (this.currentIndex >= this.totalSlides) {
      setTimeout(() => {
        this.currentIndex = 0;
        this.updatePosition(false);
        this.isTransitioning = false;
      }, 650);
    } else {
      setTimeout(() => { this.isTransitioning = false; }, 650);
    }
  }

  goPrev() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.currentIndex--;
    this.updatePosition(true);

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
