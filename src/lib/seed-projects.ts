/**
 * The original hard-coded portfolio entries, kept only as one-time seed data.
 *
 * These used to be merged into the live list at render time, which meant the
 * admin panel could neither edit nor delete them. They are now pushed into
 * Firestore once (via the "Seed starter projects" action in the admin panel)
 * and managed like any other project from then on.
 *
 * The case-study beats are deliberately left blank: those need Anirudh's own
 * account of what broke and what it cost, and inventing them would put words —
 * and numbers — in his mouth.
 */
export type SeedProject = {
  title: string;
  episodeTitle: string;
  description: string;
  details: string[];
  tech: string[];
  guestStarring: string;
  order: number;
};

export const seedProjects: SeedProject[] = [
  {
    title: "Federated Sentiment Analysis",
    episodeTitle: "The One Where Reddit Wouldn't Shut Up",
    description:
      "A streaming sentiment pipeline that keeps pace with live Reddit traffic instead of collapsing under it.",
    details: [
      "Built a real-time sentiment pipeline on live Reddit streams.",
      "Integrated Apache Kafka and Apache Flink for low-latency event processing.",
      "Containerized services with Docker and deployed the stack on Google Cloud Platform.",
    ],
    tech: ["Python", "Apache Kafka", "Apache Flink", "Docker", "GCP"],
    guestStarring: "Apache Kafka",
    order: 1,
  },
  {
    title: "Understanding V in Multi-Modal Language Models",
    episodeTitle: "The One Where The Model Learned To Look",
    description:
      "Probing how much a multimodal model actually sees, versus how much it quietly guesses from the text.",
    details: [
      "Studied visual grounding behavior in multimodal language architectures.",
      "Trained a visual-language system using BERT and BEiT backbones.",
      "Created a custom COCO-based Q&A dataset with GPT-assisted annotations.",
      "Evaluated model quality on Visual Question Answering tasks.",
    ],
    tech: ["Python", "PyTorch", "BERT", "BEiT", "GPT-4.1"],
    guestStarring: "BEiT",
    order: 2,
  },
  {
    title: "Debiasing the TextVQA Dataset",
    episodeTitle: "The One With The Biased Dataset",
    description:
      "Closing the shortcuts a model can take, so the score reflects reasoning rather than dataset priors.",
    details: [
      "Designed a debiasing framework to reduce shortcut learning in TextVQA.",
      "Integrated external datasets to improve generalization beyond narrow priors.",
      "Used VQA distributions as a normalization baseline for bias mitigation.",
    ],
    tech: ["Python", "PyTorch", "Computer Vision", "NLP"],
    guestStarring: "TextVQA",
    order: 3,
  },
];
