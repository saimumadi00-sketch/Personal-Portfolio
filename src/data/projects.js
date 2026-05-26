const projects = [
  {
    id: 1,
    title: 'Personal Portfolio',
    tags: ['React', 'Vite', 'Bootstrap', 'JavaScript'],
    description:
      'Component-based React portfolio with routing, dark mode, animated sections, contact form validation, and reusable UI components.',
    status: 'Live',
    repositoryUrl: 'https://github.com/saimumadi00-sketch/Personal-Portfolio',
    liveUrl: 'https://saimum-aditto.vercel.app',
    screenshot: null,
    impact: 'Deployed on Vercel — live portfolio visited across 5+ labs of coursework.',
  },
  {
    id: 2,
    title: 'EyeMap',
    tags: ['Python', 'Computer Vision', 'Mapping', 'Drone'],
    description:
      'Open-source monocular terrain mapping foundation that turns live or recorded video into relative camera trajectories and sparse terrain point clouds.',
    status: 'Active',
    repositoryUrl: 'https://github.com/saimumadi00-sketch/eye-map',
    liveUrl: null,
    screenshot: null,
    impact: 'Reconstructs sparse 3D point clouds from a single moving camera — no depth sensor needed.',
  },
  {
    id: 3,
    title: 'MultiSync',
    tags: ['C', 'Linux', 'Threads', 'CLI'],
    description:
      'C11 Linux command-line file compression tool using RLE, pthread-based worker pools, CRC32 verification, progress bars, and benchmark reporting.',
    status: 'Complete',
    repositoryUrl: 'https://github.com/saimumadi00-sketch/multisync',
    liveUrl: null,
    screenshot: null,
    impact: 'Achieves parallel multi-file compression with verified integrity via CRC32 checksums.',
  },
  {
    id: 4,
    title: 'ML-Based Network Intrusion Detection System',
    tags: ['Python', 'Machine Learning', 'Cybersecurity', 'NIDS'],
    description:
      'Multi-stage network intrusion detection pipeline with preprocessing, anomaly detection, threat classification, correlation, severity scoring, and privacy-safe alerts.',
    status: 'Academic',
    repositoryUrl: 'https://github.com/saimumadi00-sketch/ML-Based-Network-Intrusion-Detection-System',
    liveUrl: null,
    screenshot: null,
    impact: 'Classifies network threats across multiple attack categories with ML-driven severity scoring.',
  },
  {
    id: 5,
    title: 'Human Pose Detection',
    tags: ['Python', 'Computer Vision', 'Machine Learning', 'YOLO'],
    description:
      'Real-time human behavior detection system that extracts pose landmarks from webcam frames and classifies behavior sequences with a Keras LSTM model.',
    status: 'ML Project',
    repositoryUrl: 'https://github.com/saimumadi00-sketch/human-pose-detection',
    liveUrl: null,
    screenshot: null,
    impact: 'Detects 5 live action classes in real-time using a sliding LSTM window over webcam input.',
  },
  {
    id: 6,
    title: 'Behaviour Detection for Surveillance',
    tags: ['Python', 'MediaPipe', 'LSTM', 'Computer Vision'],
    description:
      'Public-safety action detection prototype using webcam input, MediaPipe BlazePose keypoints, a sliding frame window, and an LSTM classifier pipeline.',
    status: 'Coursework',
    repositoryUrl: 'https://github.com/saimumadi00-sketch/Behaviour-Detection-for-Surveillance',
    liveUrl: null,
    screenshot: null,
    impact: 'Targets ≥85% validation accuracy classifying suspicious behaviours for surveillance use cases.',
  },
  {
    id: 7,
    title: 'Frontline Pet Care',
    tags: ['React', 'TypeScript', 'Vite', 'Supabase'],
    description:
      'WW2-themed pet care web app with authentication, role-aware dashboards, pet enlistment booking, user-vet chat, products, and service records.',
    status: 'Full Stack',
    repositoryUrl: 'https://github.com/saimumadi00-sketch/ww2-themed-petcare-website---frontline',
    liveUrl: null,
    screenshot: null,
    impact: 'Full-stack app with Supabase auth, real-time chat, and role-based dashboards for vets and owners.',
  },
  {
    id: 8,
    title: 'Academic Portfolio CMS',
    tags: ['JavaScript', 'Node.js', 'Express', 'CMS'],
    description:
      'Academic portfolio website with a static public frontend and an optional Node.js CMS backend for editing content, uploads, backups, and admin login.',
    status: 'Web App',
    repositoryUrl: 'https://github.com/saimumadi00-sketch/SadiaShimu',
    liveUrl: null,
    screenshot: null,
    impact: 'Gives a non-technical academic full CMS control over their portfolio without touching code.',
  },
]

export default projects
