const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');

// Import Routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const reportRoutes = require('./routes/reportRoutes'); // In case you have report routes

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',  // Your frontend URL
  credentials: true,  // Allow cookies to be sent
}));




// Midleware
// app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

// MongoDB connection
mongoose.connect('mongodb+srv://luulh32:a9C34eJrsZlQrAsw@cluster0.vy7k5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Set up routes for different APIs
app.use('/api/user', userRoutes);       // User-related routes (e.g., get all users)
app.use('/api/auth', authRoutes);       // Authenticatitgion routes (e.g., login, register, logout)
app.use('/api/post', postRoutes);       // Post-relted routes (e.g., create, get posts)
app.use('/api/report', reportRoutes);   // Report-related routes (e.g., get report, admin only)

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});



