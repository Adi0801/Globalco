export type WorkMode = 'Remote' | 'Hybrid' | 'On-site'

export type Seniority = 'Associate' | 'Mid-level' | 'Senior' | 'Lead'

export type Department =
  | 'Engineering'
  | 'Design'
  | 'Product'
  | 'Data'
  | 'Marketing'
  | 'Operations'

export type SortOption = 'relevance' | 'newest' | 'salary'

export type Job = {
  id: string
  title: string
  company: string
  location: string
  workMode: WorkMode
  department: Department
  seniority: Seniority
  salaryMin: number
  salaryMax: number
  postedDaysAgo: number
  featured: boolean
  applicants: number
  skills: string[]
  summary: string
  responsibilities: string[]
  requirements: string[]
  benefits: string[]
  hiringStages: string[]
}
