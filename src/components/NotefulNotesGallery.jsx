import React, { useState, useEffect } from 'react';
import { EyeIcon, CaretRightIcon, XIcon, DownloadIcon, MagnifyingGlassIcon } from '@phosphor-icons/react';

export default function NotefulNotesGallery({ notes: initialNotes }) {
  const [activeNote, setActiveNote] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [notesList, setNotesList] = useState(initialNotes || []);

  const loadNotesManifest = () => {
    fetch('/notes-manifest.json?t=' + Date.now())
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setNotesList(data);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    loadNotesManifest();
  }, []);

  const categories = ['All', ...new Set(notesList.map((n) => n.category))];

  const filteredNotes = notesList.filter((nb) => {
    const matchesCategory = selectedCategory === 'All' || nb.category === selectedCategory;
    const matchesSearch =
      nb.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nb.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="section-spacing">
      <div className="section-header">
        <div>
          <h2 className="section-title">Digital Garden & System Blueprints</h2>
          <p className="section-subtitle">
            Handwritten architecture diagrams, Generative AI research takeaways, and system design notes.
          </p>
        </div>
      </div>

      {/* Category Pills & Search */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className="tag-list" style={{ margin: 0 }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="tag-badge"
              style={{
                cursor: 'pointer',
                fontSize: '0.8rem',
                padding: '0.35rem 0.75rem',
                borderColor: selectedCategory === cat ? 'var(--border-active)' : 'var(--border-color)',
                backgroundColor: selectedCategory === cat ? 'var(--text-primary)' : 'var(--accent-badge-bg)',
                color: selectedCategory === cat ? 'var(--bg-primary)' : 'var(--text-primary)',
                fontWeight: selectedCategory === cat ? '600' : '400',
              }}
            >
              {cat} {cat !== 'All' && `(${notesList.filter((n) => n.category === cat).length})`}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', minWidth: '220px' }}>
          <MagnifyingGlassIcon size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="btn-clean-outline"
            style={{ width: '100%', paddingLeft: '2.25rem', fontSize: '0.825rem', textAlign: 'left', cursor: 'text' }}
            placeholder={`Search ${notesList.length} notebooks...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredNotes.length === 0 ? (
        <div className="clean-card" style={{ padding: '3rem 1.5rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            No notebooks found matching "{searchQuery}".
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
          {filteredNotes.map((nb, idx) => (
            <div key={`${nb.id}-${idx}`} className="clean-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                  <span className="noteful-badge">{nb.category}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>PDF</span>
                </div>

                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.75rem', lineHeight: 1.4 }}>
                  {nb.title}
                </h3>

                <div className="tag-list" style={{ marginBottom: 0 }}>
                  {nb.tags?.map((tag) => (
                    <span key={tag} className="tag-badge">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ paddingTop: '0.85rem', borderTop: '1px solid var(--border-subtle)', marginTop: '0.85rem' }}>
                <button
                  className="btn-clean-outline"
                  style={{ width: '100%', justifyContent: 'space-between', fontSize: '0.8rem' }}
                  onClick={() => setActiveNote(nb)}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <EyeIcon size={14} />
                    <span>Read Notebook ({nb.notebookName})</span>
                  </span>
                  <CaretRightIcon size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Clean PDF Reader Modal */}
      {activeNote && (
        <div className="modal-overlay" onClick={() => setActiveNote(null)}>
          <div className="modal-content" style={{ maxWidth: '880px', height: '85vh' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="noteful-badge" style={{ marginBottom: '0.2rem', display: 'inline-block' }}>
                  {activeNote.category} • PDF Blueprint
                </span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{activeNote.title}</h3>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <a
                  href={encodeURI(activeNote.fileUrl)}
                  download={activeNote.notebookName}
                  className="btn-clean-outline"
                  style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                >
                  <DownloadIcon size={13} />
                  <span>Download PDF</span>
                </a>

                <button className="icon-btn" onClick={() => setActiveNote(null)}>
                  <XIcon size={16} />
                </button>
              </div>
            </div>

            <div className="modal-body" style={{ padding: 0, height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#1e1e24' }}>
              <iframe
                src={encodeURI(activeNote.fileUrl)}
                title={activeNote.title}
                width="100%"
                height="100%"
                style={{ border: 'none', flex: 1, minHeight: '520px' }}
              />
            </div>

            <div className="modal-footer" style={{ justifyContent: 'space-between', fontSize: '0.775rem', color: 'var(--text-muted)' }}>
              <span>Digital Garden Notebook Reader ({activeNote.notebookName})</span>
              <span>Use scroll or touch gestures to turn notebook pages</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
