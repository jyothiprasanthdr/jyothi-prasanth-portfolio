import React, { useState, useEffect } from 'react';
import { Search, Plus, Tag, Clock, Calendar, X, Edit3, BookOpen } from 'lucide-react';
import { marked } from 'marked';

export default function NotefulNotes({ initialNotes }) {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('noteful_notes_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialNotes;
      }
    }
    return initialNotes;
  });

  const [selectedNote, setSelectedNote] = useState(notes[0] || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State for Adding New Note
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteTags, setNewNoteTags] = useState('LangGraph, GenAI');
  const [newNoteSummary, setNewNoteSummary] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  useEffect(() => {
    localStorage.setItem('noteful_notes_data', JSON.stringify(notes));
  }, [notes]);

  const allTags = ['All', ...new Set(notes.flatMap((n) => n.tags))];

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTag = selectedTag === 'All' || note.tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  const handleAddNoteSubmit = (e) => {
    e.preventDefault();
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return;

    const parsedTags = newNoteTags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const newNote = {
      id: `note-${Date.now()}`,
      title: newNoteTitle.trim(),
      date: new Date().toISOString().split('T')[0],
      readTime: `${Math.max(1, Math.ceil(newNoteContent.split(' ').length / 150))} min read`,
      tags: parsedTags.length ? parsedTags : ['General'],
      summary: newNoteSummary.trim() || newNoteTitle.trim(),
      content: newNoteContent,
    };

    const updated = [newNote, ...notes];
    setNotes(updated);
    setSelectedNote(newNote);
    setIsAddModalOpen(false);

    // Reset Form
    setNewNoteTitle('');
    setNewNoteSummary('');
    setNewNoteContent('');
  };

  return (
    <section>
      <div className="section-header">
        <div>
          <h2 className="section-title">Noteful Notes — Digital Garden</h2>
          <p className="section-subtitle">
            Continuous engineering notes, system design blueprints, and research takeaways. Auto-updated repository.
          </p>
        </div>

        <button className="btn-primary" onClick={() => setIsAddModalOpen(true)}>
          <Plus size={16} />
          <span>Add New Note</span>
        </button>
      </div>

      <div className="notes-controls">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search notes by keyword, topic, or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="tag-list">
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`tag-badge ${selectedTag === tag ? 'active' : ''}`}
              onClick={() => setSelectedTag(tag)}
              style={{
                cursor: 'pointer',
                borderColor: selectedTag === tag ? 'var(--border-active)' : 'var(--border-color)',
                backgroundColor: selectedTag === tag ? 'var(--accent-primary)' : 'var(--accent-badge-bg)',
                color: selectedTag === tag ? 'var(--text-inverse)' : 'var(--accent-badge-text)',
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="notes-layout">
        <div className="notes-sidebar">
          {filteredNotes.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              No notes found matching your criteria.
            </div>
          ) : (
            filteredNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => setSelectedNote(note)}
                className={`note-item ${selectedNote?.id === note.id ? 'active' : ''}`}
              >
                <div className="note-item-title">{note.title}</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {note.summary}
                </p>
                <div className="note-item-meta">
                  <span>
                    <Calendar size={12} style={{ display: 'inline', marginRight: '3px' }} />
                    {note.date}
                  </span>
                  <span>
                    <Clock size={12} style={{ display: 'inline', marginRight: '3px' }} />
                    {note.readTime}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        <div>
          {selectedNote ? (
            <div className="note-reader">
              <div className="note-reader-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  {selectedNote.tags.map((t) => (
                    <span key={t} className="tag-badge">
                      #{t}
                    </span>
                  ))}
                </div>

                <h1 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                  {selectedNote.title}
                </h1>

                <div className="note-item-meta">
                  <span>Published: {selectedNote.date}</span>
                  <span>Estimate: {selectedNote.readTime}</span>
                </div>
              </div>

              <div
                className="markdown-body"
                dangerouslySetInnerHTML={{ __html: marked.parse(selectedNote.content || '') }}
              />
            </div>
          ) : (
            <div className="note-reader" style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)' }}>
              <BookOpen size={32} style={{ marginBottom: '0.5rem' }} />
              <p>Select a note from the sidebar to begin reading.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add New Note Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.1rem' }}>Add New Note to Digital Garden</h3>
              <button className="icon-btn" onClick={() => setIsAddModalOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddNoteSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Note Title</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Model Context Protocol (MCP) Middleware Implementation"
                    value={newNoteTitle}
                    onChange={(e) => setNewNoteTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Tags (comma separated)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. LangGraph, AgenticRAG, FastAPI"
                    value={newNoteTags}
                    onChange={(e) => setNewNoteTags(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Summary / Key Takeaway</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Brief 1-line overview of what this note covers"
                    value={newNoteSummary}
                    onChange={(e) => setNewNoteSummary(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Note Body (Markdown supported)</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Write your technical notes here using Markdown..."
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <Plus size={16} />
                  <span>Publish Note</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
