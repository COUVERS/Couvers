# TeTe

A teacher-training platform for partner schools. Educators sign up with their school email, work through short courses on core teaching skills, pass a quiz to unlock each next lesson, and earn a certificate when they finish a course. A dashboard shows their progress and a skill radar chart.

Team project, Langara College, Web and Mobile App Design and Development (Jan–Apr 2026).

## Features

- **School-only accounts.** Sign-up is restricted to registered school email domains. Passwords are hashed with bcrypt, sessions use JWT, and users can reset or change their password.
- **Courses and lessons.** Five courses: Fundamentals of Teaching, Effective Communication, Empathy and Classroom Management, Lesson Planning, and Assessment and Feedback.
- **Quiz-gated progress.** Each lesson ends with a 5-question quiz. Scoring 80% (4 of 5) or higher unlocks the next lesson. Every attempt is saved, the best score counts, and passed lessons add up to a 100-point score per skill.
- **Certificates.** Completing every lesson in a course issues a certificate.
- **Dashboard.** Skill radar chart, course progress, the next lesson to continue, lessons to review, and earned certificates.

## Tech stack

| Layer | Tools |
| --- | --- |
| Frontend | React 19, Vite, Material UI, React Router |
| Backend | Node.js, Express 5, JWT, bcrypt |
| Database | MongoDB, Mongoose (9 models) |
| Storage | Firebase Storage |
| Deployment | Render |

## Data model

`User` · `Course` · `Lesson` · `Quiz` · `Skill` · `LessonProgress` · `QuizAttempt` · `SkillProgress` · `Certificate`

## API overview

Every route except sign-up, login and password reset requires a JWT.

| Route | Purpose |
| --- | --- |
| `POST /auth/signup`, `/auth/login`, `/auth/forgot-password`, `/auth/reset-password`, `/auth/change-password` | Accounts and passwords |
| `GET /auth/me` | Current user |
| `GET /api/courses`, `/api/courses/:id/full` | Course list and a course with its lessons |
| `POST /api/lessons/:lessonId/start`, `/api/lessons/:lessonId/submit` | Start a lesson, submit its quiz |
| `GET /api/dashboard/skills`, `/courses`, `/next-lesson`, `/review-lesson`, `/certificates` | Dashboard data |

## Running locally

**Backend**

```bash
cd backend
npm install
# create backend/.env with MONGO_URI, JWT_SECRET and PORT (default 5050)
npm run seed:empathy   # optional: load sample course content
npm start
```

**Frontend**

```bash
npm install
# create .env with VITE_API_BASE_URL and the VITE_FIREBASE_* values
npm run dev
```

## Team

- Moonju (Bella) Ra — Full-Stack Developer 
- Rika Goto — Full-Stack Developer
- Carlos Martínez — Full-Stack Developer

## License

MIT