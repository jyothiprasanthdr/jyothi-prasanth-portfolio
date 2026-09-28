import React, { useRef, useEffect } from 'react';
import { BriefcaseIcon, GraduationCapIcon, DownloadIcon } from '@phosphor-icons/react';
import Reveal from './motion/Reveal';
import { gsap } from '../lib/gsap';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function ResumeTimeline({ experience, education, profile, showDownloadBtn = false }) {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const lines = gsap.utils.toArray(root.querySelectorAll('.resume-line'));
    if (lines.length === 0) return;

    if (reducedMotion) {
      gsap.set(lines, { scaleY: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      lines.forEach((line) => {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: line.closest('.resume-item'),
              start: 'top 85%',
              end: 'bottom 70%',
              scrub: 0.5,
            },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section className="section-spacing" ref={sectionRef}>
      <div className="section-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 className="section-title">Professional Experience & Education</h2>
          <p className="section-subtitle">
            3+ years engineering Generative AI state machines, RAG infrastructure, and production ML pipelines.
          </p>
        </div>

        {showDownloadBtn && (
          <a href={profile.resumePdfUrl} download="Jyothi_Prasanth_Resume.pdf" className="btn-clean-primary" style={{ fontSize: '0.825rem' }}>
            <DownloadIcon size={14} />
            <span>Download Resume (PDF)</span>
          </a>
        )}
      </div>

      {/* Experience Section */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', color: 'var(--text-secondary)' }}>
          <BriefcaseIcon size={16} />
          <h3 style={{ fontSize: '1rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Work Experience
          </h3>
        </div>

        <div className="resume-timeline">
          <Reveal as="div" className="resume-item">
            <div className="resume-line"></div>
            <div className="resume-dot"></div>
            <h4 className="resume-role">Data Scientist (GenAI)</h4>
            <div className="resume-meta">
              <strong>Flexon Technologies, Inc (Talent360.ai)</strong> • Pleasanton, CA (Sep 2025 – Present)
            </div>
            <ul className="resume-bullets">
              <li>Engineered an asynchronous, <strong>5-node graph using LangGraph</strong> for support ticket triage, embedding deterministic execution loops and self-correcting reflection nodes to cross-verify claims against retrieved sources.</li>
              <li>Designed <strong>FastAPI middleware</strong> integrating automated PII redaction layers (Regex/NER) alongside Server-Sent Events (SSE) token streaming to protect data privacy and minimize Time-to-First-Token (TTFT).</li>
              <li>Implemented a hybrid dense-sparse retrieval workflow with metadata pre-filtering on triage signals, eliminating token noise and driving a <strong>28% reduction in average downstream processing latency</strong>.</li>
              <li>Automated prompt evaluation loops by instrumenting <strong>LangSmith execution tracing</strong> and gating deployment workflows behind a <strong>Promptfoo regression testing suite</strong> in GitHub Actions.</li>
            </ul>
          </Reveal>

          <Reveal as="div" className="resume-item">
            <div className="resume-line"></div>
            <div className="resume-dot"></div>
            <h4 className="resume-role">Data Science Intern</h4>
            <div className="resume-meta">
              <strong>Ziontech Solutions, Inc</strong> • Milpitas, CA (Feb 2025 – Aug 2025)
            </div>
            <ul className="resume-bullets">
              <li>Redesigned text ingestion workflows over a <strong>10k+ security document corpus</strong> by replacing fixed-token chunking with recursive splitting and parent-document retrieval, <strong>elevating RAG faithfulness from 62% to 77%</strong>.</li>
              <li>Built a custom FastAPI semantic embedding cache that <strong>intercepted redundant upstream LLM calls by 38%</strong>, tuning similarity thresholds on validation sets to balance context cost against generation precision.</li>
              <li>Programmatically constructed an automated <strong>RAGAS evaluation harness</strong> tracking context recall, faithfulness, and answer relevance across 500+ stratified test queries as a quality gate.</li>
            </ul>
          </Reveal>

          <Reveal as="div" className="resume-item">
            <div className="resume-line"></div>
            <div className="resume-dot"></div>
            <h4 className="resume-role">Machine Learning Researcher</h4>
            <div className="resume-meta">
              <strong>Iowa State University</strong> • Ames, IA (Oct 2022 – Dec 2024)
            </div>
            <ul className="resume-bullets">
              <li>Developed a Random Forest pipeline over a <strong>50K+ repository dataset</strong> to automatically categorize unstructured academic content into 7 distinct research themes, <strong>boosting classification accuracy by 12%</strong>.</li>
              <li>Integrated a semantic validation layer utilizing <strong>Sentence-Transformer embeddings and FAISS indices</strong> to cross-reference text classifications and enable low-latency similarity lookups.</li>
              <li>Engineered and containerized text classification APIs using <strong>FastAPI on AWS Lambda</strong>, automating metadata extraction and category tagging across the repository while <strong>cutting manual curation by 68%</strong>.</li>
              <li>Designed Tableau visualization dashboards translating model outputs into structured insights for enterprise department heads.</li>
            </ul>
          </Reveal>

          <Reveal as="div" className="resume-item">
            <div className="resume-line"></div>
            <div className="resume-dot"></div>
            <h4 className="resume-role">Data Scientist</h4>
            <div className="resume-meta">
              <strong>KB Technosoft Pvt Ltd</strong> • Chennai, India (May 2020 – Dec 2021)
            </div>
            <ul className="resume-bullets">
              <li>Developed an XGBoost prioritization framework across <strong>80k+ financial records</strong> using specialized interaction features, driving a <strong>9% lift in annual portfolio yield</strong> validated via a 90-day A/B test.</li>
              <li>Standardized model lifecycle management frameworks utilizing <strong>MLflow</strong> for unified experiment tracking, code versioning, and deploying scalable backend REST APIs.</li>
            </ul>
          </Reveal>
        </div>
      </div>

      {/* Education Section */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', color: 'var(--text-secondary)' }}>
          <GraduationCapIcon size={16} />
          <h3 style={{ fontSize: '1rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Education
          </h3>
        </div>

        <div className="resume-timeline">
          {education.map((edu, idx) => (
            <Reveal as="div" key={idx} className="resume-item">
              <div className="resume-line"></div>
              <div className="resume-dot"></div>
              <h4 className="resume-role">{edu.degree}</h4>
              <div className="resume-meta">
                <strong>{edu.institution}</strong> • {edu.location} ({edu.period}) {edu.gpa && `• GPA: ${edu.gpa}`}
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {edu.highlights}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
