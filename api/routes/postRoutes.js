// // routes/postRoutes.js
// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const uploadMiddleware = multer({ dest: 'uploads/' });

// // Import the controller functions
// const { createPost, getAllPosts, getPostById , updatePost , getLastPost } = require('../controllers/postController');

// // Route for creating a new post (with file upload)
// router.post('/createPost', createPost);

// // Route to get all posts (with pagination or limit)
// router.get('/getAllPosts', getAllPosts);

// router.get('/getLastPost', getLastPost);

// // Route to get a single post by ID
// router.get('/getPostById/:id', getPostById);

// router.put('/updatePost/:id', uploadMiddleware.single('file'), updatePost); // Ensure this route is set up correctly



// module.exports = router;
const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });


const {
  createPost,
  getAllPosts,
  getPost,
  getPostById,
  updatePost,
  getLastPost,
  deletePost,
  getTotalPosts
} = require('../controllers/postController');

// Route to create a new post
router.post('/createPost/:id', uploadMiddleware.single('file'), createPost);

// Get all posts with pagination
router.get('/getAllPosts', getAllPosts);
router.get('/getPost', getPost);

// Get the last post
router.get('/getLastPost', getLastPost);

// Get a single post by ID
router.get('/getPostById/:id', getPostById);

// Update a post by ID
router.put('/updatePost/:id', uploadMiddleware.single('file'), updatePost);
// Example route in your Express API
router.delete('/deletepost/:id', deletePost); 
// Route to get total posts
router.get("/totalPosts", getTotalPosts);

module.exports = router;
