/**
 * The original hard-coded portfolio entries, kept only as one-time seed data.
 *
 * These used to be merged into the live list at render time, which meant the
 * admin panel could neither edit nor delete them. They are now pushed into
 * Firestore once (via the "Seed starter projects" action in the admin panel)
 * and managed like any other project from then on.
 */
export type SeedProject = {
  title: string;
  description: string;
  details: string[];
  tech: string[];
  order: number;
};

export const seedProjects: SeedProject[] = [
  {
    title: "Federated Sentiment Analysis",
    description:
      "Streaming sentiment intelligence across social platforms with distributed processing pipelines.",
    details: [
      "Built a real-time sentiment pipeline on live Reddit streams.",
      "Integrated Apache Kafka and Apache Flink for low-latency event processing.",
      "Containerized services with Docker and deployed the stack on Google Cloud Platform.",
    ],
    tech: ["Python", "Apache Kafka", "Apache Flink", "Docker", "GCP"],
    order: 1,
  },
  {
    title: "Understanding V in Multi-Modal Language Models",
    description:
      "Researching visual reasoning quality in multi-modal language models for VQA benchmarks.",
    details: [
      "Studied visual grounding behavior in multimodal language architectures.",
      "Trained a visual-language system using BERT and BEiT backbones.",
      "Created a custom COCO-based Q&A dataset with GPT-assisted annotations.",
      "Evaluated model quality on Visual Question Answering tasks.",
    ],
    tech: ["Python", "PyTorch", "BERT", "BEiT", "GPT-4.1"],
    order: 2,
  },
  {
    title: "Debiasing the TextVQA Dataset",
    description:
      "Improving fairness and robustness in TextVQA through dataset-level debiasing strategies.",
    details: [
      "Designed a debiasing framework to reduce shortcut learning in TextVQA.",
      "Integrated external datasets to improve generalization beyond narrow priors.",
      "Used VQA distributions as a normalization baseline for bias mitigation.",
    ],
    tech: ["Python", "PyTorch", "Computer Vision", "NLP"],
    order: 3,
  },
];
