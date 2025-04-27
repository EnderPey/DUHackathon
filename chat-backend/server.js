// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const ChatMessage = require("./models/ChatMessage");

const app = express();
const PORT = process.env.PORT || 8080;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Middleware
app.use(cors({origin: true, credentials:true}));
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb+srv://enderPey:tVP4z3ZK2l7sYPKS@chattest.p99wfmf.mongodb.net/?retryWrites=true&w=majority&appName=ChatTest")
.then(() => console.log("✅ MongoDB connected!"))
.catch(err => console.error("❌ MongoDB connection error:", err));
;

// Routes
app.get("/messages", async (req, res) => {
	try {
		const messages = await ChatMessage.find();
		res.json(messages);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.delete("/messages", async (req, res) => {
	try {
	  await ChatMessage.deleteMany({}); // Deletes all documents in the collection
	  res.status(200).json({ message: "Chat cleared successfully!" });
	} catch (error) {
	  console.error("Error clearing chat:", error);
	  res.status(500).json({ error: "Failed to clear chat" });
	}
  });

app.post("/messages", async (req, res) => {
	try {
		const { user, message } = req.body;

		if (!user || !message) {
			return res
				.status(400)
				.json({ error: "User and message are required" });
		}

		const chatMessage = new ChatMessage({
			user,
			message,
		});

		await chatMessage.save();

		res.status(201).json(chatMessage);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

// server.js


// Add user model
const User = mongoose.model('User', new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String
}));

// Auth Routes
app.post('/api/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    });
    await user.save();
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

app.post('/api/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send('User not found');
  
  if (await bcrypt.compare(req.body.password, user.password)) {
    const token = jwt.sign({ userId: user._id }, 'your-secret-key');
    res.cookie('token', token, { httpOnly: true });
    res.json({ username: user.username });
  } else {
    res.status(401).send('Wrong password');
  }
});

app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.sendStatus(200);
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
