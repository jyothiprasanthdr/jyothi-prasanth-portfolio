import React, { useState, useEffect, useRef } from 'react';
import { CalendarIcon } from '@phosphor-icons/react';
import { gsap } from '../lib/gsap';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function LeetCodeHeatmap({ leetcode }) {
  const [selectedYear, setSelectedYear] = useState(2026);
  const [activeTheme, setActiveTheme] = useState('39d353'); // Official GitHub Emerald Green
  const gridRef = useRef(null);
  const reducedMotion = useReducedMotion();

  // Stagger the cells in once, the first time the grid scrolls into view.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cells = grid.querySelectorAll('.heatmap-cell');
    if (cells.length === 0) return;

    if (reducedMotion) {
      gsap.set(cells, { opacity: 1, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(cells, { opacity: 0, scale: 0.6 });
      gsap.to(cells, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        stagger: { each: 0.003, from: 'start' },
        ease: 'power1.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, grid);

    return () => ctx.revert();
  }, [reducedMotion]);

  const [apiStats, setApiStats] = useState({
    totalSolved: leetcode.totalSolved,
    easy: leetcode.easy,
    medium: leetcode.medium,
    hard: leetcode.hard
  });

  // Query live official LeetCode GraphQL API for user jpdr98
  useEffect(() => {
    fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query userPublicProfile($username: String!) {
            matchedUser(username: $username) {
              username
              submitStats: submitStatsGlobal {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
            }
          }
        `,
        variables: { username: leetcode.username }
      })
    })
      .then((res) => res.json())
      .then((data) => {
        const stats = data?.data?.matchedUser?.submitStats?.acSubmissionNum;
        if (stats && Array.isArray(stats)) {
          const total = stats.find((s) => s.difficulty === 'All')?.count || leetcode.totalSolved;
          const easy = stats.find((s) => s.difficulty === 'Easy')?.count || leetcode.easy;
          const medium = stats.find((s) => s.difficulty === 'Medium')?.count || leetcode.medium;
          const hard = stats.find((s) => s.difficulty === 'Hard')?.count || leetcode.hard;
          setApiStats({ totalSolved: total, easy, medium, hard });
        }
      })
      .catch((err) => {
        console.log('Using verified stats fallback:', err);
      });
  }, [leetcode.username]);

  const themes = [
    { label: 'GitHub Emerald Green', hex: '39d353' },
    { label: 'Cyan', hex: '06b6d4' },
    { label: 'Indigo', hex: '6366f1' },
    { label: 'Monochrome', hex: '888888' },
  ];

  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const yearData = leetcode.yearlyData[selectedYear] || leetcode.yearlyData[2026];

  // Helper to color squares based on activity intensity
  const getSquareColor = (count) => {
    if (count === 0) return 'var(--heatmap-level-0)';
    if (activeTheme === '06b6d4') {
      return count === 1 ? '#a5f3fc' : '#06b6d4';
    }
    if (activeTheme === '6366f1') {
      return count === 1 ? '#c7d2fe' : '#6366f1';
    }
    if (activeTheme === '888888') {
      return count === 1 ? '#d4d4d8' : '#71717a';
    }
    // Default GitHub Emerald Green
    return count === 1 ? '#9be9a8' : '#39d353';
  };

  return (
    <section className="section-spacing">
      <div className="section-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 className="section-title">LeetCode & GitHub Activity Tracker</h2>
            <p className="section-subtitle">
              Verified live problem solving metrics synced with official LeetCode GraphQL API.
            </p>
          </div>

          {/* Year Filters */}
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {leetcode.availableYears.map((year) => (
              <button
                key={year}
                className="tag-badge"
                style={{
                  cursor: 'pointer',
                  borderColor: selectedYear === year ? 'var(--border-active)' : 'var(--border-color)',
                  backgroundColor: selectedYear === year ? 'var(--text-primary)' : 'var(--accent-badge-bg)',
                  color: selectedYear === year ? 'var(--bg-primary)' : 'var(--text-primary)',
                  fontWeight: selectedYear === year ? '600' : '400',
                }}
                onClick={() => setSelectedYear(year)}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Badges Row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
          <span>{apiStats.totalSolved}</span>
          <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-muted)' }}>problems solved</span>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <span className="tag-badge" style={{ backgroundColor: 'rgba(34, 197, 94, 0.12)', color: '#22c55e', borderColor: 'rgba(34, 197, 94, 0.3)' }}>
            Easy: {apiStats.easy}
          </span>
          <span className="tag-badge" style={{ backgroundColor: 'rgba(234, 179, 8, 0.12)', color: '#eab308', borderColor: 'rgba(234, 179, 8, 0.3)' }}>
            Medium: {apiStats.medium}
          </span>
          <span className="tag-badge" style={{ backgroundColor: 'rgba(239, 68, 68, 0.12)', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
            Hard: {apiStats.hard}
          </span>
        </div>
      </div>

      {/* Official GitHub Calendar Layout */}
      <div className="clean-card" style={{ padding: '1.25rem', marginBottom: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <CalendarIcon size={14} style={{ flexShrink: 0 }} />
            <span>{selectedYear} Contribution Activity ({yearData.totalSubmissions} submissions)</span>
          </div>

          <div style={{ display: 'flex', gap: '0.35rem' }}>
            {themes.map((t) => (
              <button
                key={t.hex}
                onClick={() => setActiveTheme(t.hex)}
                className="tag-badge"
                style={{
                  fontSize: '0.7rem',
                  cursor: 'pointer',
                  borderColor: activeTheme === t.hex ? 'var(--border-active)' : 'var(--border-color)',
                  backgroundColor: activeTheme === t.hex ? 'var(--text-primary)' : 'transparent',
                  color: activeTheme === t.hex ? 'var(--bg-primary)' : 'var(--text-muted)'
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Heatmap with Month & Day Labels */}
        <div style={{ overflowX: 'auto', padding: '0.5rem 0' }}>
          <div style={{ minWidth: '720px', margin: '0 auto' }}>
            {/* Month Labels Header */}
            <div style={{ display: 'flex', paddingLeft: '28px', marginBottom: '6px', fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              {monthLabels.map((m, idx) => (
                <div key={m} style={{ flex: 1, textAlign: 'left' }}>
                  {m}
                </div>
              ))}
            </div>

            {/* Grid with Day Labels */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {/* Day Labels Column */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '80px', fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', width: '22px' }}>
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
              </div>

              {/* 52-Week Squares Container */}
              <div ref={gridRef} style={{ display: 'flex', gap: '3px', flex: 1, justifyContent: 'space-between' }}>
                {yearData.weeks.map((week, wIdx) => (
                  <div key={wIdx} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    {week.map((day, dIdx) => (
                      <div
                        key={dIdx}
                        className="heatmap-cell"
                        title={`${day.date}: ${day.count} submissions`}
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '2px',
                          backgroundColor: getSquareColor(day.count),
                          transition: 'background-color 0.15s ease'
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend Bar at Bottom Right */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.4rem', marginTop: '0.85rem', fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              <span>Less</span>
              <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: 'var(--heatmap-level-0)' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: getSquareColor(1) }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: getSquareColor(2) }} />
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
