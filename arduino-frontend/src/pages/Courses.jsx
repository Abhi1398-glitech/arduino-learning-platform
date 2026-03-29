import React from 'react';
import { Link } from 'react-router-dom';
import './Courses.css';

const courses = [
  {
    id: 'arduino-basics',
    title: 'Arduino Basics – LED Blinking',
    subtitle: 'Module 01 · Beginner',
    description:
      'Your entry point into the world of embedded systems. You\'ll learn core Arduino concepts like digital output, timing, and the anatomy of a sketch — then prove it by making an LED blink exactly how you want it to.',
    tags: ['LED', 'pinMode', 'digitalWrite', 'delay'],
    modules: 4,
    board: 'Arduino UNO',
    duration: '~45 min',
    difficulty: 'Beginner',
    color: 'teal',
  },
];

const DifficultyBadge = ({ level }) => {
  const colors = {
    Beginner: 'teal',
    Intermediate: 'orange',
    Advanced: 'red',
  };
  return (
    <span className={`difficulty-badge difficulty-${colors[level] || 'teal'}`}>
      {level}
    </span>
  );
};

const Courses = () => {
  return (
    <main className="courses-page page-enter">
      <div className="section-container">
        {/* Header */}
        <div className="courses-header">
          <p className="section-label">Curriculum</p>
          <h1 className="courses-title">All Courses</h1>
          <p className="courses-subtitle">
            Structured learning paths with video, theory, and auto-graded code challenges.
            Pick a course and dive in — no setup required.
          </p>
        </div>

        {/* Filter bar (prototype: just label) */}
        <div className="courses-filter-bar">
          <span className="filter-label mono">// Showing: All Levels</span>
          <span className="filter-count mono">{courses.length} course{courses.length !== 1 ? 's' : ''}</span>
        </div>

        {/* Course grid */}
        <div className="courses-grid">
          {courses.map((course) => (
            <div key={course.id} className="course-card card">
              <div className="course-card-top">
                <div className="course-icon-wrap">
                  <span className="course-icon">⚡</span>
                </div>
                <DifficultyBadge level={course.difficulty} />
              </div>

              <div className="course-card-info">
                <span className="course-meta mono">{course.subtitle}</span>
                <h2 className="course-name">{course.title}</h2>
                <p className="course-description">{course.description}</p>
              </div>

              <div className="course-card-tags">
                {course.tags.map((tag) => (
                  <span key={tag} className="tag mono">{tag}()</span>
                ))}
              </div>

              <div className="course-card-meta-row">
                <span className="meta-item">📦 {course.modules} modules</span>
                <span className="meta-item">🕐 {course.duration}</span>
                <span className="meta-item">🔌 {course.board}</span>
              </div>

              <div className="course-card-footer">
                <Link to={`/courses/${course.id}`} className="btn-primary course-cta">
                  Open Course →
                </Link>
              </div>
            </div>
          ))}

          {/* Coming soon placeholder */}
          <div className="course-card card course-card-coming-soon">
            <div className="coming-soon-inner">
              <span className="coming-soon-icon">🔜</span>
              <h3 className="coming-soon-title">IoT & Sensors</h3>
              <p className="coming-soon-desc mono">// Coming soon</p>
            </div>
          </div>

          <div className="course-card card course-card-coming-soon">
            <div className="coming-soon-inner">
              <span className="coming-soon-icon">🔜</span>
              <h3 className="coming-soon-title">Serial Communication</h3>
              <p className="coming-soon-desc mono">// Coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Courses;