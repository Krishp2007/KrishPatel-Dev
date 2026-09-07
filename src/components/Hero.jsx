import React, { useState, useEffect } from 'react';

const words = [
  'scalable web apps.',
  'robust REST APIs.',
  'data-driven solutions.',
  'AI-powered tools.',
];

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timer;

    if (isDeleting) {
      if (charIndex > 0) {
        timer = setTimeout(() => setCharIndex((prev) => prev - 1), 50);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
        timer = setTimeout(() => {}, 500);
      }
    } else {
      if (charIndex < currentWord.length) {
        timer = setTimeout(() => setCharIndex((prev) => prev + 1), 100);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      }
    }

    setTypedText(currentWord.substring(0, charIndex));

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, wordIndex]);

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const target = document.getElementById('projects');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="hero-content">
          <p className="hero-greeting">Hello, I'm</p>
          <h1 className="hero-name">
            Krish <span className="gradient-text">Patel</span>
          </h1>

          <p className="hero-title">
            I build <span className="typed-text">{typedText}</span>
            <span className="cursor"></span>
          </p>

          <p className="hero-description">
            Computer Science undergraduate with a strong foundation in backend
            development and database systems. Passionate about building scalable
            web applications and solving real-world problems through efficient
            code.
          </p>

          <div className="hero-buttons">
            <a
              href="#projects"
              className="btn btn-primary"
              onClick={handleScrollToProjects}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
              View Projects
            </a>
            <a
              href="/Krish_Patel_Resume.pdf"
              download
              className="btn btn-secondary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
