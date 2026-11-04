export interface ProjectTerminalLine {
  prompt: string;
  text: string;
  isCommand?: boolean;
}

export interface ProjectItem {
  number: string;
  title: string;
  category: string;
  filePath: string;
  description: string;
  terminalOutput?: ProjectTerminalLine[];
  stack: string[];
  repo?: string;
  link?: string;
  isFeatured?: boolean;
}

export interface ProjectsSectionData {
  terminalPath: string;
  heading: string;
  subtitle: string;
  projects: ProjectItem[];
}

export interface SkillCategory {
  title: string;
  items: string[];
}

export interface SkillsSectionData {
  terminalPath: string;
  heading: string;
  intro: string;
  categories: SkillCategory[];
}

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
    terminalPath: string;
    heading: string;
    paragraphs: string[];
    profileTags: string[];
    photo: {
      url: string;
      filename: string;
      size: string;
    };
    factTags?: string[];
    photoUrl?: string;
  };
  skillsData: SkillsSectionData;
  skills: SkillGroup[];
  projectsData: ProjectsSectionData;
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
    terminalPath: "~/about",
    heading: "About me",
    paragraphs: [
      "I'm Sarvani, a Computer Science student who enjoys learning by building and experimenting.",
      "I'm exploring software development and AI/ML, turning what I learn into projects and practical experiences. I like understanding how things work, trying unfamiliar technologies, and finding creative ways to solve problems.",
      "I'm still discovering the areas I want to grow in, and I'm excited to keep learning, building, and seeing where that journey takes me.",
    ],
    profileTags: [
      "FOCUS: AI / ML",
      "DEGREE: B.TECH CSE",
      "STATUS: OPEN TO WORK",
    ],
    photo: {
      url: "/profile.jpg",
      filename: "profile.jpg",
      size: "118 KB",
    },
    factTags: [
      "FOCUS: AI / ML",
      "DEGREE: B.TECH CSE",
      "STATUS: OPEN TO WORK",
    ],
    photoUrl: "/profile.jpg",
  },
  skillsData: {
    terminalPath: "~/skills",
    heading: "Technical Skills",
    intro:
      "Technologies and tools I've been learning and working with through coursework and projects.",
    categories: [
      {
        title: "Programming Languages",
        items: ["C++", "Python", "Java", "SQL"],
      },
      {
        title: "Frontend Development",
        items: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
      },
      {
        title: "Backend Development",
        items: ["Node.js", "Express.js", "REST APIs"],
      },
      {
        title: "Databases",
        items: ["MongoDB", "MySQL"],
      },
      {
        title: "AI / Machine Learning",
        items: [
          "Machine Learning",
          "Computer Vision",
          "TensorFlow",
          "Keras",
          "OpenCV",
          "Scikit-learn",
        ],
      },
      {
        title: "Tools",
        items: ["Git", "GitHub", "VS Code", "Postman"],
      },
    ],
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
  projectsData: {
    terminalPath: "~/projects",
    heading: "Selected Projects",
    subtitle:
      "A collection of projects where I've applied what I've learned and explored new technologies.",
    projects: [
      {
        number: "01",
        title: "UniMeet",
        category: "Full-Stack Application",
        filePath: "~/projects/unimeet",
        description:
          "A faculty appointment management platform that allows students to explore faculty profiles, check available time slots and book appointments.",
        terminalOutput: [
          { prompt: "$", text: "npm run dev", isCommand: true },
          { prompt: ">", text: "Starting UniMeet..." },
          { prompt: ">", text: "Appointment system ready." },
        ],
        stack: ["React", "Node.js", "Express.js", "MongoDB", "JWT"],
        repo: "https://github.com/SarvaniVadavalli/UniMeet",
      },
      {
        number: "02",
        title: "DeepFake Detection System",
        category: "Deep Learning & Vision",
        filePath: "~/projects/deepfake",
        description:
          "An image classification system that uses deep learning and computer vision techniques to identify potentially manipulated images.",
        terminalOutput: [
          { prompt: "$", text: "python detect.py", isCommand: true },
          { prompt: ">", text: "Loading detection model..." },
          { prompt: ">", text: "Image analysis initialized." },
        ],
        stack: ["Python", "TensorFlow", "Keras", "OpenCV", "CNN"],
        repo: "https://github.com/SarvaniVadavalli/Deep-Fake-Project",
      },
      {
        number: "03",
        title: "Hospital Management System",
        category: "Database System",
        filePath: "~/projects/hospital-db",
        description:
          "A database-driven application designed to manage hospital information and related records.",
        terminalOutput: [
          { prompt: ">", text: "SELECT * FROM patients;", isCommand: true },
          { prompt: ">", text: "Query prepared successfully." },
        ],
        stack: ["MySQL", "SQL"],
        repo: "https://github.com/SarvaniVadavalli/DBMS-Hospital-Management",
      },
    ],
  },
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
      repo: "https://github.com/SarvaniVadavalli/UniMeet",
      isPlaceholderLink: false,
    },
    {
      title: "DeepFake Detection System",
      tagline: "CNN-based deepfake image detection system",
      description:
        "Deep learning system using convolutional neural networks to detect altered and synthetically generated facial imagery.",
      stack: ["Python", "TensorFlow/Keras", "OpenCV"],
      tags: ["AI/ML", "Vision"],
      link: "#",
      repo: "https://github.com/SarvaniVadavalli/Deep-Fake-Project",
      isPlaceholderLink: false,
    },
    {
      title: "Hospital Management System",
      tagline: "Database-based hospital management project",
      description:
        "Relational database management solution designed for structured healthcare workflows, patient records, and staff management.",
      stack: ["MySQL"],
      tags: ["Database", "SQL"],
      link: "#",
      repo: "https://github.com/SarvaniVadavalli/DBMS-Hospital-Management",
      isPlaceholderLink: false,
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

