import React, { useState, useEffect } from 'react';
import { Search, Command, FileText, Code, BookOpen, Award, Briefcase, Moon, Sun, X, ArrowRight } from 'lucide-react';

export default function CommandPalette({ isOpen, onClose, onSelectTab, toggleTheme, theme }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    { id: 'tab-overview', title: 'Go to Overview & Bio', section: 'Navigation', icon: Command, action: () => { onSelectTab('overview'); onClose(); } },
    { id: 'tab-projects', title: 'View Engineering Projects', section: 'Navigation', icon: Code, action: () => { onSelectTab('projects'); onClose(); } },
    { id: 'tab-leetcode', title: 'Open LeetCode Activity Heatmap', section: 'Navigation', icon: Code, action: () => { onSelectTab('leetcode'); onClose(); } },
    { id: 'tab-notes', title: 'Open Noteful Digital Notes Gallery', section: 'Navigation', icon: BookOpen, action: () => { onSelectTab('notes'); onClose(); } },
    { id: 'tab-pubs', title: 'View Research Publications & Certifications', section: 'Navigation', icon: Award, action: () => { onSelectTab('publications'); onClose(); } },
    { id: 'tab-resume', title: 'Open Technical Resume & Work History', section: 'Navigation', icon: Briefcase, action: () => { onSelectTab('resume'); onClose(); } },
    { id: 'act-theme', title: `Toggle Theme (Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode)`, section: 'Action', icon: theme === 'dark' ? Sun : Moon, action: () => { toggleTheme(); onClose(); } },
  ];

  const filteredActions = actions.filter((act) =>
    act.title.toLowerCase().includes(query.toLowerCase()) ||
    act.section.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '580px' }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '0.75rem 1rem', borderBottom: '1px solid var(--border-color)' }}>
          <Search size={16} style={{ color: 'var(--text-muted)', marginRight: '0.75rem' }} />
          <input
            type="text"
            className="form-input"
            style={{ border: 'none', padding: '0.4rem 0', background: 'transparent' }}
            placeholder="Type a command to jump..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button className="icon-btn" onClick={onClose} style={{ marginLeft: '0.5rem' }}>
            <X size={15} />
          </button>
        </div>

        <div className="modal-body" style={{ maxHeight: '320px', padding: '0.5rem' }}>
          {filteredActions.length === 0 ? (
            <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              No commands found matching "{query}".
            </div>
          ) : (
            filteredActions.map((act) => {
              const IconComp = act.icon;
              return (
                <div
                  key={act.id}
                  onClick={act.action}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    transition: 'background-color 0.15s ease',
                  }}
                  className="clean-card"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <IconComp size={15} style={{ color: 'var(--text-secondary)' }} />
                    <span>{act.title}</span>
                  </div>

                  <ArrowRight size={13} style={{ color: 'var(--text-muted)' }} />
                </div>
              );
            })
          )}
        </div>

        <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid var(--border-color)', fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
          <span>Press ESC to exit</span>
          <span>COSS UI Navigation</span>
        </div>
      </div>
    </div>
  );
}
