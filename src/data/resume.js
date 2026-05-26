const resume = {
  name: 'Md Saimum Al Mahmud',
  title: 'Computer Science Student',
  university: 'North South University, Dhaka',
  year: '4th Year (2026)',
  email: 'Available on request',
  github: 'https://github.com/saimumadi00-sketch',
  site: 'https://saimum-aditto.vercel.app',

  summary:
    'Final-year Computer Science student at North South University, Dhaka. ' +
    'Passionate about full-stack web development, machine learning pipelines, ' +
    'and building clean, user-focused software. Actively seeking internship ' +
    'opportunities in software engineering and web development.',

  education: [
    {
      degree: 'B.Sc. Computer Science',
      institution: 'North South University',
      location: 'Dhaka, Bangladesh',
      period: '2021 – Present',
      notes: 'Algorithms, Web Technologies, Databases, Software Engineering, ML',
    },
    {
      degree: 'Higher Secondary Certificate (HSC)',
      institution: 'Dhaka, Bangladesh',
      location: 'Bangladesh',
      period: '2019 – 2021',
      notes: 'Science stream — Mathematics, Physics, Chemistry',
    },
  ],

  experience: [
    {
      role: 'Lab Portfolio Project',
      org: 'NSU CSE482 — Internet & Web Technology',
      period: '2024 – 2025',
      bullets: [
        'Built a 5-page portfolio across 5 labs: HTML/CSS → Bootstrap → Responsive → JavaScript → React',
        'Deployed final React + Vite build to Vercel with custom domain',
        'Implemented framer-motion animations, ThemeContext, IntersectionObserver, and React Router v6',
      ],
    },
    {
      role: 'Human Behaviour Detection System',
      org: 'NSU ML Coursework',
      period: '2024',
      bullets: [
        'Built real-time action classifier using MediaPipe BlazePose + Keras LSTM',
        'Targeted ≥85% validation accuracy across 5 live behaviour classes',
        'Integrated sliding frame window for temporal sequence classification',
      ],
    },
    {
      role: 'Network Intrusion Detection System',
      org: 'NSU ML Coursework',
      period: '2024',
      bullets: [
        'Multi-stage ML pipeline: preprocessing, anomaly detection, threat classification',
        'Implemented severity scoring and privacy-safe alert generation',
      ],
    },
  ],

  skills: {
    languages: ['HTML/CSS', 'JavaScript', 'Python', 'Java', 'C', 'SQL'],
    frameworks: ['React', 'Bootstrap', 'framer-motion', 'Node.js', 'Express'],
    tools: ['Git', 'GitHub', 'VS Code', 'Vite', 'MySQL', 'MediaPipe', 'Keras'],
    concepts: ['REST APIs', 'OOP', 'Data Structures', 'Algorithms', 'Machine Learning', 'Computer Vision'],
  },

  languages: ['Bengali (Native)', 'English (Fluent)'],
}

export default resume
