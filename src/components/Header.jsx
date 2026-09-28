import React, { useRef, useLayoutEffect } from 'react';
import { MoonIcon, SunIcon } from '@phosphor-icons/react';
import { gsap } from '../lib/gsap';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function Header({ activeTab, setActiveTab, theme, toggleTheme }) {
  const navTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'notes', label: 'Digital Garden' },
    { id: 'resume', label: 'Resume' },
  ];

  const navRef = useRef(null);
  const pillRef = useRef(null);
  const initializedRef = useRef(false);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const nav = navRef.current;
    const pill = pillRef.current;
    if (!nav || !pill) return;

    const activeBtn = nav.querySelector(`[data-tab="${activeTab}"]`);
    if (!activeBtn) return;

    const navRect = nav.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();
    const target = {
      left: btnRect.left - navRect.left,
      top: btnRect.top - navRect.top,
      width: btnRect.width,
      height: btnRect.height,
    };

    if (reducedMotion || !initializedRef.current) {
      gsap.set(pill, target);
      initializedRef.current = true;
    } else {
      gsap.to(pill, { ...target, duration: 0.35, ease: 'power2.out' });
    }
  }, [activeTab, reducedMotion]);

  return (
    <header className="header">
      <div className="container">
        <div className="nav-bar">
          <div className="brand-title">
            <span className="brand-dot"></span>
            <span>Jyothi Prasanth D R</span>
          </div>

          <nav className="nav-links" ref={navRef}>
            <span className="nav-pill" ref={pillRef}></span>
            {navTabs.map((tab) => (
              <button
                key={tab.id}
                data-tab={tab.id}
                className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="nav-actions">
            <button className="icon-btn" onClick={toggleTheme} title={`Toggle ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}>
              <span key={theme} className="theme-icon">
                {theme === 'dark' ? <SunIcon size={15} /> : <MoonIcon size={15} />}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
