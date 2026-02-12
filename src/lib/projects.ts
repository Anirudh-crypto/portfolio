export type PortfolioProject = {
  title: string;
  description: string;
  details: string[];
  tech: string[];
  link?: string;
};

export const portfolioProjects: PortfolioProject[] = [
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
  },
];
