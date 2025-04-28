# Hackathon Event & Housing Portal

This project, ResRelate, was developed during a hackathon jointly hosted by the University of Denver, Metropolitan State University, and the University of Colorado Denver. The challenge theme was to build tools that enhance campus life-whether through better scheduling, easier campus navigation, or improved communication between students, faculty, and administration.

We chose to create ResRelate as a modern alternative to the existing campus housing portal and information sites, aiming to make housing processes and student engagement simpler and more effective.

Contributors:
Ender Peyzner, Jaxon Packer, Wade Massey, Sam Myers, Zach Degidio

Note:
Although the hackathon lasted 26 hours, our team was only able to code for about 6 hours. Most of us were away for lacrosse playoffs and spent nearly 10 hours driving back with no internet access. Despite the time crunch, we’re proud of what we accomplished and excited to share it!

---

## Project Overview

This platform allows students to:
- **Register and log in securely**
- **Chat in real time with other users**
- **Create and View events**
- **View housing resources**

Our goal was to make campus life easier by bringing together communication and essential services in a single, easy-to-use web app.

---

## Tech Stack & Skills Learned

During this project, we learned and applied:
- **React** (frontend UI)
- **Express.js** (backend API)
- **MongoDB & Mongoose** (database and data modeling)
- **React Context** for user authentication state
- **CSS Modules** for component styling
- **Frontend/Backend integration** (CORS, JSON APIs)
- **Error handling & debugging** in full-stack apps

---

## Features

- User registration & login with passwords
- Real-time chat between users
- Event creation and display
- Housing application resource links and information
- Responsive, clean UI with React and CSS Modules

---

## Known Issues & Future Improvements

- **Event sign-up is not fully functional:**  
  Users can attempt to sign up for events, but the system throws an error. We would need to link events to users specifically in order to track registered events.
- **More robust error handling and user feedback**
- **Admin features:**  
  Event moderation, user management, and housing application review.
- **Unit and integration tests**
- **UI/UX polish:**  
  Add loading indicators, better mobile support, and accessibility improvements.

---

## How to Run

1. **Clone this repo**
2. **Install dependencies**  
   Run `npm install` in both `/client` and `/server` folders.
3. **Start MongoDB** (cloud or local)
4. **Start the backend**  
   `node server.js` (or `npm run start` if set up)
5. **Start the frontend**  
   `npm start` in the `/client` folder
6. **Visit** `http://localhost:3000` in your browser

---

Thank you!

