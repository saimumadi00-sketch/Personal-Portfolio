const skills = {
  languages: [
    { name: 'HTML / CSS', level: 90, badge: 'success' },
    { name: 'Python', level: 78, badge: 'primary' },
    { name: 'JavaScript', level: 74, badge: 'primary' },
    { name: 'C / SQL', level: 64, badge: 'secondary' },
  ],
  frameworks: [
    { name: 'React / Vite', level: 78, badge: 'primary' },
    { name: 'Bootstrap', level: 85, badge: 'success' },
    { name: 'Node.js / Express.js', level: 58, badge: 'primary' },
    { name: 'MongoDB / REST APIs', level: 52, badge: 'secondary' },
  ],
  tools: [
    { name: 'Git & GitHub', level: 'Advanced' },
    { name: 'VS Code', level: 'Advanced' },
    { name: 'Google Colab', level: 'Intermediate' },
    { name: 'Kaggle', level: 'Intermediate' },
    { name: 'npm / Vercel', level: 'Intermediate' },
    { name: 'AWS', level: 'Beginner' },
    { name: 'Linux', level: 'Intermediate' },
    { name: 'Security Logging', level: 'Intermediate' },
  ],
  domains: [
    {
      title: 'Programming',
      icon: 'bi-code-slash',
      items: ['C', 'Python', 'JavaScript', 'HTML', 'CSS', 'SQL'],
    },
    {
      title: 'Web Development',
      icon: 'bi-window-stack',
      items: ['React', 'Vite', 'Node.js', 'Express.js', 'Bootstrap', 'REST APIs', 'MongoDB'],
    },
    {
      title: 'Machine Learning',
      icon: 'bi-cpu',
      items: ['TensorFlow', 'Keras', 'Scikit-learn', 'OpenCV', 'MediaPipe', 'YOLO', 'BiLSTM', 'Transformers.js'],
    },
    {
      title: 'Systems and Security',
      icon: 'bi-shield-lock',
      items: [
        'Linux',
        'POSIX Threads',
        'Multithreading',
        'Synchronisation',
        'Network Intrusion Detection',
        'Security Logging',
      ],
    },
  ],
  soft: [
    'Problem Solving',
    'Communication',
    'Team Collaboration',
    'Time Management',
    'Adaptability',
  ],
}

export default skills
