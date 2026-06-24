export type Project = {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  image?: string;
  github?: string;
  live?: string;
  status: 'live' | 'wip' | 'archived';
  size?: 'large' | 'wide' | 'medium' | 'small';
  year: string;
  accentColor?: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Agri-Commodity Price Predictor",
    description: "Built an ML system forecasting prices of key crops (rice, wheat, onion) by collecting and cleaning large datasets from government portals (data.gov.in, Agmarknet) and comparing Linear Regression, Random Forest, and LSTM models to identify the most accurate predictor ,Executed functional testing on prediction API endpoints using Postman; validated model accuracy across datasets and verified dashboard output consistency across browsers, Developed a Flask backend API serving predictions, integrated with an HTML/CSS/JS web dashboard for interactive data visualisation.",
    tags: ["Python", "Machine Learning", "LSTM", "Random Forest"],
    image: "/agri-price.png", 
    github: "https://github.com/anubhavy-05/agri-price-prediction",
    status: "wip",
    size: "large",
    year: "2026",
    accentColor: "#06b6d4"
  },
  {
    id: 2,
    title: "OpportuAI",
    description: "A collaborative career-focused AI copilot platform featuring a structured workflow for multi-user contribution management.",
    tags: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    image: "/opportuai.png",
    github: "https://github.com/anubhavy-05/OpportuAI",
    status: "wip",
    size: "wide",
    year: "2026",
    accentColor: "#06b6d4"
  },
  {
    id: 3,
    title: "AI Virtual Mouse",
    description: "A computer vision application that enables touchless cursor control and clicking actions through hand landmark tracking and gesture recognition.",
    tags: ["Python", "MediaPipe", "OpenCV"],
    image: "/virtual-mouse.png",
    github: "https://github.com/anubhavy-05/AI-VIRTUAL-MOUSE",
    status: "live",
    size: "medium",
    year: "2026",
    accentColor: "#06b6d4"
  },
  {
    id: 4,
    title: "Prakalp-Swasthya",
    description: "A comprehensive healthcare resource directory for the Lucknow region, providing structured data on medical stores and health infrastructure.",
    tags: ["Django", "React", "PostgreSQL", "Tailwind"],
    image: "/prakalp.png",
    github: "https://github.com/anubhavy-05/Prakalp-Swasthya",
    status: "wip",
    size: "medium",
    year: "2025"
  },
  {
    id: 5,
    title: "Web Games Collection",
    description: "A collection of interactive browser games built with vanilla HTML, CSS, and JavaScript. All games run offline with no dependencies.",
    tags: ["HTML5", "CSS3", "JavaScript", "Canvas API"],
    image: "/webgames.png",
    github: "https://github.com/anubhavy-05/web-games",
    live: "https://web-games-collections.onrender.com",
    status: "live",
    size: "wide",
    year: "2025"
  }
];