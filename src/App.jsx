import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TechSkills from './components/TechSkills';
import ResumeTimeline from './components/ResumeTimeline';
import LeetCodeHeatmap from './components/LeetCodeHeatmap';
import NotefulNotesGallery from './components/NotefulNotesGallery';
import PublicationsCerts from './components/PublicationsCerts';
import { PORTFOLIO_DATA } from './data/portfolioData';
import { EnvelopeSimpleIcon, GithubLogoIcon, LinkedinLogoIcon } from '@phosphor-icons/react';
import { useLenis } from './hooks/useLenis';
import { ScrollTrigger } from './lib/gsap';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio_theme') || 'dark';
  });

  useLenis();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio_theme', theme);
  }, [theme]);

  // Switching tabs mounts/unmounts whole sections, changing page height —
  // let ScrollTrigger recompute its start/end positions against the new layout.
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [activeTab]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="app-root">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Hero renders full-bleed, outside the max-width container, so the photo can go edge-to-edge. */}
      {activeTab === 'overview' && (
        <Hero
          profile={PORTFOLIO_DATA.profile}
          onOpenResume={() => setActiveTab('resume')}
        />
      )}

      <main className="container">
        {activeTab === 'overview' && (
          <>
            {/* 2. Technical Skills & Domain Expertise */}
            <TechSkills />

            {/* 3. Professional Experience & Education */}
            <ResumeTimeline
              experience={PORTFOLIO_DATA.experience}
              education={PORTFOLIO_DATA.education}
              profile={PORTFOLIO_DATA.profile}
            />

            {/* 4. LeetCode Heatmap Activity Tracker */}
            <LeetCodeHeatmap leetcode={PORTFOLIO_DATA.leetcode} />

            {/* 5. Publications & Certifications */}
            <PublicationsCerts
              publications={PORTFOLIO_DATA.publications}
              certifications={PORTFOLIO_DATA.certifications}
            />
          </>
        )}

        {activeTab === 'notes' && (
          <div style={{ padding: '2rem 0' }}>
            <NotefulNotesGallery notes={PORTFOLIO_DATA.notefulNotes} />
          </div>
        )}

        {activeTab === 'resume' && (
          <div style={{ padding: '2rem 0' }}>
            <ResumeTimeline
              experience={PORTFOLIO_DATA.experience}
              education={PORTFOLIO_DATA.education}
              profile={PORTFOLIO_DATA.profile}
            />
          </div>
        )}
      </main>

      <footer className="container">
        <div className="footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span className="brand-dot"></span>
            <span>Jyothi Prasanth D R · AI Engineer</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <a href={PORTFOLIO_DATA.profile.github} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <GithubLogoIcon size={14} />
              <span>GitHub</span>
            </a>
            <a href={PORTFOLIO_DATA.profile.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <LinkedinLogoIcon size={14} />
              <span>LinkedIn</span>
            </a>
            <a href={`mailto:${PORTFOLIO_DATA.profile.email}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <EnvelopeSimpleIcon size={14} />
              <span>Email</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
