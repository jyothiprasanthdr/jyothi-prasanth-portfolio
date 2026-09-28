// Employer work is confidential by the owner's instruction (see PRODUCT.md). The bullets are kept
// here verbatim from the original resume but render nowhere until this flag is set to true.
export const showEmployerDetail = false;

export type Role = {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
};

export const experience: Role[] = [
  {
    role: 'Data Scientist (GenAI)',
    company: 'Flexon Technologies (Talent360.ai)',
    location: 'Pleasanton, CA',
    period: 'Sep 2025 – Present',
    bullets: [
      'Engineered an asynchronous, 5-node graph using LangGraph for support ticket triage, embedding deterministic execution loops and self-correcting reflection nodes to cross-verify claims against retrieved sources.',
      'Designed FastAPI middleware integrating automated PII redaction layers (Regex/NER) alongside Server-Sent Events (SSE) token streaming to protect data privacy and minimize Time-to-First-Token (TTFT).',
      'Implemented a hybrid dense-sparse retrieval workflow with metadata pre-filtering on triage signals, eliminating token noise and driving a 28% reduction in average downstream processing latency.',
      'Automated prompt evaluation loops by instrumenting LangSmith execution tracing and gating deployment workflows behind a Promptfoo regression testing suite in GitHub Actions.',
    ],
  },
  {
    role: 'Data Science Intern',
    company: 'Ziontech Solutions',
    location: 'Milpitas, CA',
    period: 'Feb 2025 – Aug 2025',
    bullets: [
      'Redesigned text ingestion workflows over a 10k+ security document corpus by replacing fixed-token chunking with recursive splitting and parent-document retrieval, elevating RAG faithfulness from 62% to 77%.',
      'Built a custom FastAPI semantic embedding cache that intercepted redundant upstream LLM calls by 38%, tuning similarity thresholds on validation sets to balance context cost against generation precision.',
      'Programmatically constructed an automated RAGAS evaluation harness tracking context recall, faithfulness, and answer relevance across 500+ stratified test queries as a quality gate.',
    ],
  },
  {
    role: 'Machine Learning Researcher',
    company: 'Iowa State University',
    location: 'Ames, IA',
    period: 'Oct 2022 – Dec 2024',
    bullets: [
      'Developed a Random Forest pipeline over a 50K+ repository dataset to automatically categorize unstructured academic content into 7 distinct research themes, boosting classification accuracy by 12%.',
      'Integrated a semantic validation layer utilizing Sentence-Transformer embeddings and FAISS indices to cross-reference text classifications and enable low-latency similarity lookups.',
      'Engineered and containerized text classification APIs using FastAPI on AWS Lambda, automating metadata extraction and category tagging across the repository while cutting manual curation by 68%.',
      'Designed Tableau visualization dashboards translating model outputs into structured insights for enterprise department heads.',
    ],
  },
  {
    role: 'Data Scientist',
    company: 'KB Technosoft',
    location: 'Chennai, India',
    period: 'May 2020 – Dec 2021',
    bullets: [
      'Developed an XGBoost prioritization framework across 80k+ financial records using specialized interaction features, driving a 9% lift in annual portfolio yield validated via a 90-day A/B test.',
      'Standardized model lifecycle management frameworks utilizing MLflow for unified experiment tracking, code versioning, and deploying scalable backend REST APIs.',
    ],
  },
];

export const education = [
  {
    degree: 'MS, Computer Engineering',
    school: 'Iowa State University',
    location: 'Ames, IA',
    period: 'Jan 2022 – Dec 2024',
    note: 'GPA 3.78 / 4.0 · Machine learning systems, distributed algorithms, NLP',
  },
  {
    degree: 'BTech, Information Technology',
    school: 'Anna University, Madras Institute of Technology',
    location: 'Chennai, India',
    period: 'Aug 2016 – Mar 2020',
    note: 'GPA 3.2 / 4.0',
  },
];

export const tools: { group: string; items: string[] }[] = [
  { group: 'Agents and LLMs', items: ['LangGraph', 'LangChain', 'MCP', 'PEFT / LoRA', 'Prompt evaluation (Promptfoo, LangSmith)'] },
  { group: 'Retrieval', items: ['RAG pipelines', 'FAISS', 'Qdrant', 'Sentence-Transformers', 'RAGAS'] },
  { group: 'Machine learning', items: ['PyTorch', 'TensorFlow', 'scikit-learn', 'XGBoost', 'pandas', 'NumPy'] },
  { group: 'Infrastructure', items: ['FastAPI', 'Docker', 'Kubernetes', 'AWS (SageMaker, Lambda, S3, ECS)', 'Airflow', 'MLflow', 'GitHub Actions'] },
];
