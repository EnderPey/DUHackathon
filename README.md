# Hackathon Event & Housing Portal

Welcome! This project was built in 26 hours during a hackathon to create a web platform for university students to chat, manage events, and apply for housing-all in one place.

---

## 🚀 Project Overview

This platform allows students to:
- **Register and log in securely**
- **Chat in real time** with other users
- **Create, view, and sign up for events**
- **Apply for university housing and view housing resources**

Our goal was to make campus life easier by bringing together communication and essential services in a single, easy-to-use web app.

---

## 🛠️ Tech Stack & Skills Learned

During this project, we learned and applied:
- **React** (frontend UI)
- **Express.js** (backend API)
- **MongoDB & Mongoose** (database and data modeling)
- **JWT Authentication & bcrypt** (secure user authentication)
- **RESTful API design**
- **React Context** for user authentication state
- **CSS Modules** for component styling
- **Async/await** for clean asynchronous code
- **Frontend/Backend integration** (CORS, JSON APIs)
- **Error handling & debugging** in full-stack apps

---

## 📋 Features

- User registration & login with hashed passwords
- Persistent authentication using JWT and cookies
- Real-time chat between users
- Event creation, display, and sign-up
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

## 🙏 Thanks

Thanks for checking out this project!  
We built a lot in just 26 hours and learned a ton about full-stack web development.  
Pull requests and feedback are welcome.

---
