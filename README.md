# ProjectPreview

A full-stack, role-based project submission and review platform built with **Next.js, React, Node.js, Express.js, TypeScript, Prisma, and PostgreSQL**.

ProjectPreview enables students to submit projects for evaluation, mentors to review submissions and provide feedback, and admins to manage users and platform activities through dedicated dashboards.

## Features

### Authentication & Authorization

- User registration and login
- Role-based access control
- Protected dashboard pages and API routes
- Secure password hashing and JWT-based authentication
- Current-user profile management

### Student Dashboard

- Submit projects for evaluation
- View and manage personal submissions
- Track submission and review status
- View submission statistics and results

### Mentor Dashboard

- View student project submissions
- Review submitted projects and provide feedback
- Monitor submission and review statistics

### Admin Dashboard

- Manage users and account status
- Promote students to mentors
- Oversee submissions and platform activities

### Additional Features

- Request validation with Zod
- Duplicate submission prevention where applicable
- Rate limiting to help prevent abuse
- Pagination and search
- Centralized API error handling
- Responsive user interface
- Reusable UI components
- API integration between the client and server
- Loading, error, and success feedback

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| Next.js | React framework and application routing |
| React | User interface |
| TypeScript | Type safety |
| Tailwind CSS | Styling and responsive design |
| TanStack Query | Server-state management, if configured |
| TanStack Form | Form management, if configured |
| Zod | Input validation |
| shadcn/ui | Reusable UI components, if configured |
| Sonner | Toast notifications, if configured |
| Vercel | Frontend deployment |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | REST API framework |
| TypeScript | Type safety |
| PostgreSQL | Relational database |
| Prisma ORM | Database access and migrations |
| Zod | Request validation |
| bcryptjs | Password hashing |
| JWT | Token-based authentication |
| Vercel | Backend deployment, if configured |

## Architecture

```text
project-preview/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── providers/
│   │   ├── services/
│   │   ├── types/
│   │   └── utils/
│   ├── package.json
│   └── README.md
│
└── server/
    ├── prisma/
    │   ├── schema.prisma
    │   └── seed.ts
    ├── src/
    │   ├── app.ts
    │   ├── server.ts
    │   ├── app/
    │   └── modules/
    ├── package.json
    └── README.md
```

*This is an illustrative structure. Update it to match the actual client and server repositories.*

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm
- Git
- PostgreSQL
- A code editor such as Visual Studio Code

### 1. Clone the Repositories

Clone the client and server repositories into the same parent directory.

```bash
git clone <https://github.com/omarFarukGit/project-preview>
```

### 2. Install Dependencies

For the client:

```bash
cd client
npm install
```

For the server, open another terminal:

```bash
cd server
npm install
```

### 3. Configure the Backend Environment

Create a `.env` file in the server root.

```env
NODE_ENV=development
PORT=5000

DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE_NAME"

WT_ACCESS_SECRET=e077e5e5dffe46d3b1684624a350a88c9c5286d1240853c07e7529e18f7c80a2
JWT_REFRESH_SECRET=883b517a1ae41b1b460d5eef6d3b329f2fbc56a35317671253425a05da584b6c
JWT_ACCESS_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=7d

BCRYPT_SALT_ROUNDS=10

# Tester Student

TESTER_STUDENT_NAME=Test Student
TESTER_STUDENT_EMAIL=student@example.com
TESTER_STUDENT_PASSWORD=Student123!

# Tester Mentor

TESTER_MENTOR_NAME=Test Mentor
TESTER_MENTOR_EMAIL=mentor@example.com
TESTER_MENTOR_PASSWORD=Mentor123!

# Tester Admin

TESTER_ADMIN_NAME=Test Admin
TESTER_ADMIN_EMAIL=admin@example.com
TESTER_ADMIN_PASSWORD=Admin123!


CLOUDINARY_CLOUD_NAME=exple
CLOUDINARY_API_KEY=yourapikey
CLOUDINARY_API_SECRET=yoursecrect

```

Add any other environment variables required by the backend implementation.

### 4. Configure the Frontend Environment

