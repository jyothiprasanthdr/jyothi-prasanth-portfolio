import React from 'react';
import { CpuIcon, BrainIcon, HardDrivesIcon, CodeIcon } from '@phosphor-icons/react';
import Reveal from './motion/Reveal';
import { useTilt } from '../hooks/useTilt';

function TechSkillCard({ cat, delay }) {
  const IconComp = cat.icon;
  const tiltRef = useTilt();

  return (
    <Reveal ref={tiltRef} as="div" className="clean-card tech-skill-card" delay={delay}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
        <IconComp size={16} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />
        <h3 style={{ fontSize: '0.925rem', fontWeight: 600 }}>{cat.title}</h3>
      </div>

      <div className="tag-list" style={{ margin: 0 }}>
        {cat.skills.map((skill) => (
          <span key={skill} className="tag-badge" style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}>
            {skill}
          </span>
        ))}
      </div>
    </Reveal>
  );
}

export default function TechSkills() {
  const skillCategories = [
    {
      title: "Generative AI & Agentic Systems",
      icon: CpuIcon,
      skills: [
        "LangGraph",
        "LangChain",
        "Multi-Agent State Machines",
        "RAG Infrastructure",
        "Parent-Document Retrieval",
        "Vector Search (FAISS, Qdrant)",
        "RAGAS Evaluation",
        "Promptfoo",
        "PEFT / LoRA",
        "MCP Protocol"
      ]
    },
    {
      title: "Machine Learning & Data Science",
      icon: BrainIcon,
      skills: [
        "Python",
        "PyTorch",
        "TensorFlow",
        "Scikit-Learn",
        "XGBoost",
        "Random Forest",
        "Sentence-Transformers",
        "pandas / NumPy",
        "Statistical Modeling",
        "Tableau"
      ]
    },
    {
      title: "MLOps & Cloud Infrastructure",
      icon: HardDrivesIcon,
      skills: [
        "FastAPI",
        "Docker",
        "Kubernetes",
        "AWS (SageMaker, Lambda, S3, ECS)",
        "Apache Airflow",
        "MLflow",
        "Server-Sent Events (SSE)",
        "LangSmith Tracing",
        "PII Redaction Middleware"
      ]
    },
    {
      title: "Core Engineering & CS",
      icon: CodeIcon,
      skills: [
        "Data Structures & Algorithms",
        "System Design",
        "Git & GitHub Actions",
        "REST APIs",
        "Linux Systems",
        "A/B Testing"
      ]
    }
  ];

  return (
    <section className="section-spacing">
      <div className="section-header">
        <h2 className="section-title">Technical Skills & Domain Expertise</h2>
        <p className="section-subtitle">
          Core competencies across Generative AI engineering, machine learning pipelines, and MLOps infrastructure.
        </p>
      </div>

      <div className="tech-skills-grid">
        {skillCategories.map((cat, idx) => (
          <TechSkillCard key={idx} cat={cat} delay={idx * 0.06} />
        ))}
      </div>
    </section>
  );
}
