# Features

## Job Discovery

The job board presents mock enterprise roles in a responsive split layout. Desktop users can scan listings and inspect details side by side, while mobile users move from the list into a focused detail view.

## Search And Filtering

Search supports title, company, location, department, work mode, seniority, and skills. Search input is debounced through Redux Saga, which keeps typing responsive while avoiding unnecessary result recalculation.

Available filters:

- Work mode: All, Remote, Hybrid, On-site
- Department: Engineering, Design, Product, Data, Marketing, Operations
- Seniority: Associate, Mid-level, Senior, Lead

## Sorting

Users can sort jobs by:

- Relevance
- Newest
- Salary

Relevance favors featured jobs, remote roles, recency, and stronger keyword matches.

## Virtualized Results

The result list uses `react-window` so the UI remains smooth with a larger mock data set. The app initially shows 30 roles and loads 20 more when the user scrolls near the end.

## Job Details

Each job includes:

- Company and role summary
- Department, location, work mode, and salary
- Responsibilities
- Requirements
- Skills
- Hiring process
- Benefits

## Apply And Saved Jobs

The Apply action opens a dedicated application page with role context, candidate fields, address capture, and resume upload. After submission, the app moves to a Track Job page with a hiring status timeline. The Save action moves the role into the saved jobs workspace, shows a confirmation message, and highlights saved roles anywhere they appear in the virtualized lists.

## UX And Accessibility

The interface uses a light enterprise theme with compact cards, clear active states, keyboard focus outlines, labeled controls, and responsive layouts for desktop, tablet, and mobile screens.
