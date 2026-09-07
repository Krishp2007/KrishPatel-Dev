import React from 'react';

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text reveal reveal-delay-2 active">
            <span className="section-label">About Me</span>
            <h2 className="section-title">
              Passionate about building<br />
              <span className="gradient-text">impactful software</span>
            </h2>

            <p>
              I'm a{' '}
              <strong>Computer Science &amp; Engineering</strong> undergraduate
              at <strong>LJ Institute of Engineering and Technology</strong>,
              Ahmedabad. I focus on backend development and creating data-driven
              applications that solve real-world problems.
            </p>

            <p>
              With hands-on experience in{' '}
              <strong>Django, Flask, and PostgreSQL</strong>, I enjoy designing
              robust REST APIs and scalable systems. Beyond backend, I work with
              the <strong>MERN stack</strong>, do{' '}
              <strong>data analysis</strong>, and build{' '}
              <strong>AI prediction models</strong>.
            </p>

            <div className="about-highlights">
              <span className="highlight-tag">
                <span className="tag-icon">🎯</span> Backend Development
              </span>
              <span className="highlight-tag">
                <span className="tag-icon">📊</span> Data Analysis
              </span>
              <span className="highlight-tag">
                <span className="tag-icon">🤖</span> AI / ML
              </span>
              <span className="highlight-tag">
                <span className="tag-icon">🌐</span> MERN Stack
              </span>
              <span className="highlight-tag">
                <span className="tag-icon">🗄️</span> Database Design
              </span>
              <span className="highlight-tag">
                <span className="tag-icon">🔗</span> REST APIs
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
