// src/models/siteData.js

export const siteData = {
  // 1. Header & Navigation Tabs
  header: {
    windowTitle: "sara - visual-studio-code",
    statusBadge: "open to opportunities",
    tabs: [
      { id: "welcome", label: "Welcome.tsx" },
      { id: "about", label: "About Me.md" },
      { id: "skills", label: "Skills.json" },
      { id: "experience", label: "Experience.log" },
      { id: "certifications", label: "Certifications.yml" },
      { id: "projects", label: "Projects/" },
      { id: "contact", label: "Contact.sh" }
    ]
  },

  // 2. Hero Section
  hero: {
    filePathTag: "src/Welcome.tsx - line 1",
    name: {
      firstName: "Sara Mohammad Zain",
      lastName: "Abdulrahman"
    },
    titles: [
      "Information Technology",
      "Software Engineering"
    ],
    bio: "Building systems, breaking them on purpose, and learning what makes software actually work.",
    buttons: {
      primary: { label: "View - CV", url: "" },
      secondary: { label: "./Contact.sh →", target: "#contact" }
    },
    
    // Terminal Window (developer.config.ts)
    codeEditorCard: {
      fileName: "developer.config.ts",
      statusOverlay: "in training",
      code: {
        name: "SARA@domain.dev",
        role: "IT Student",
        mindset: "Always learning"
      }
    },

    // Terminal Window (zsh)
    terminalCard: {
      title: "zsh",
      command: "npm run build-career",
      outputLine1: "compiling curiosity...",
      outputLine2: "✓ build passing"
    }
  },

  // 3. About Me Section
  aboutMe: {
    sectionTag: "// about-me",
    title: "Designing solutions, executing clean logic",
    subtitle: "Behind every great application lies a solid, efficient Programmer.",
    
    // Terminal Window (whoami - bash)
    terminalWindow: {
      title: "whoami - bash",
      command: "whoami",
      data: {
        name: "Sara Mohammad Zain Abdulrahman",
        role: "Information Technology Student",
        language: "Arabic - English",
        focus: "Web & Mobile Development, Security",
        status: "Compiling knowledge, shipping projects , searsh for work"
      }
    },

    // Code Editor Window (overview.json)
    codeEditorWindow: {
      fileName: "overview.json",
      paragraphs: [
        "Driven by a curiosity for technology, I pursued a degree in Information Technology to build a strong foundation across software development, digital security, and system design.",
        "Through academic coursework, hands-on projects, and practical training, I focus on turning ideas into functional, secure digital solutions. I thrive on continuous learning and building software that delivers real value.",
        "Beyond coding, I value collaborative problem-solving, adaptability, and continuous self-improvement in fast-paced environments. I am excited to apply my skills, explore emerging technologies, and contribute to impactful technical initiatives."
      ]
    }
  },

// 4. Core Technical Stack & Tools Section
  techStack: {
    sectionTag: "// skills.json",
    title: "Core Technical Stack & Tools",
    subtitle: "Categorized skills honed through academic learning, hands-on projects, and training",
    skills: [
      { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Expo", icon: "https://img.icons8.com/ios-filled/50/FFFFFF/expo.png"},
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
      { name: "SQL", icon: "https://img.icons8.com/fluency/48/sql.png" },
      { name: "Android Studio", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg" },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "Packet Tracer", icon: "https://img.icons8.com/ios-filled/50/FFFFFF/cisco-packet-tracer.png" },
      { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { name: "Lucidchart", icon: "https://www.vectorlogo.zone/logos/lucidchart/lucidchart-icon.svg" },
      { name: "Miro", icon: "https://img.icons8.com/nolan/96/miro.png",},
      { name: "GitHub", icon: "https://img.icons8.com/fluency-systems-filled/48/FFFFFF/github.png" }
    ]
  },

 // 5. Experience Trace Section
  experience: {
    sectionTag: "// experience.log",
    title: "Experience Trace",
    subtitle: "Documenting professional milestones and career progress.",
    experiences: [
      {
        id: "exp-1",
        isCurrent: true,
        role: "Software Engineering Trainee",
        company: "Nazam Al-nahda",
        period: "Aug - Dec 2026",
        buttonText: "[+] expand-tasks.sh", 
        tasks: [
                "Collaborating with teams on technical projects.",
                "Requirements definition & analysis.",
                "UI/UX design & layout planning.",
                "Front-end development using modern programming tools.",
                "Components & data management integration.",
                "Systematic testing & debugging.",
              ]

      },
     /* {
        id: "exp-2",
        isCurrent: false,
        role: "Frontend Developer Intern",
        company: "Cisco",
        period: "Jan - Apr 2026",
        buttonText: "[+] expand-tasks.sh",
        tasks: [
          "Assisted in crafting responsive UI/UX interfaces.",
          "Integrated REST APIs with frontend components.",
          "Participated in code reviews and debugging tasks."
        ]
      },
      {
        id: "exp-3",
        isCurrent: false,
        role: "IT Support Volunteer",
        company: "Microsoft",
        period: "Aug - Nov 2025",
        buttonText: "[+] expand-tasks.sh",
        tasks: [
          "Provided technical troubleshooting and software setup assistance.",
          "Managed hardware and system access configurations.",
          "Documented routine support workflows and FAQs."
        ]
        
      }*/
    ]
  },

  // 6. Education & Certifications Section
  educationAndCerts: {
    sectionTag: "// certifications.yml",
    title: "Education & Certifications",
    subtitle: "educational background and completed courses .",
    
    // Terminal Window : degrees.log
    degreesWindow: {
      fileName: "academic degrees.log",
      institution: "Prince Musaid bin Abdulrahman University",
      degree: "Bachelor of Science in Information Technology",
      period: "2022 - 2027",
      url:""
    },

    // Terminal Window : certificates/
    certificatesWindow: {
     /* fileName: "professional courses/",
      courses: [
        {
          id: "cert-1",
          title: "React Native Development",
          issuer: "Tuwaiq Academy",
          date: "August 2026",
          url:" "
        },
        {
          id: "cert-2",
          title: "Introduction to Cybersecurity",
          issuer: "Coursera",
          date: "March 2026",
          url:" "
        },
        {
          id: "cert-3",
          title: "Database Design with SQL & NoSQL",
          issuer: "Coursera",
          date: "January 2026",
          url:" "
        },
        {
          id: "cert-4",
          title: "Networking Fundamentals",
          issuer: "Tuwaiq Academy",
          date: "November 2025",
          url:" "
        }
      ]*/
    }
  },

  // 7. Featured Projects Section
  projects: {
    sectionTag: "// projects/",
    title: "Featured Projects",
    subtitle: "A showcase of key software projects and technical solutions I have built.",
    items: [
      {
        id: "reesha",
        windowTitle: "Reesha.app",
        name: "Reesha",
        badge: "mobile",
        description: "A mobile marketplace that connects independent artists with people looking to buy or commission original artwork, supporting dedicated experiences for buyers, artists, and admins.",
        features: [
          "Multi-user roles for art buyers, artists, and admins",
          "Artwork browsing, search, favorites, cart, and multi-step checkout",
          "Custom commission requests and quote negotiation flow",
          "Artist Profile for listing uploads and order tracking",
          "Personalized artwork recommendations based on  favorite history",
          "Admin management for user oversight and platform stats"
        ],
        technologies: ["React Native", "Expo", "Firebase", "JavaScript"],
        previewImage: `${import.meta.env.BASE_URL}assets/projects/reesha-preview.png`,
        videoUrl: `${import.meta.env.BASE_URL}videos/reesha-demo.mp4`,
        githubUrl: "https://github.com/Sara/Reesha"
      },
      /*{
        id: "mytrip",
        windowTitle: "MyTrip.app",
        name: "MyTrip",
        badge: "mobile",
        description: "A mobile trip-planning and packing management application designed to help travelers effortlessly organize destinations, smart checklists, and real-time trip statistics in a single, intuitive interface.",
        features: [
          "Seamless trip creation, editing, and date-based sorting",
          "Customizable packing checklists with priority levels and live progress tracking",
          "Comprehensive dashboard for statistics, upcoming trips, and completion rates",
          "Advanced features including checklist sharing, persistent Dark Mode, and quick data management"
        ],
        technologies: ["Android Studio", "Java", "Mobile UI", "SQLite"],
        previewImage: "/assets/projects/mytrip-preview.png",
        githubUrl: ""
      }*/
    ]
  },

  // 8. Contact Section 
  contact: {
    sectionTag: "// contact.sh",
    title: "Get in Touch",
    subtitle: "Feel free to reach out through any of the channels below.",
    terminalWindow: {
      title: "contact.sh - bash",
      command: "./contact.sh --list --fields=email,location,github,linkedin",
      statusMessage: "channels found, all reachable.",
      channels: [
        { type: "email", label: "email", value: "sara@hotmail.com", link: "mailto:sara@hotmail.com" , icon: "https://img.icons8.com/ios-filled/50/12B886/microsoft-outlook-2025.png"},
        /*{ type: "whatsapp", label: "whatsapp", value: "+966 58 000 0000", link: "https://wa.me/966580000000", icon: "https://img.icons8.com/fluency-systems-filled/96/12B886/whatsapp.png" },*/
        { type: "github", label: "github", value: "sara11", link: "https://github.com/sara", icon: "https://img.icons8.com/fluency-systems-filled/96/12B886/github.png" },
        { type: "linkedin", label: "linkedin", value: "sara11", link: "https://linkedin.com/in/sara" ,icon: "https://img.icons8.com/fluency-systems-filled/96/12B886/linkedin.png"},
        { type: "location", label: "location", value: "KSA - JEDDAH", link: null , icon: "https://img.icons8.com/ios-filled/100/12B886/home.png"}

      ]
    },
    footerStatus: "Process finished with exit code 0 - thanks for reading the source.",
    copyright: "© 2026 Sara Mohammad Zain Abdulrahman"
  }
};