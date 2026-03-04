# UBER Frontend

React + Vite client for user and captain authentication flows.

## Tech Stack
- React 19
- Vite 7
- React Router
- Axios
- Tailwind CSS 4

## Environment
Create `frontend/.env`:

```env
VITE_BASE_URL=http://localhost:4000/
```

`VITE_BASE_URL` must include a trailing `/`.

## Install and Run
```bash
npm install
npm run dev
```

## Current Routes
Defined in `frontend/src/App.jsx`:

- `/` -> `Start`
- `/user-login` -> `UserLogin`
- `/user-signup` -> `UserSignup`
- `/captain-login` -> `CaptainLogin`
- `/captain-signup` -> `CaptainSignup`
- `/home` -> `UserProtectedWrapper` + `Home`
- `/captain-home` -> `CaptainProtectedWrapper` + `CaptainHome`
- `/user-logout` -> `UserProtectedWrapper` + `UserLogout`
- `/captain-logout` -> `CaptainProtectedWrapper` + `UserLogout`

## Auth and API Integration
- `UserLogin` and `CaptainLogin` call backend login endpoints and store JWT in `localStorage` as `token`.
- `UserSignup` and `CaptainSignup` call backend register endpoints.
- `CaptainSignup` fetches vehicle types from `GET /captains/vehicle-types`.
- `UserProtectedWrapper` verifies token with `GET /users/profile`.
- `CaptainProtectedWrapper` verifies token with `GET /captains/profile`.
- On profile fetch failure, wrappers clear the token and redirect to the related login page.

## Ride Flow (Home)
- `Home` now drives a 3-step bottom-sheet flow using GSAP translate animations:
  - location search panel
  - vehicle selection panel
  - ride confirmation panel
- Selecting a location in `LocationSearchPanel` closes the location sheet and opens `VehiclePanel`.
- Selecting a vehicle in `VehiclePanel` opens `ConfirmedRide` and closes the vehicle panel.
- Vehicle cards use Tailwind hover-only borders (`border-transparent` + `hover:border-black`) so borders appear only on hover.
