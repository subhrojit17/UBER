# UBER Frontend

A React + Vite frontend for the UBER clone. This app currently includes the landing page and auth UI pages for users and captains.

## Tech Stack
- React 19
- Vite 7
- React Router 7
- Tailwind CSS 4

## Project Structure
```
Frontend/
|-- public/
|-- src/
|   |-- assets/
|   |-- pages/
|   |   |-- Home.jsx
|   |   |-- UserLogin.jsx
|   |   |-- UserSignup.jsx
|   |   |-- CaptainLogin.jsx
|   |   |-- CaptainSignup.jsx
|   |-- App.jsx
|   |-- App.css
|   |-- main.jsx
|   |-- index.css
|-- index.html
|-- package.json
|-- vite.config.js
```

## Getting Started

Install dependencies:
```bash
npm install
```

Run the dev server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Routes
Defined in `src/App.jsx`:
- `/` renders `Home`
- `/user-login` renders `UserLogin`
- `/user-signup` renders `UserSignup`
- `/captain-login` renders `CaptainLogin`
- `/captain-signup` renders `CaptainSignup`

## Pages Implemented
- **Home**: Full-screen hero with Uber branding, background image, and "Continue" CTA to user login.
- **User Login**: Email and password form UI with links to sign up; includes a CTA button to sign in as captain.
- **User Signup**: Placeholder page.
- **Captain Login**: Placeholder page.
- **Captain Signup**: Placeholder page.

## Styling
Tailwind CSS utility classes are used throughout pages (see `src/pages/Home.jsx` and `src/pages/UserLogin.jsx`).

