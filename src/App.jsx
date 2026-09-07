import React, { useEffect } from 'react';
import ParticleCanvas from './components/ParticleCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

// CSS Imports
import './css/base.css';
import './css/navbar.css';
import './css/hero.css';
import './css/about.css';
import './css/skills.css';
import './css/projects.css';
import './css/education.css';
import './css/contact.css';
import './css/footer.css';
import './css/responsive.css';

export default function App() {
  useEffect(() => {
    // Intersection observer for section scroll reveal animation
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <ParticleCanvas />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </>
  );
}
