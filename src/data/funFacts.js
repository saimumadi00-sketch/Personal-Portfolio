import { projectCounts } from './stats.js'

const funFacts = [
  {
    icon: 'bi-building',
    iconClass: 'text-primary',
    text: 'Worked night shifts at ASL BPO as a Customer Care Rep',
  },
  {
    icon: 'bi-tree-fill',
    iconClass: 'text-success',
    text: 'Volunteered as IT Support for a Forestry NGO in Sreemongol',
  },
  {
    icon: 'bi-globe2',
    iconClass: 'text-info',
    text: 'British Council member since college',
  },
  {
    icon: 'bi-people-fill',
    iconClass: 'text-warning',
    text: 'Served as Class Representative in both high school and college',
  },
  {
    icon: 'bi-laptop',
    iconClass: 'text-primary',
    text: `${projectCounts.githubLinkedProjects} GitHub-linked projects and ${projectCounts.liveDemos} live demos listed in my portfolio`,
  },
  {
    icon: 'bi-shield-check',
    iconClass: 'text-danger',
    text: 'Implemented real security headers (CSP, HSTS) on a live site',
  },
]

export default funFacts
