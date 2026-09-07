import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.getAttribute('id'));
          }
        });
      },
      { threshold: 0.15, rootMargin: '-80px 0px -20% 0px' }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const toggleMobileNav = () => {
    const nextState = !isNavOpen;
    setIsNavOpen(nextState);
    document.body.style.overflow = nextState ? 'hidden' : '';
  };

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setIsNavOpen(false);
    document.body.style.overflow = '';
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="container">
        <a
          href="#hero"
          className="nav-logo"
          onClick={(e) => handleNavClick(e, 'hero')}
        >
          <span className="logo-bracket">&lt;</span>
          <span className="logo-name">Krish</span>
          <span className="logo-bracket"> /&gt;</span>
        </a>

        <div className={`nav-links ${isNavOpen ? 'open' : ''}`} id="navLinks">
          <a
            href="#about"
            className={activeSection === 'about' ? 'active' : ''}
            onClick={(e) => handleNavClick(e, 'about')}
            aria-label="About section"
          >
            About
          </a>
          <a
            href="#skills"
            className={activeSection === 'skills' ? 'active' : ''}
            onClick={(e) => handleNavClick(e, 'skills')}
            aria-label="Skills section"
          >
            Skills
          </a>
          <a
            href="#projects"
            className={activeSection === 'projects' ? 'active' : ''}
            onClick={(e) => handleNavClick(e, 'projects')}
            aria-label="Projects section"
          >
            Projects
          </a>
          <a
            href="#education"
            className={activeSection === 'education' ? 'active' : ''}
            onClick={(e) => handleNavClick(e, 'education')}
            aria-label="Education section"
          >
            Education
          </a>
          <a
            href="#contact"
            className={activeSection === 'contact' ? 'active' : ''}
            onClick={(e) => handleNavClick(e, 'contact')}
            aria-label="Contact section"
          >
            Contact
          </a>
          <a
            href="/Krish_Patel_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            Resume
          </a>
        </div>

        <div
          className={`nav-hamburger ${isNavOpen ? 'active' : ''}`}
          id="navHamburger"
          onClick={toggleMobileNav}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}
