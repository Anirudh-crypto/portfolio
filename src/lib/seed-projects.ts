/**
 * The original hard-coded portfolio entries, kept as seed and backfill data.
 *
 * These used to be merged into the live list at render time, which meant the
 * admin panel could neither edit nor delete them. They are now pushed into
 * Firestore — via "Seed starter projects" on an empty collection, or
 * "Backfill episode copy" for documents that already exist — and managed like
 * any other project from then on.
 *
 * ────────────────────────────────────────────────────────────────────────
 * THE CASE-STUDY BEATS BELOW ARE DRAFTS.
 *
 * They are written from the project descriptions and CV to give each page a
 * working shape, not from knowledge of what actually happened. The `twist`
 * beat in particular is a placeholder: it asks the question rather than
 * answering it, because the real answer is a specific failure only Anirudh
 * witnessed, and inventing one would be worse than leaving it visibly unwritten.
 *
 * Every metric is a bracketed placeholder for the same reason — no latency,
 * throughput or accuracy figure here is real. Edit these in the admin panel;
 * backfill will never overwrite what you have written.
 * ────────────────────────────────────────────────────────────────────────
 */
export type SeedProject = {
  title: string;
  episodeTitle: string;
  description: string;
  details: string[];
  tech: string[];
  guestStarring: string;
  runtime?: string;
  coldOpen?: string;
  plot?: string;
  twist?: string;
  finale?: string;
  metrics?: string[];
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
    runtime: "[DRAFT — how long did this take?]",
    coldOpen:
      "Reddit does not slow down so your model can catch up. A batch job tells you what people felt yesterday, which is useless if the question is what they feel right now. The hard part was never the sentiment model — it was everything around it: absorbing bursty traffic, holding ordering guarantees, and keeping inference off the critical path of ingest.",
    plot:
      "Live comments land in Kafka, which absorbs the spikes and decouples ingest from processing. Apache Flink handles the windowed aggregation and runs sentiment inference per event, so results emerge continuously rather than in a nightly batch. Every service is containerised with Docker and deployed on Google Cloud Platform, letting the processing layer scale independently of ingest.",
    twist:
      "[DRAFT — replace this. What actually broke that you did not expect? Backpressure once a burst outran the consumers, a skewed partition key that left one worker doing most of the work, a windowing assumption that only failed under load? Name the failure, then the change that fixed it. This is the beat a reviewer reads most carefully, because it is the one showing judgement rather than tool choice.]",
    finale:
      "An end-to-end pipeline that processes live social streams continuously, with ingest and processing scaling separately. [DRAFT — add the outcome you actually measured: sustained throughput, end-to-end latency, or cost per million events.]",
    metrics: [
      "Ingest: Reddit live stream",
      "Throughput: [EVENTS / SEC]",
      "Window: [WINDOW SIZE]",
      "Deployed on: GCP · Docker",
    ],
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
    runtime: "[DRAFT — how long did this take?]",
    coldOpen:
      "A multimodal model that scores well on Visual Question Answering has not necessarily looked at the image. Language priors alone carry a surprising number of questions — ask what colour the banana is and the text model already knows. So a good benchmark score cannot distinguish a model that sees from one that guesses well.",
    plot:
      "Paired a BERT text encoder with a BEiT vision backbone and trained the combined system on a custom COCO-derived question-and-answer set, built with GPT-assisted annotation so the questions could be targeted rather than generic. Evaluating on VQA then measured how much the visual pathway was contributing, rather than how well the model scored overall.",
    twist:
      "[DRAFT — replace this. What surprised you about where the model was actually getting its answers? A question category it aced without the image, an annotation artefact GPT introduced, a backbone that underperformed where you expected it to win?]",
    finale:
      "A setup that separates genuine visual grounding from language-prior guessing on VQA. [DRAFT — what did you conclude, and what would you change about the approach now?]",
    metrics: [
      "Backbones: BERT + BEiT",
      "Dataset: COCO-derived Q&A",
      "Task: Visual Question Answering",
      "Eval result: [YOUR NUMBER]",
    ],
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
    runtime: "[DRAFT — how long did this take?]",
    coldOpen:
      "When a dataset's answer distribution is skewed, a model can score well by learning the skew instead of the task. On TextVQA that means reading the question, ignoring the image, and betting on the most common answer. The benchmark rewards it, which makes the number worse than useless — it is actively misleading.",
    plot:
      "Built a debiasing framework that treats the answer distribution as the thing to correct for, using VQA distributions as a normalisation baseline and pulling in external datasets to widen the priors the model is exposed to. The goal was a score that moves only when reasoning improves.",
    twist:
      "[DRAFT — replace this. What went wrong when you debiased? Did accuracy drop in a way that was actually correct, did a new bias replace the old one, or did the external data introduce a distribution shift of its own?]",
    finale:
      "A framework that reduces shortcut learning on TextVQA and reports a score more closely tied to reasoning. [DRAFT — how much did measured bias fall, and what did that cost in raw accuracy?]",
    metrics: [
      "Baseline: VQA distributions",
      "Bias reduction: [YOUR NUMBER]",
      "Accuracy delta: [YOUR NUMBER]",
      "Domain: Computer Vision · NLP",
    ],
    order: 3,
  },
];
