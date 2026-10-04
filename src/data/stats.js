import projects from './projects.js'

export const projectCounts = {
  githubLinkedProjects: projects.filter((project) => project.repositoryUrl).length,
  liveDemos: new Set(projects.filter((project) => project.liveUrl).map((project) => new URL(project.liveUrl).origin)).size,
}

const stats = [
  { value: projectCounts.githubLinkedProjects, suffix: '', label: 'GitHub-linked Projects', icon: 'bi-folder2-open' },
  { value: 5, suffix: '+', label: 'Labs Shipped', icon: 'bi-journal-check' },
  { value: 90, suffix: '%', label: 'HTML / CSS', icon: 'bi-filetype-html' },
  { value: projectCounts.liveDemos, suffix: '', label: 'Live Demos', icon: 'bi-cloud-check' },
]

export default stats
