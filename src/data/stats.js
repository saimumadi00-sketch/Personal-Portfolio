import projects from './projects.js'

const stats = [
  { value: projects.filter((project) => project.repositoryUrl).length, suffix: '', label: 'GitHub-linked Projects', icon: 'bi-folder2-open' },
  { value: 5, suffix: '+', label: 'Labs Shipped', icon: 'bi-journal-check' },
  { value: 90, suffix: '%', label: 'HTML / CSS', icon: 'bi-filetype-html' },
  { value: 1, suffix: '', label: 'Live Deployment', icon: 'bi-cloud-check' },
]

export default stats
