import React, { useRef, useLayoutEffect, lazy, Suspense } from 'react';
import {
  DownloadIcon,
  EnvelopeSimpleIcon,
  MapPinIcon,
  ArrowSquareOutIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
} from '@phosphor-icons/react';
import { useCanRender3D } from '../hooks/useCanRender3D';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { gsap, SplitText } from '../lib/gsap';

// Code-split: `three` only loads for the visitors who'll actually render it
// (desktop, WebGL-capable, motion allowed) - never blocks first paint for everyone else.
const HeroParticles = lazy(() => import('./hero/HeroParticles'));

export default function Hero({ profile, onOpenResume }) {
  const nameRef = useRef(null);
  const restRef = useRef(null);
  const canRender3D = useCanRender3D();
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (reducedMotion || !nameRef.current) return;

    const ctx = gsap.context(() => {
      const split = new SplitText(nameRef.current, { type: 'chars' });
      gsap.from(split.chars, {
        opacity: 0,
        y: 20,
        rotateX: -40,
        duration: 0.6,
        stagger: 0.015,
        ease: 'expo.out',
      });

      gsap.from(restRef.current.children, {
        opacity: 0,
        y: 14,
        duration: 0.5,
        stagger: 0.08,
        delay: 0.35,
        ease: 'power2.out',
      });

      return () => split.revert();
    }, nameRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section className="hero-clean">
      <div className="hero-grid">
        <div className="hero-copy">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <MapPinIcon size={14} style={{ flexShrink: 0 }} />
            <span>{profile.location}</span>
          </div>

          <h1 className="hero-name" ref={nameRef}>{profile.name}</h1>

          <div ref={restRef}>
            <h2 className="hero-role">{profile.title}</h2>

            <p className="hero-bio">{profile.headline}</p>

            {/* Primary Action Row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.85rem', marginTop: '0.5rem' }}>
              <a href={profile.resumePdfUrl} download="Jyothi_Prasanth_Resume.pdf" className="btn-clean-primary" onClick={onOpenResume}>
                <DownloadIcon size={15} style={{ flexShrink: 0 }} />
                <span>Download Resume</span>
              </a>

              <a href={`mailto:${profile.email}`} className="btn-clean-outline">
                <EnvelopeSimpleIcon size={15} style={{ flexShrink: 0 }} />
                <span>Get in Touch</span>
              </a>
            </div>

            {/* Profile Links */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="link-btn">
                <GithubLogoIcon size={15} style={{ flexShrink: 0 }} />
                <span>GitHub</span>
                <ArrowSquareOutIcon size={12} style={{ flexShrink: 0 }} />
              </a>

              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="link-btn">
                <LinkedinLogoIcon size={15} style={{ flexShrink: 0 }} />
                <span>LinkedIn</span>
                <ArrowSquareOutIcon size={12} style={{ flexShrink: 0 }} />
              </a>

              <a href={profile.leetcodeRepo} target="_blank" rel="noopener noreferrer" className="link-btn">
                <GithubLogoIcon size={15} style={{ flexShrink: 0 }} />
                <span>LeetCode Practice Repo</span>
                <ArrowSquareOutIcon size={12} style={{ flexShrink: 0 }} />
              </a>
            </div>
          </div>
        </div>

        <div className="hero-visual">

          {canRender3D && (
            <Suspense fallback={null}>
              <HeroParticles className="hero-particles" />
            </Suspense>
          )}
        </div>
      </div>
    </section>
  );
}
