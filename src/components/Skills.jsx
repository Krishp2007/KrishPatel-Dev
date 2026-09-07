import React from 'react';
import { skillsCategories } from '../data/skills';

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="container">
        <div className="skills-header reveal active">
          <span className="section-label">Skills &amp; Expertise</span>
          <h2 className="section-title">
            Technologies I <span className="gradient-text">work with</span>
          </h2>
          <p className="section-subtitle">
            A curated set of tools and technologies I use to build robust,
            scalable applications.
          </p>
        </div>

        <div className="skills-grid">
          {skillsCategories.map((cat) => (
            <div
              key={cat.id}
              className={`skill-category cat-${cat.colorClass} reveal ${cat.delay} active`}
            >
              <div className={`skill-category-icon ${cat.colorClass}`}>
                {cat.icon}
              </div>
              <h3 className="skill-category-title">{cat.title}</h3>
              <div className="skill-tags">
                {cat.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    <span className={`tag-dot ${cat.dotColor}`}></span>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
