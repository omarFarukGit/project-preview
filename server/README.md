# ProjectPreview — Server

A role-based project submission and review platform built with **Node.js, Express.js, TypeScript, and Prisma**. Students can submit their projects for evaluation, mentors can review submissions and provide feedback, and admins can manage users and platform activities.

## Features

- **Authentication & Authorization** — Secure authentication with role-based access control.
- **Student Dashboard** — Submit projects, manage submissions, and track review status.
- **Mentor Dashboard** — Review student submissions and monitor submission statistics.
- **Admin Dashboard** — Manage users, promote students to mentors, and oversee submissions.
- **Submission Management** — Create, retrieve, and manage project submissions.
- **Input Validation** — Validate request data using Zod.
- **Duplicate Prevention** — Prevent duplicate project submissions where applicable.
- **Rate Limiting** — Limit submission requests to help prevent abuse.
- **Pagination & Search** — Retrieve submission lists efficiently.
- **Student Statistics** — Track submission counts and review results.
- **User Management** — Manage user status and account availability.
- **Error Handling** — Centralized error handling with consistent API responses.

## Tech Stack

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

## Project Structure

```text
project-preview/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── config/
│   ├── lib/
│   ├── middlewares/
│   ├── modules/
│   │   ├── auth/
│   │   ├── users/
│   │   └── submissions/
│   ├── routes/
│   ├── utils/
│   └── types/
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

*The structure above represents the intended organization; adjust it to match the actual repository.*

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm
- PostgreSQL
- Git

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

Create a `.env` file in the project root and configure the required values.

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

Add any additional environment variables required by the implementation, such as email or Redis configuration.

**Security:** Use strong, unique secrets and never commit your `.env` file to Git.

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Run Database Migrations

For development:

```bash
npx prisma migrate dev
```

### 6. Seed the Database

If the project includes a configured Prisma seed script:

```bash
npx prisma db seed
```

The seed process can be used to create the initial admin account and development test users.

### 7. Start the Development Server

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:5000
```

Use the configured health-check or API base route to verify that the server is running.

## User Roles

| Role | Permissions |
|---|---|
| `STUDENT` | Submit projects, view personal submissions, and track submission statistics |
| `MENTOR` | View submissions, review projects, and access review statistics |
| `ADMIN` | Manage users, promote students to mentors, and oversee platform submissions |

Students can register through the public registration flow. Admin accounts should be provisioned through the seed process or another authorized administrative procedure.

## API Overview

The API is organized around authentication, user management, and project submissions.

| Method | Endpoint | Access |
|---|---|---|
| `POST` | `/api/v1/auth/register` | Public |
| `POST` | `/api/v1/auth/login` | Public |
| `GET` | `/api/v1/users/me` | Authenticated |
| `PATCH` | `/api/v1/users/:id/role` | Admin |
| `POST` | `/api/v1/submissions` | Student |
| `GET` | `/api/v1/submissions/my-submissions` | Student |
| `GET` | `/api/v1/submissions/my-stats` | Student |
| `GET` | `/api/v1/submissions/stats` | Mentor/Admin |
| `GET` | `/api/v1/submissions` | Mentor/Admin |
| `GET` | `/api/v1/submissions/:id` | Authorized users |

> **Note:** These endpoints are representative of the planned API. Update the paths and permissions to match the implemented routes.

## Available Scripts

Run the scripts defined in `package.json`. Common examples include:

```bash
npm run dev
npm run build
npm start
```

Database commands:

```bash
npx prisma generate
npx prisma migrate dev
npx prisma db seed
```

## Error Handling and Validation

The server uses structured request validation and centralized error handling to provide consistent API responses. Protected endpoints enforce authentication and role-based authorization.

## Deployment

Before deploying to production:

1. Configure production environment variables.
2. Set up a production PostgreSQL database.
3. Run the appropriate production database migrations.
4. Generate the Prisma Client.
5. Build and start the server using the production scripts.
6. Configure CORS, authentication secrets, and any required external services.

## Security Considerations

- Passwords are hashed before storage.
- Protected routes require appropriate authentication.
- Role-based access control restricts privileged operations.
- Request validation helps reject invalid input.
- Rate limiting helps reduce abusive requests.
- Secrets and database credentials must remain private.

## Contributing

1. Create a feature branch.
2. Implement and test your changes.
3. Commit your changes with a descriptive message.
4. Open a pull request for review.

## License

This project was developed as a project submission dashboard application. Add a license file if the project will be distributed under a specific open-source license.
