# ProjectPreview — Client

A role-based project submission and review platform built with **Next.js, React, TypeScript, and Tailwind CSS**. The frontend provides dedicated dashboards for students, mentors, and admins to manage project submissions, review work, track statistics, and administer users.

## Features

- **Authentication & Authorization** — Register and log in with protected, role-based access.
- **Student Dashboard** — Submit projects, view personal submissions, and track review status.
- **Mentor Dashboard** — Review student projects, provide feedback, and monitor statistics.
- **Admin Dashboard** — Manage users, update roles, and oversee platform activities.
- **Submission Management** — Create submissions, browse submission details, and track evaluation progress.
- **Data Fetching & Caching** — Manage server data efficiently using TanStack Query, if configured.
- **Form Validation** — Validate user input with Zod and the configured form library.
- **Reusable UI Components** — Maintain a consistent interface with reusable components.
- **Responsive Design** — Support desktop, tablet, and mobile layouts.
- **API Integration** — Communicate with the Express.js backend through REST APIs.
- **Loading & Error States** — Provide feedback during requests and handle API errors.
- **Role-Based Navigation** — Display relevant pages and actions according to user permissions.

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | React framework and application routing |
| React | UI development |
| TypeScript | Type safety |
| Tailwind CSS | Styling and responsive design |
| TanStack Query | Server-state management and caching, if configured |
| TanStack Form | Form state management, if configured |
| Zod | Form and request-data validation |
| shadcn/ui | Reusable UI components, if configured |
| Sonner | Toast notifications, if configured |
| ofetch / Fetch API | HTTP requests to the backend, depending on implementation |
| Vercel | Frontend deployment |

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm
- Git
- A running ProjectPreview backend

### 1. Clone the Repository

```bash
git clone <https://github.com/omarFarukGit/project-preview>
cd project-preview
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root.

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

Replace the URL with your deployed backend API base URL when running in production.

**Security:** Never put private API keys, database credentials, or JWT secrets in `NEXT_PUBLIC_*` variables. Next.js exposes these variables to the browser.

### 4. Start the Development Server

```bash
npm run dev
```

Open the application at:

```text
http://localhost:3000
```

### 5. Build for Production

```bash
npm run build
npm start
```

## User Roles

| Role | Main Capabilities |
|---|---|
| `STUDENT` | Submit projects, view personal submissions, and track statistics |
| `MENTOR` | Review submissions, provide feedback, and access review statistics |
| `ADMIN` | Manage users, promote students to mentors, and oversee submissions |

Access to protected pages and actions should be consistent with the backend's authorization rules. Frontend role checks improve the user experience but do not replace backend authorization.

## Backend Integration

The client communicates with the ProjectPreview Express.js API.

Configure the API base URL using `NEXT_PUBLIC_API_URL`.

Representative API endpoints include:

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/auth/register` | Register a user |
| `POST` | `/auth/login` | Authenticate a user |
| `GET` | `/users/me` | Retrieve the current user's profile |
| `POST` | `/submissions` | Create a project submission |
| `GET` | `/submissions/my-submissions` | Retrieve the student's submissions |
| `GET` | `/submissions/my-stats` | Retrieve student statistics |
| `GET` | `/submissions` | Retrieve submissions for authorized reviewers |
| `GET` | `/submissions/:id` | Retrieve submission details |

The actual endpoints, request payloads, authentication mechanism, and permissions should match the implemented backend routes.

## Project Structure

```text
project-submission-dashboard-client/
├── public/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   └── shared/
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   ├── providers/
│   ├── types/
│   └── utils/
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

*The structure above is illustrative. Adjust it to match the actual repository.*

## Authentication and Protected Routes

- Provide registration and login interfaces.
- Retrieve the authenticated user's profile where required.
- Restrict dashboard pages and actions according to user roles.
- Handle expired sessions and unauthorized API responses.
- Use secure cookie settings and appropriate CORS configuration when cookie-based authentication is enabled.

Authentication and authorization must ultimately be enforced by the backend.

## Available Scripts

Run the scripts defined in `package.json`. Common Next.js scripts include:

```bash
npm run dev
npm run build
npm start
npm run lint
```

Some scripts may not be available unless configured in the project.

## Deployment

The frontend can be deployed to Vercel.

1. Push the client repository to GitHub.
2. Import the repository into Vercel.
3. Configure `NEXT_PUBLIC_API_URL` with the production backend API URL.
4. Ensure the backend allows requests from the deployed frontend origin.
5. Verify authentication cookies and credential settings if cookie-based authentication is used.
6. Deploy the application.
7. Test login, registration, dashboards, submissions, reviews, and user-management flows.

## Security Considerations

- Do not expose private credentials through public environment variables.
- Enforce role-based permissions on the backend.
- Validate user input before submitting requests.
- Handle authentication failures and expired sessions safely.
- Configure production CORS and cookie policies correctly.
- Avoid storing sensitive authentication tokens in insecure browser storage.

## Contributing

1. Create a feature branch.
2. Implement and test your changes.
3. Commit changes with descriptive messages.
4. Open a pull request for review.

## License

This project was developed as a project submission and review dashboard application. Add a license file if the project will be distributed under a specific open-source license.
