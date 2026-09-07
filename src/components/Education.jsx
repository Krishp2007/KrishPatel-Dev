import React from 'react';
import { educationTimeline, certificationsData } from '../data/education';

export default function Education() {
  return (
    <section className="education" id="education">
      <div className="container">
        <div className="education-header reveal active">
          <span className="section-label">Background</span>
          <h2 className="section-title">
            Education &amp; <span className="gradient-text">Certifications</span>
          </h2>
          <p className="section-subtitle">
            My academic journey and professional certifications.
          </p>
        </div>

        <div className="education-grid">
          {/* Education Column */}
          <div className="reveal reveal-delay-1 active">
            <h3 className="education-column-title">
              <span className="col-icon edu">🎓</span> Education
            </h3>
            <div className="timeline">
              {educationTimeline.map((item, index) => (
                <div className="timeline-item" key={index}>
                  <div className="timeline-dot"></div>
                  <div className="timeline-card">
                    <span className="timeline-date">{item.period}</span>
                    <h4 className="timeline-title">{item.title}</h4>
                    <p className="timeline-institution">{item.institution}</p>
                    <p className="timeline-location">{item.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Column */}
          <div className="reveal reveal-delay-2 active">
            <h3 className="education-column-title">
              <span className="col-icon cert">🏆</span> Certifications
            </h3>
            <div className="cert-list">
              {certificationsData.map((cert, index) => (
                <div className="cert-card" key={index}>
                  <div className="cert-icon">{cert.icon}</div>
                  <div className="cert-info">
                    <h4 className="cert-name">{cert.name}</h4>
                    <p className="cert-issuer">{cert.issuer}</p>
                  </div>
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-link"
                  >
                    View Credential →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
