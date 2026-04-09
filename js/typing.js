/* ============================================
   Typing Animation — Hero Section
   ============================================ */

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
