// Mirrors public/Jyothi_Prasanth_Resume.pdf (the owner's current resume, provided 2026-09-28).
// Keep the two in sync: when the PDF changes, update this file from it verbatim.

export const headline = 'AI Engineer | Generative AI | RAG & Multi-Agent Systems';
export const resumeLocation = 'Fremont, CA';

export const summary =
  'AI Engineer and Data Scientist building production-grade generative AI systems, multi-agent workflows, and retrieval infrastructure. Experienced in LangGraph orchestration, agentic retrieval-augmented generation (RAG), low-latency FastAPI services, automated evaluation, and cloud-native deployment. Delivers measurable gains in latency, faithfulness, model-call efficiency, and operational automation.';

export type Bullet = { lead?: string; text: string };

export type Role = {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: Bullet[];
};

export const experience: Role[] = [
  {
    role: 'Data Scientist (Generative AI)',
    company: 'Flexon Technologies, Inc. - Talent360.ai',
    location: 'Pleasanton, CA',
    period: 'Sep 2025 - Present',
    bullets: [
      {
        lead: 'Agentic architecture',
        text: 'Engineered an asynchronous five-node LangGraph workflow for support-ticket triage, with deterministic execution loops and self-correcting reflection nodes that cross-verify claims against retrieved sources.',
      },
      {
        lead: 'Latency and security',
        text: 'Built FastAPI middleware with automated personally identifiable information (PII) redaction using Regex/NER and Server-Sent Events token streaming to protect sensitive data and reduce time to first token.',
      },
      {
        lead: 'Retrieval optimization',
        text: 'Implemented hybrid dense-sparse retrieval with metadata pre-filtering on triage signals, reducing average downstream processing latency by 28%.',
      },
      {
        lead: 'Production guardrails',
        text: 'Instrumented LangSmith tracing and added Promptfoo regression gates to GitHub Actions deployment workflows.',
      },
    ],
  },
  {
    role: 'Data Science Intern',
    company: 'Ziontech Solutions, Inc.',
    location: 'Milpitas, CA',
    period: 'Feb 2025 - Aug 2025',
    bullets: [
      {
        lead: 'RAG pipelines',
        text: 'Redesigned ingestion for 10K+ security documents using recursive splitting and parent-document retrieval, increasing RAG faithfulness from 62% to 77% in internal validation.',
      },
      {
        lead: 'Token economics',
        text: 'Built a FastAPI semantic embedding cache that intercepted 38% of redundant upstream LLM calls; tuned similarity thresholds against offline validation sets.',
      },
      {
        lead: 'Evaluation infrastructure',
        text: 'Created an automated RAGAS harness tracking context recall, faithfulness, and answer relevance across 500+ stratified test queries.',
      },
    ],
  },
  {
    role: 'Machine Learning Researcher',
    company: 'Iowa State University',
    location: 'Ames, IA',
    period: 'Oct 2022 - Dec 2024',
    bullets: [
      {
        text: 'Built a Random Forest pipeline over 50K+ repository records to classify academic content into seven themes, improving accuracy 12% over baseline; added Sentence Transformer embeddings and FAISS validation for another 5% gain.',
      },
      {
        text: 'Containerized FastAPI classification services on AWS Lambda, automating metadata extraction and tagging while reducing manual curation overhead by 68%.',
      },
      { text: 'Translated model outputs and prediction trends into Tableau dashboards for 11+ enterprise department heads.' },
    ],
  },
  {
    role: 'Data Scientist',
    company: 'KB Technosoft Pvt. Ltd.',
    location: 'Chennai, India',
    period: 'May 2020 - Dec 2021',
    bullets: [
      {
        text: 'Developed an XGBoost prioritization framework across 80K+ financial records, driving a 9% lift in annual portfolio yield validated through a 90-day A/B test.',
      },
      { text: 'Standardized MLflow experiment tracking and code versioning, and deployed scalable REST APIs to internal systems.' },
    ],
  },
];

export const education = [
  {
    degree: 'MS, Computer Engineering',
    school: 'Iowa State University',
    location: 'Ames, IA',
    period: 'Jan 2022 - Dec 2024',
    note: 'GPA 3.78 / 4.0',
  },
  {
    degree: 'BTech, Information Technology',
    school: 'Anna University',
    location: 'Chennai, India',
    period: 'Aug 2016 - Mar 2020',
    note: 'GPA 3.2 / 4.0',
  },
];

export const tools: { group: string; items: string[] }[] = [
  {
    group: 'Generative AI and agents',
    items: ['Claude', 'Codex', 'LangGraph', 'Multi-Agent Orchestration', 'Agentic RAG', 'Tool/Function Calling', 'Model Context Protocol (MCP)', 'Token Context Pruning', 'Semantic Caching'],
  },
  {
    group: 'Retrieval and evaluation',
    items: ['Qdrant', 'Pinecone', 'FAISS (IVF-PQ, HNSW)', 'Hybrid Search', 'Parent-Document Retrieval', 'Cross-Encoder Reranking', 'RAGAS', 'Promptfoo', 'LangSmith', 'LLM-as-a-Judge'],
  },
  {
    group: 'AI/ML engineering',
    items: ['Python', 'SQL', 'PySpark', 'PyTorch', 'Hugging Face', 'Sentence Transformers', 'Scikit-Learn', 'FastAPI'],
  },
  {
    group: 'Cloud and MLOps',
    items: ['AWS (Lambda, SageMaker, DynamoDB, ECS, S3, EFS)', 'Docker', 'Databricks', 'MLflow', 'CI/CD', 'Feature Drift Monitoring'],
  },
];
