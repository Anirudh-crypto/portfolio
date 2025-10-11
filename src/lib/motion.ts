export const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export const slideUp = {
  hidden: { opacity: 0, y: 80 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } },
};
