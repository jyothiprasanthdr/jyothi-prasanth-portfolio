import React from 'react';
import { BookOpenIcon, ArrowSquareOutIcon, CertificateIcon } from '@phosphor-icons/react';
import Reveal from './motion/Reveal';
import { useTilt } from '../hooks/useTilt';

function PublicationCard({ pub, delay }) {
  const tiltRef = useTilt();
  return (
    <Reveal ref={tiltRef} as="div" className="clean-card" style={{ marginBottom: 0 }} delay={delay}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.85rem' }}>
        <div style={{ flex: 1, minWidth: '280px' }}>
          <h4 style={{ fontSize: '1.025rem', fontWeight: 600, marginBottom: '0.35rem', lineHeight: 1.4 }}>
            {pub.title}
          </h4>
          <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            <strong>{pub.publisher}</strong> ({pub.year}) • Authors: {pub.authors}
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
            {pub.description}
          </p>
        </div>

        <a
          href={pub.link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-clean-outline"
          style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem', flexShrink: 0 }}
        >
          <span>View Paper</span>
          <ArrowSquareOutIcon size={13} />
        </a>
      </div>
    </Reveal>
  );
}

function CertificationCard({ cert, delay }) {
  const tiltRef = useTilt();
  return (
    <Reveal ref={tiltRef} as="div" className="clean-card" style={{ marginBottom: 0 }} delay={delay}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
        <CertificateIcon size={16} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />
        <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{cert.name}</h4>
      </div>
      <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
        {cert.issuer} • {cert.date}
      </div>
      <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
        Credential ID: {cert.credentialId}
      </div>
    </Reveal>
  );
}

export default function PublicationsCerts({ publications, certifications }) {
  return (
    <section className="section-spacing">
      <div className="section-header">
        <h2 className="section-title">Publications & Domain Certifications</h2>
        <p className="section-subtitle">
          Peer-reviewed research papers and verified technical certifications.
        </p>
      </div>

      {/* Research Publications */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
          <BookOpenIcon size={16} />
          <h3 style={{ fontSize: '0.95rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Peer-Reviewed Research Publications ({publications.length})
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {publications.map((pub, idx) => (
            <PublicationCard key={idx} pub={pub} delay={idx * 0.06} />
          ))}
        </div>
      </div>

      {/* Verified Certifications */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
          <CertificateIcon size={16} />
          <h3 style={{ fontSize: '0.95rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Verified Domain Certifications
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {certifications.map((cert, idx) => (
            <CertificationCard key={idx} cert={cert} delay={idx * 0.06} />
          ))}
        </div>
      </div>
    </section>
  );
}
