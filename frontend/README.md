# UBER Frontend

A React + Vite frontend for the UBER clone. The current build includes the landing page plus user/captain auth screens with form state handling (UI only, no API wiring yet).

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
- **Home**: Full-screen hero with Uber branding, background image, and a “Continue” CTA that routes to user login.
- **User Login**: Controlled email/password inputs, submit handler, link to user signup, and CTA to captain login.
- **User Signup**: Controlled first/last name + email/password inputs, submit handler, and link to user login.
- **Captain Login**: Controlled email/password inputs, submit handler, link to captain signup, and CTA to user login.
- **Captain Signup**: Controlled first/last name + email/password inputs, submit handler, and link to captain login.

## Styling
Tailwind CSS utility classes are used throughout pages (see `src/pages/Home.jsx` and `src/pages/UserLogin.jsx`).
