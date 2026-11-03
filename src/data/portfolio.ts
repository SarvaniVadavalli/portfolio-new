export interface SkillGroup {
  name: string;
  items: string[];
}

export interface Project {
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  tags: [string, string];
  link: string; // Placeholder or live link
  repo?: string; // Placeholder or repo link
  isPlaceholderLink?: boolean;
}

export interface Achievement {
  title: string;
  category: "hackathon" | "certification" | "award";
  description?: string;
  date?: string; // Kept editable, not invented
  credentialId?: string;
}

export interface PortfolioData {
  name: string;
  shortName: string;
  role: string;
  terminalPath: string;
  headline: string;
  subheading: string;
  codeCardSubtext: string;
  landingButtons: {
    primaryText: string;
    primaryHref: string;
    secondaryText: string;
    secondaryHref: string;
  };
  codeCard: {
    studying: string;
    building: string;
    lookingFor: string;
  };
  contact: {
    email: string;
    phone?: string;
    github: string;
    githubHandle: string;
    linkedin: string;
    leetcode: string;
    leetcodeHandle: string;
    resumeUrl: string;
  };
  education: {
    degree: string;
    field: string;
    specialization: string;
    university: string;
    graduationYear: number;
    cgpa: {
      value: number;
      needsConfirmation: boolean;
    };
  };
  about: {
    paragraphs: string[];
    factTags: string[];
    photoUrl: string;
  };
  skills: SkillGroup[];
  projects: Project[];
  achievements: Achievement[];
  statsSnapshot: {
    github: {
      contributionsLastYear: number;
      repos: number;
      dayStreak: number;
      seed: number;
    };
    leetcode: {
      submissionsLastYear: number;
      solved: number;
      easy: number;
      medium: number;
      hard: number;
      seed: number;
    };
  };
}

export const portfolioData: PortfolioData = {
  name: "Sarvani Vadavalli",
  shortName: "Sarvani",
  role: "Software Engineering & AI/ML Student",
  terminalPath: "~/sarvani/developer",
  headline: "Hi, I'm Sarvani.",
  subheading:
    "From building applications to exploring intelligent systems, I enjoy turning curiosity into practical solutions. I'm looking for opportunities to learn, contribute, and grow through real-world engineering.",
  codeCardSubtext: "B.Tech CSE · AI & ML · 2028",
  landingButtons: {
    primaryText: "Resume →",
    primaryHref: "/resume.pdf",
    secondaryText: "See my projects",
    secondaryHref: "#projects",
  },
  codeCard: {
    studying: "Software engineering and AI",
    building: "Things people actually use",
    lookingFor: "An internship",
  },
  contact: {
    email: "sarvanikutti@gmail.com",
    phone: "+91 9121352364",
    github: "https://github.com/SarvaniVadavalli",
    githubHandle: "@SarvaniVadavalli",
    linkedin: "https://www.linkedin.com/in/sarvani-vadavalli",
    leetcode: "https://leetcode.com/u/Sarvani_Vadavalli/",
    leetcodeHandle: "@Sarvani_Vadavalli",
    resumeUrl: "/resume.pdf",
  },
  education: {
    degree: "B.Tech",
    field: "Computer Science and Engineering",
    specialization: "Artificial Intelligence and Machine Learning",
    university: "SRM University–AP",
    graduationYear: 2028,
    cgpa: {
      value: 9.11,
      needsConfirmation: false,
    },
  },
  about: {
    paragraphs: [
      "I'm Sarvani — a developer driven by curiosity, experimentation, and the excitement of turning ideas into something real.",
      "Currently pursuing Computer Science with a specialization in AI & ML, I enjoy exploring different dimensions of technology — from crafting full-stack applications and designing reliable systems to experimenting with machine learning and computer vision.",
      "I don't like limiting myself to just one area of development. I enjoy understanding how things work, exploring unfamiliar technologies, and bringing different concepts together to build useful experiences.",
      "I'm always learning, building, breaking things, and finding better ways to solve problems. My goal is to grow into an engineer who doesn't just write code, but creates things that make a difference.",
    ],
    factTags: [
      "Student",
      "Software engineering",
      "AI/ML",
      "Open to internships",
    ],
    photoUrl: "/profile.jpg", // Fallback to 'S' placeholder if missing
  },
  skills: [
    {
      name: "programming",
      items: ["C", "C++", "Python", "Java", "JavaScript", "TypeScript", "SQL"],
    },
    {
      name: "frontend",
      items: ["HTML", "CSS", "React.js", "Next.js", "Tailwind CSS"],
    },
    {
      name: "backend",
      items: [
        "Node.js",
        "Express.js",
        "REST APIs",
        "JWT",
        "MongoDB",
        "MySQL",
      ],
    },
    {
      name: "ai and ml",
      items: [
        "Machine Learning",
        "Deep Learning",
        "Computer Vision",
        "TensorFlow",
        "PyTorch",
        "Scikit-learn",
        "OpenCV",
        "NumPy",
        "Pandas",
        "Matplotlib",
      ],
    },
    {
      name: "tools",
      items: [
        "Git",
        "GitHub",
        "VS Code",
        "MongoDB Atlas",
        "MongoDB Compass",
        "Postman",
        "Vite",
      ],
    },
  ],
  projects: [
    {
      title: "UniMeet",
      tagline: "Faculty Appointment Management System",
      description:
        "Faculty selection, appointment booking, time-slot management, authentication, appointment synchronization, and notifications.",
      stack: [
        "React",
        "Vite",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "MongoDB",
        "JWT",
      ],
      tags: ["Full-Stack", "Management"],
      link: "#",
      repo: "#",
      isPlaceholderLink: true,
    },
    {
      title: "DeepFake Detection System",
      tagline: "CNN-based deepfake image detection system",
      description:
        "Deep learning system using convolutional neural networks to detect altered and synthetically generated facial imagery.",
      stack: ["Python", "TensorFlow/Keras", "OpenCV"],
      tags: ["AI/ML", "Vision"],
      link: "#",
      repo: "#",
      isPlaceholderLink: true,
    },
    {
      title: "Hospital Management System",
      tagline: "Database-based hospital management project",
      description:
        "Relational database management solution designed for structured healthcare workflows, patient records, and staff management.",
      stack: ["MySQL"],
      tags: ["Database", "SQL"],
      link: "#",
      repo: "#",
      isPlaceholderLink: true,
    },
  ],
  achievements: [
    {
      title: "Unstop Hackathon — 2nd Place",
      category: "hackathon",
      description: "Secured 2nd Place in the Unstop Hackathon competition.",
    },
    {
      title: "Fortex Hackathon — Participation",
      category: "hackathon",
      description: "Participated in the Fortex Hackathon.",
    },
    {
      title: "MongoDB Certificate",
      category: "certification",
      description: "Certification in MongoDB database concepts and operations.",
    },
  ],
  statsSnapshot: {
    github: {
      contributionsLastYear: 620,
      repos: 24,
      dayStreak: 18,
      seed: 7,
    },
    leetcode: {
      submissionsLastYear: 310,
      solved: 150,
      easy: 90,
      medium: 52,
      hard: 8,
      seed: 11,
    },
  },
};