Create a `.env.local` file in the client root.

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

Use the actual API base URL expected by your client code.

**Security:** Never expose database credentials, JWT secrets, or private API keys through `NEXT_PUBLIC_*` environment variables. Do not commit `.env` or `.env.local` files.

### 5. Set Up the Database

From the server directory:

```bash
npx prisma generate
npx prisma migrate dev
```

If the project has a configured Prisma seed script:

```bash
npx prisma db seed
```

Use the appropriate production migration command when deploying to production.

### 6. Run the Application

Start the backend:

```bash
npm run dev
```

The backend should be available at:

```text
http://localhost:5000
```

Start the frontend in another terminal:

```bash
npm run dev
```

The frontend should be available at:

```text
http://localhost:3000
```

Run each command from its respective project directory.

## User Roles

| Role | Permissions |
|---|---|
| `STUDENT` | Submit projects, view personal submissions, and track statistics |
| `MENTOR` | Review submissions, provide feedback, and access review statistics |
| `ADMIN` | Manage users, promote students to mentors, and oversee submissions |

The backend is responsible for enforcing authorization. Frontend route protection alone is not sufficient to secure privileged operations.

## API Overview

The client communicates with the backend through REST APIs.

Base URL during local development:

```text
http://localhost:5000/api/v1
```

| Method | Endpoint | Access |
|---|---|---|
| `POST` | `/auth/register` | Public |
| `POST` | `/auth/login` | Public |
| `GET` | `/users/me` | Authenticated |
| `PATCH` | `/users/:id/role` | Admin |
| `POST` | `/submissions` | Student |
| `GET` | `/submissions/my-submissions` | Student |
| `GET` | `/submissions/my-stats` | Student |
| `GET` | `/submissions/stats` | Mentor/Admin |
| `GET` | `/submissions` | Mentor/Admin |
| `GET` | `/submissions/:id` | Authorized users |

These endpoints are representative. Confirm the actual route paths, permissions, request bodies, and response formats against the implemented backend.

## Available Scripts

### Client

Common Next.js scripts:

```bash
npm run dev
npm run build
npm start
npm run lint
```

### Server

```bash
npm run dev
npm run build
npm start
```

Run only the scripts defined in each project's `package.json`.

## Deployment

### Frontend Deployment

The client can be deployed to Vercel.

1. Import the client repository into Vercel.
2. Configure the production `NEXT_PUBLIC_API_URL`.
3. Ensure the backend permits the deployed frontend origin through CORS.
4. Deploy the application.
5. Test authentication, dashboards, submissions, and reviews.

### Backend Deployment

The server can be deployed to a suitable Node.js hosting platform, including Vercel when correctly configured for serverless execution.

1. Configure production environment variables.
2. Set up a production PostgreSQL database.
3. Configure the database connection and Prisma Client generation.
4. Run the appropriate production database migrations.
5. Ensure the deployment entry point and serverless configuration match the application.
6. Configure CORS, authentication secrets, and cookie settings.
7. Deploy and test the API endpoints.

### Production Checklist

- [ ] Frontend environment variables configured
- [ ] Backend environment variables configured
- [ ] Production database connected
- [ ] Database migrations applied
- [ ] CORS configured for the frontend domain
- [ ] Authentication and cookie behavior verified
- [ ] Public and protected API endpoints tested
- [ ] Student, mentor, and admin permissions verified

## Security Considerations

- Hash passwords before storing them.
- Enforce authentication and role-based authorization on the backend.
- Validate incoming data.
- Use strong, unique authentication secrets.
- Keep environment files and credentials out of version control.
- Configure secure cookies and production CORS policies where applicable.
- Apply rate limiting to sensitive endpoints.
- Avoid exposing sensitive authentication data to the browser.

## Contributing

1. Fork or clone the relevant repository.
2. Create a feature branch.
3. Implement and test your changes.
4. Commit changes with descriptive messages.
5. Open a pull request.

## License

This project was developed as a full-stack project submission and review platform. Add a `LICENSE` file if the project will be distributed under a specific open-source license.
