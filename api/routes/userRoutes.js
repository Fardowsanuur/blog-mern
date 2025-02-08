// const express = require('express');
// const router = express.Router();
// const { getAllUsers, deleteUser , deletePost } = require('../controllers/userController'); // Corrected import
// const checkAdmin = require('../middleware/checkAdmin');

// // Route to get all users
// router.get('/getAllUsers', getAllUsers);

// // Delete user route (protected by checkAdmin middleware)
// router.delete('/:userId', checkAdmin, deleteUser); // Use deleteUser here instead of UserController.deleteUser

// router.delete('/deletepost/:id', deletePost);
// module.exports = router;
// const express = require('express');
// const router = express.Router();
// const { getAllUsers , getTotalUsers , deleteUser} = require('../controllers/userController'); // Import user-related controllers
// // Import deletePost from postController
// const checkAdmin = require('../middleware/checkAdmin');

// // Route to get all users
// router.get('/getAllUsers', getAllUsers);

// // Delete user route (protected by checkAdmin middleware)
// // Route to get total posts
// router.get("/getTotalUsers",checkAdmin ,  getTotalUsers);

// // Route to delete a user (protected by checkAdmin middleware)
// router.delete("/user/:id", checkAdmin, deleteUser);  // New DELETE route

// module.exports = router;
// In your routes file (e.g., userRoutes.js)
const express = require('express');
const router = express.Router();
const { getAllUsers, getTotalUsers, deleteUser } = require('../controllers/userController'); // Import user-related controllers
const checkAdmin = require('../middleware/checkAdmin');

// Route to get all users
router.get('/getAllUsers', getAllUsers);

// Route to get total users
router.get('/getTotalUsers', checkAdmin, getTotalUsers);

// Route to delete a user (protected by checkAdmin middleware)
// Backend route: routes/user.js
router.delete('/user/:id', deleteUser);  // Ensure this route exists and is correctly set

 // New DELETE route

module.exports = router;
