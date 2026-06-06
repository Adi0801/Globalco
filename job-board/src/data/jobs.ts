import type { Department, Job, Seniority, WorkMode } from '../types/job'

const companies = [
  'Northstar Systems',
  'Apex Finance',
  'Cloudlane',
  'BrightHire',
  'Riverstone Labs',
  'SignalWorks',
  'MetroGrid',
  'Nova Commerce',
  'PeopleOps AI',
  'Atlas Health',
]

const locations = [
  'Bengaluru, India',
  'Hyderabad, India',
  'Pune, India',
  'Gurugram, India',
  'Mumbai, India',
  'Remote - India',
  'Singapore',
  'London, UK',
]

const roles: Array<{
  title: string
  department: Department
  skills: string[]
  summary: string
}> = [
  {
    title: 'Frontend Engineer',
    department: 'Engineering',
    skills: ['React', 'TypeScript', 'Design Systems', 'Performance'],
    summary: 'Build polished product surfaces for hiring teams and candidates.',
  },
  {
    title: 'Backend Platform Engineer',
    department: 'Engineering',
    skills: ['Node.js', 'APIs', 'PostgreSQL', 'Observability'],
    summary: 'Own reliable services that power high-volume hiring workflows.',
  },
  {
    title: 'Product Designer',
    department: 'Design',
    skills: ['UX Research', 'Figma', 'Prototyping', 'Accessibility'],
    summary: 'Design clear enterprise experiences from discovery to delivery.',
  },
  {
    title: 'Product Manager',
    department: 'Product',
    skills: ['Roadmaps', 'Analytics', 'Discovery', 'Stakeholders'],
    summary: 'Shape practical hiring products with measurable business outcomes.',
  },
  {
    title: 'Data Analyst',
    department: 'Data',
    skills: ['SQL', 'Dashboards', 'Experimentation', 'Forecasting'],
    summary: 'Turn hiring funnel data into decisions teams can act on quickly.',
  },
  {
    title: 'Growth Marketing Manager',
    department: 'Marketing',
    skills: ['Lifecycle', 'SEO', 'Campaigns', 'Attribution'],
    summary: 'Create acquisition programs for modern recruiting teams.',
  },
  {
    title: 'Customer Operations Lead',
    department: 'Operations',
    skills: ['Process', 'Enablement', 'SLA', 'Customer Success'],
    summary: 'Improve onboarding, support quality, and operational excellence.',
  },
  {
    title: 'Machine Learning Engineer',
    department: 'Engineering',
    skills: ['Python', 'Ranking', 'LLM Ops', 'Evaluation'],
    summary: 'Build responsible matching systems for jobs and applicants.',
  },
]

const workModes: WorkMode[] = ['Remote', 'Hybrid', 'On-site']
const seniorities: Seniority[] = ['Associate', 'Mid-level', 'Senior', 'Lead']

const responsibilities = [
  'Partner with product and design to deliver clear, measurable improvements.',
  'Ship reliable features with strong attention to accessibility and performance.',
  'Use data and customer feedback to prioritize pragmatic iterations.',
  'Document decisions so distributed teams can move with confidence.',
]

const requirements = [
  'Strong communication habits and comfort working with cross-functional teams.',
  'Experience delivering production features in a fast-moving product environment.',
  'A quality bar that balances craft, speed, maintainability, and user value.',
]

const benefits = [
  'Flexible work setup',
  'Learning budget',
  'Health coverage',
  'Quarterly team offsites',
]

export const mockJobs: Job[] = Array.from({ length: 96 }, (_, index) => {
  const role = roles[index % roles.length]
  const seniority = seniorities[index % seniorities.length]
  const workMode = workModes[(index + 1) % workModes.length]
  const salaryBase = 18 + (index % 12) * 2

  return {
    id: `job-${index + 1}`,
    title: `${seniority} ${role.title}`,
    company: companies[index % companies.length],
    location: locations[index % locations.length],
    workMode,
    department: role.department,
    seniority,
    salaryMin: salaryBase,
    salaryMax: salaryBase + 8 + (index % 4),
    postedDaysAgo: (index * 3) % 28,
    featured: index % 7 === 0,
    applicants: 18 + ((index * 11) % 160),
    skills: role.skills,
    summary: role.summary,
    responsibilities,
    requirements,
    benefits,
    hiringStages: ['Recruiter screen', 'Technical discussion', 'Panel interview', 'Offer review'],
  }
})
