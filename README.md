# Hackathon Event & Housing Portal

Hello, this project was written for a Hackthon run by the University of Denver, Metro State Univerity and University of Colorado Denver. The theme was to develop something that improves campus life, ranging from scheduling and campus navigation to enhancing communication between students, faculty, and administration. We chose to rework the housing pages.


---

## Project Overview

This platform allows students to:
- **Register and log in securely**
- **Chat in real time** with other users
- **Create and View events**
- **View housing resources**

Our goal was to make campus life easier by bringing together communication and essential services in a single, easy-to-use web app.

---

## 🛠️ Tech Stack & Skills Learned

During this project, we learned and applied:
- **React** (frontend UI)
- **Express.js** (backend API)
- **MongoDB & Mongoose** (database and data modeling)
- **RESTful API design**
- **React Context** for user authentication state
- **CSS Modules** for component styling
- **Async/await** for clean asynchronous code
- **Frontend/Backend integration** (CORS, JSON APIs)
- **Error handling & debugging** in full-stack apps

---

## 📋 Features

- User registration & login with passwords
- Real-time chat between users
- Event creation and display
- Housing application resource links and information
- Responsive, clean UI with React and CSS Modules

---

## ⚠️ Known Issues & Future Improvements

- **Event sign-up is not fully functional:**  
  Users can attempt to sign up for events, but the system does not yet track which events a user is registered for in their account. This is a key feature to be completed.
- **Event registration should be linked to user accounts:**  
  Future work will ensure each user has a list of their registered events, visible in their profile.
- **More robust error handling and user feedback**
- **Admin features:**  
  Event moderation, user management, and housing application review.
- **Unit and integration tests**
- **UI/UX polish:**  
  Add loading indicators, better mobile support, and accessibility improvements.

---

## 🏁 How to Run

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

