// Backend: Example code to return total users
const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default limit of 10 users per page
    const skip = (page - 1) * limit;

    // Fetch total user count
    const totalUsers = await User.countDocuments();

    // Count users created in the last month
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: new Date(new Date() - 30 * 24 * 60 * 60 * 1000) },
    });

    // Fetch paginated users
    const users = await User.find()
      .sort({ createdAt: -1 }) // Optional: Sort by most recent
      .skip(skip)
      .limit(limit);

    // Respond with users and additional data
    res.json({
      totalUsers,
      lastMonthUsers,
      users, // Include the users array
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: 'Error fetching users' });
  }
};



// exports.deleteUser = async (req, res) => {
//   try {
//     const { userId } = req.params; // Get the userId from the URL parameters

//     // Ensure that the user to be deleted exists
//     const userToDelete = await User.findById(userId);
//     if (!userToDelete) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Check if the user attempting to delete is an admin
//     if (!req.user.isAdmin) {
//       return res.status(403).json({ message: 'You do not have permission to delete this user' });
//     }

//     // Delete the user
//     await User.findByIdAndDelete(userId);

//     // Respond with success and additional data
//     res.json({
//       message: 'User deleted successfully',
//       deletedUser: userToDelete, // Optionally, return the deleted user data
//     });
//   } catch (err) {
//     console.error("Error deleting user:", err);
//     res.status(500).json({ message: 'Something went wrong, please try again' });
//   }
// };

// Controller to delete a user
exports.deleteUser = async (req, res) => {
  const { userId } = req.params;  // Extract userId from URL parameters

  try {
    const userToDelete = await User.findById(userId);
    if (!userToDelete) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Optional: Prevent admins from deleting themselves
    if (userToDelete._id.toString() === req.user.id) {
      return res.status(400).json({ message: 'You cannot delete your own account' });
    }

    // Use findByIdAndDelete instead of remove
    await User.findByIdAndDelete(userId); // This will directly delete the user from the database
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Failed to delete user' });
  }
};

// Get total users count
exports.getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.status(200).json({ total: totalUsers });
  } catch (err) {
    console.error("Error fetching total users:", err);
    res.status(500).json({ message: "Failed to fetch total users" });
  }
};