# Enterprise Job Board

A responsive job board built with React, TypeScript, Redux Toolkit, Redux Saga, and Vite. The app uses mock enterprise job data to demonstrate production-style search, filtering, virtualized scrolling, job details, and CI/CD deployment through GitHub Actions and Vercel.

## Agentic Tools & Feature Mapping

This application was engineered and restructured using state-of-the-art Agentic AI coding tools. Below is a detailed mapping of each component, the agentic tools used, and their primary use cases:

| Feature/Component | Files | Agentic Tool Used | Primary Use Case |
| :--- | :--- | :--- | :--- |
| **Routing & Shell** | [App.tsx](file:///d:/Company%20Assement/Globalco/job-board/src/App.tsx)<br>[AppShell.tsx](file:///d:/Company%20Assement/Globalco/job-board/src/components/layout/AppShell.tsx)<br>[AppShell.css](file:///d:/Company%20Assement/Globalco/job-board/src/components/layout/AppShell.css) | **Antigravity** (Google DeepMind) | Handles SPA navigation using React Router. Replaced legacy tab-based layout with deep-linkable URLs (`/`, `/saved`, `/track`, `/jobs/:id`, `/apply/:id`) and displays live badges for Saved/Tracked counts in the navigation header. |
| **Job Details** | [JobDetailPage.tsx](file:///d:/Company%20Assement/Globalco/job-board/src/features/jobs/pages/JobDetailPage.tsx)<br>[JobDetailPage.css](file:///d:/Company%20Assement/Globalco/job-board/src/features/jobs/pages/JobDetailPage.css) | **Antigravity** (Google DeepMind) | Dedicated full-page view showing exhaustive information for a selected job, featuring a responsive, sticky action panel for applying/saving. |
| **Application Form** | [ApplyJobPage.tsx](file:///d:/Company%20Assement/Globalco/job-board/src/features/jobs/pages/ApplyJobPage.tsx) | **Antigravity** & **Codex** | Multiline input fields, drag-and-drop file upload for resumes, validation handling, and submission workflows that auto-fill details from url params. |
| **Tracker & Dashboard** | [TrackJobPage.tsx](file:///d:/Company%20Assement/Globalco/job-board/src/features/jobs/pages/TrackJobPage.tsx) | **Antigravity** (Google DeepMind) | Serves as both a visual step-by-step application pipeline tracking progress, and a general dashboard listing all applied applications when visited at `/track`. |
| **Saved Jobs List** | [SavedJobsPage.tsx](file:///d:/Company%20Assement/Globalco/job-board/src/features/jobs/pages/SavedJobsPage.tsx) | **Antigravity** (Google DeepMind) | Renders a clean grid layout of all saved roles, independent of filters set on the main search page, allowing users to bookmark jobs for later review. |
| **Virtualized Listings** | [JobList.tsx](file:///d:/Company%20Assement/Globalco/job-board/src/features/jobs/components/JobList.tsx)<br>[JobRow.tsx](file:///d:/Company%20Assement/Globalco/job-board/src/features/jobs/components/JobRow.tsx)<br>[JobRow.css](file:///d:/Company%20Assement/Globalco/job-board/src/features/jobs/components/JobRow.css) | **Antigravity** & **Codex** | High-performance list displaying unapplied roles. Highlighted saved job cards with a custom teal border and background. Filters out applied jobs on the fly. |
| **Redux State Management** | [jobsSlice.ts](file:///d:/Company%20Assement/Globalco/job-board/src/features/jobs/redux/jobsSlice.ts)<br>[jobsSelectors.ts](file:///d:/Company%20Assement/Globalco/job-board/src/features/jobs/redux/jobsSelectors.ts) | **Antigravity** (Google DeepMind) | Standardized client-side state. Configured auto-unsaving on job application, and selector isolation to prevent search parameters from filtering saved roles. |
| **CI/CD & Routing Configuration** | [ci-cd.yml](file:///d:/Company%20Assement/Globalco/job-board/.github/workflows/ci-cd.yml)<br>[vercel.json](file:///d:/Company%20Assement/Globalco/job-board/vercel.json) | **Antigravity** (Google DeepMind) | Configures static redirects for fallback URL routing on Vercel hosting, and defines the CI/CD GitHub Actions workflow. |

---

## Features

- Responsive job board with desktop split view and mobile detail flow.
- Redux Saga driven loading, debounced search, and throttled load-more behavior.
- Virtualized job results powered by `react-window`.
- Search across title, company, skills, department, work mode, and location.
- Filters for work mode, department, and seniority.
- Sort options for relevance, newest roles, and salary.
- Rich job details with responsibilities, requirements, benefits, hiring stages, and salary range.
- Apply flow with a dedicated application page and success message.
- Application form includes address and resume upload.
- Track page shows submitted application status after apply.
- Saved jobs workspace with saved-role highlighting in the virtualized list.
- Enterprise UI theme with accessible controls, visible focus states, and stable card dimensions.

## Tech Stack

- React 19
- TypeScript
- Vite
- Redux Toolkit
- Redux Saga
- React Redux
- React Window
- Lucide React
- GitHub Actions
- Vercel

## Local Setup

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

## Project Structure

```text
src/app              Redux store and root saga
src/components       Job board UI components
src/data             Mock job data
src/features/jobs    Redux slice, saga, and selectors
src/types            Shared TypeScript types
docs                 Feature and deployment documentation
.github/workflows    CI/CD pipeline
```

## Redux Saga Flow

The app dispatches `bootstrapRequested` when it starts. Redux Saga simulates an async data load and commits the mock jobs into Redux state. Search input updates immediately for UI responsiveness, while Saga waits 300ms before committing the searchable query. Load-more requests are throttled to 200ms so fast scrolling does not spam state updates.

## Deployment

A CI/CD template using GitHub Actions and Vercel is configured in this repository. 

### CI/CD Workflow
The template in `.github/workflows/ci-cd.yml` automatically validates build and lint status on pull requests and commits to the `main` branch. 

### Deploying to Vercel
To deploy the project to Vercel:
1. Connect this repository to your Vercel account.
2. In the GitHub repository settings, add the following secrets:
   - `VERCEL_TOKEN`: Your Vercel API personal access token.
   - `VERCEL_ORG_ID`: Your Vercel Organization ID.
   - `VERCEL_PROJECT_ID`: Your Vercel Project ID.
3. Push to the `main` branch to trigger the deployment.

## Submission Checklist

- GitHub repository link
- Vercel demo link
- Documentation link or repository docs folder
