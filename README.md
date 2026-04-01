# Princess Voyage - Bus Booking Application

## Overview
Princess Voyage is a bus booking web app with simple local signup/login and ticket generation.

## Features
- User signup and login (stored in browser localStorage)
- Bus route booking flow
- Payment confirmation simulation
- Ticket generation with QR code
- Ticket image save

## Tech Stack
- Backend: Node.js + Express (static file server)
- Frontend: HTML, CSS, JavaScript
- Ticket libs: HTML2Canvas, QRious

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Start server
```bash
npm start
```

App URL: `http://localhost:3000`

## Auth Behavior
- Signup data is saved in browser localStorage key `users`
- Login checks localStorage users by phone + password
- Current session uses localStorage keys `token` and `user`

## File Structure
```text
project/
  server.js
public/
  debug.html
  login.html
  signup.html
index.html
payment.html
ticket.html
script.js
payment.js
ticket.js
style.css
```

## Notes
- No SQL database is used
- No backend login/signup API is required for auth
- Clearing browser storage removes locally saved accounts
