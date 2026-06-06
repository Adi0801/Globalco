export function formatSalary(min: number, max: number): string {
  return `${min.toLocaleString()}-${max.toLocaleString()} LPA`
}

export function formatPostedDate(daysAgo: number): string {
  if (daysAgo === 0) return 'Today'
  if (daysAgo === 1) return 'Yesterday'
  if (daysAgo < 7) return `${daysAgo} days ago`
  if (daysAgo < 30) return `${Math.floor(daysAgo / 7)} weeks ago`
  return `${Math.floor(daysAgo / 30)} months ago`
}

export function searchJobs(
  query: string,
  jobs: Array<{ title: string; company: string; location: string; skills: string[] }>,
): typeof jobs {
  const lowerQuery = query.toLowerCase()
  return jobs.filter((job) => {
    const searchText = [job.title, job.company, job.location, ...job.skills].join(' ').toLowerCase()
    return searchText.includes(lowerQuery)
  })
}
