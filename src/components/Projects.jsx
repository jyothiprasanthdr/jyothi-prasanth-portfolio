import React from 'react';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function Projects({ projects }) {
  return (
    <section className="section-spacing">
      <div className="section-header">
        <h2 className="section-title">Featured Engineering Projects</h2>
        <p className="section-subtitle">
          Production Multi-Agent state machines, Agentic RAG pipelines, and serverless ML inference.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {projects.map((project) => (
          <div key={project.id} className="clean-card">
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{project.title}</h3>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-clean-outline"
                style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem' }}
              >
                <GithubIcon size={13} />
                <span>Repository</span>
                <ExternalLink size={11} />
              </a>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.65rem', lineHeight: 1.5 }}>
              {project.summary}
            </p>

            <div style={{ fontSize: '0.825rem', color: 'var(--text-primary)', marginBottom: '0.75rem', fontWeight: 500 }}>
              <strong>Engineering Impact:</strong> {project.impact}
            </div>

            <div className="tag-list">
              {project.tags.map((tag) => (
                <span key={tag} className="tag-badge">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
