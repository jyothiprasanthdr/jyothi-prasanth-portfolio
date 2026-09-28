import React, { useState } from 'react';
import { Code, CheckCircle, Clock, Database, ChevronRight, Copy, Check } from 'lucide-react';

export default function LeetCodeTracker({ leetcode }) {
  const [selectedSubmission, setSelectedSubmission] = useState(leetcode.recentSubmissions[0]);
  const [copied, setCopied] = useState(false);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section>
      <div className="section-header">
        <div>
          <h2 className="section-title">LeetCode & Problem Solving Tracker</h2>
          <p className="section-subtitle">
            Live metrics and algorithmic problem solver repository synced with GitHub.
          </p>
        </div>
      </div>

      <div className="leetcode-overview">
        <div className="lc-stat-box">
          <span className="metric-label">Total Solved</span>
          <span className="lc-big-num">{leetcode.totalSolved}</span>
          <span className="metric-detail">LeetCode Submissions</span>

          <div className="lc-difficulty-bar">
            <div className="lc-diff-pill" style={{ color: '#22c55e' }}>
              Easy: {leetcode.easy}
            </div>
            <div className="lc-diff-pill" style={{ color: '#eab308' }}>
              Med: {leetcode.medium}
            </div>
            <div className="lc-diff-pill" style={{ color: '#ef4444' }}>
              Hard: {leetcode.hard}
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '0.95rem', marginBottom: '0.75rem', fontWeight: 600 }}>
            DSA Topic Proficiency
          </h3>

          <div className="topic-grid">
            {leetcode.dsaTopics.map((topic, idx) => (
              <div key={idx} className="topic-card">
                <span>{topic.name}</span>
                <span className="font-mono" style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {topic.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ fontSize: '1.05rem', marginBottom: '1rem', fontWeight: 600 }}>
          Recent Verified GitHub Submissions
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '1.25rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {leetcode.recentSubmissions.map((sub) => (
              <div
                key={sub.id}
                onClick={() => setSelectedSubmission(sub)}
                className={`note-item ${selectedSubmission.id === sub.id ? 'active' : ''}`}
              >
                <div className="project-title-row" style={{ margin: 0 }}>
                  <span className="note-item-title" style={{ fontSize: '0.875rem' }}>{sub.title}</span>
                  <span
                    className="tag-badge"
                    style={{
                      fontSize: '0.7rem',
                      color:
                        sub.difficulty === 'Easy'
                          ? '#22c55e'
                          : sub.difficulty === 'Medium'
                          ? '#eab308'
                          : '#ef4444',
                    }}
                  >
                    {sub.difficulty}
                  </span>
                </div>
                <div className="note-item-meta" style={{ marginTop: '0.35rem' }}>
                  <span>{sub.category}</span>
                  <span>{sub.date}</span>
                </div>
              </div>
            ))}
          </div>

          {selectedSubmission && (
            <div className="code-submission-card">
              <div className="code-header">
                <div>
                  <strong>{selectedSubmission.title}</strong>
                  <span style={{ color: 'var(--text-muted)', marginLeft: '0.75rem' }}>
                    {selectedSubmission.githubFile}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className="cmd-badge" style={{ padding: '0.15rem 0.4rem' }}>
                    <Clock size={12} />
                    <span>{selectedSubmission.runtime}</span>
                  </span>
                  <span className="cmd-badge" style={{ padding: '0.15rem 0.4rem' }}>
                    <Database size={12} />
                    <span>{selectedSubmission.memory}</span>
                  </span>
                  <button
                    className="icon-btn"
                    onClick={() => handleCopyCode(selectedSubmission.codeSnippet)}
                    title="Copy Python Code"
                  >
                    {copied ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              <pre className="code-block">
                <code>{selectedSubmission.codeSnippet}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
