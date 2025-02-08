// const Post = require('../models/Post');
// const fs = require('fs');
// const multer = require('multer');
// const uploadMiddleware = multer({ dest: 'uploads/' });

// exports.createPost = [uploadMiddleware.single('file'), async (req, res) => {
//   const { title, summary, content, authorId } = req.body;
//   const { originalname, path } = req.file;
//   const parts = originalname.split('.');
//   const ext = parts[parts.length - 1];
//   const newPath = path + '.' + ext;
//   fs.renameSync(path, newPath);

//   try {
//     const postDoc = await Post.create({
//       title,
//       summary,
//       content,
//       cover: newPath,
//       author: authorId,
//     });
//     res.json(postDoc);
//   } catch (err) {
//     res.status(500).json('Error creating post');
//   }
// }];

// Controller: getAllPosts
// ;


// exports.getLastPost = async (req, res) => {
//   try {
//     const post = await Post.findOne()
//       .populate('author', ['username'])
//       .sort({ createdAt: -1 });  // Sorting by createdAt in descending order to get the latest post

//     if (!post) {
//       return res.status(404).json('No posts found');
//     }

//     res.json(post);
//   } catch (err) {
//     res.status(500).json('Error fetching the last post');
//   }
// };



// exports.getPostById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const post = await Post.findById(id).populate('author', ['username']);
//     res.json(post);
//   } catch (err) {
//     res.status(500).json('Error fetching post');
//   }
// };
// // In the post controller (postController.js)

// exports.updatePost = [uploadMiddleware.single('file'), async (req, res) => {
//   const { id, title, summary, content } = req.body;
//   const { originalname, path } = req.file || {};  // If file is uploaded, process it
//   let updatedPostData = { title, summary, content };

//   // If a new file is uploaded, update the post with the new file
//   if (originalname) {
//     const ext = originalname.split('.').pop();
//     const newPath = path + '.' + ext;
//     fs.renameSync(path, newPath);
//     updatedPostData.cover = newPath;  // Update the file path for the cover image
//   }

//   try {
//     const updatedPost = await Post.findByIdAndUpdate(id, updatedPostData, { new: true });
//     if (!updatedPost) {
//       return res.status(404).json({ error: "Post not found" });
//     }
//     res.json(updatedPost);  // Return the updated post
//   } catch (err) {
//     res.status(500).json('Error updating post');
//   }
// }];





const Post = require('../models/Post');
// const fs = require('fs');
const fs = require('fs').promises; 
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const path = require('path')
const mongoose = require('mongoose');



// exports.createPost = async (req, res) => {
//   try {
//     const { title, summary, content, authorId } = req.body;

//     if (!title || !summary || !content || !authorId) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     if (!req.file) {
//       return res.status(400).json({ message: 'File upload is required' });
//     }

//     const { originalname, path } = req.file;
//     const ext = originalname.split('.').pop();
//     const newPath = `${path}.${ext}`;

//     // Rename uploaded file
//     fs.renameSync(path, newPath);

//     // Validate `authorId` as ObjectId
//     const mongoose = require('mongoose');
//     if (!mongoose.Types.ObjectId.isValid(authorId)) {
//       return res.status(400).json({ message: 'Invalid authorId' });
//     }

//     // Create the post
//     const postDoc = await PostModel.create({
//       title,
//       summary,
//       content,
//       cover: newPath,
//       author: authorId,
//     });

//     res.status(201).json(postDoc);
//   } catch (error) {
//     console.error('Error creating post:', error);
//     res.status(500).json({ message: 'Error creating post', error: error.message });
//   }
// };

// Get all posts (with pagination)
exports.createPost = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);

    let { title, summary, content, authorId } = req.body;

    if (!authorId) {
      authorId = req.cookies.userId; // ✅ Get userId from cookies
    }

    if (!title || !summary || !content || !authorId) {
      console.error('Missing fields:', { title, summary, content, authorId });
      return res.status(400).json({ message: 'Missing required fields (title, summary, content, authorId)' });
    }

    if (!mongoose.Types.ObjectId.isValid(authorId)) {
      console.error('Invalid authorId format:', authorId);
      return res.status(400).json({ message: 'Invalid authorId format' });
    }

    if (!req.file) {
      console.error('File upload missing');
      return res.status(400).json({ message: 'File upload is required' });
    }

    const { originalname, path: filePath } = req.file;
    const ext = originalname.split('.').pop();
    const newPath = `${filePath}.${ext}`;

    await fs.rename(filePath, newPath);

    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: authorId,
    });

    res.status(201).json(postDoc);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Error creating post', error: error.message });
  }
};




exports.getAllPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default page and limit
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .populate('author', ['username'])
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalCount = await Post.countDocuments();

    res.json({ posts, totalCount });
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ message: 'Error fetching posts' });
  }
};

// Get the last post
exports.getLastPost = async (req, res) => {
  try {
    const post = await Post.findOne()
      .populate('author', ['username'])
      .sort({ createdAt: -1 });

    if (!post) {
      return res.status(404).json({ message: 'No posts found' });
    }

    res.json({ post });
  } catch (err) {
    console.error('Error fetching the last post:', err);
    res.status(500).json({ message: 'Error fetching the last post' });
  }
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate('author', ['username']);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ post });
  } catch (err) {
    console.error('Error fetching post:', err);
    res.status(500).json({ message: 'Error fetching post' });
  }
};

// Update a post by ID
exports.updatePost = [uploadMiddleware.single('file'), async (req, res) => {
  const { id, title, summary, content } = req.body;
  let updatedPostData = { title, summary, content };
  
  // Check if a new file is uploaded
  const { originalname, path } = req.file || {};
  if (originalname) {
    const ext = originalname.split('.').pop();
    const newPath = `${path}.${ext}`;

    // Rename the uploaded file with the correct extension
    await fs.rename(path, newPath);

    // Get the current post to delete the old cover image
    const oldPost = await Post.findById(id);
    if (oldPost && oldPost.cover) {
      try {
        // Delete the old cover image
        await fs.unlink(oldPost.cover);
      } catch (err) {
        console.error('Error deleting old cover image:', err);
      }
    }

    // Add the new cover image path to the updated data
    updatedPostData.cover = newPath;
  }

  try {
    // Update the post with the new data
    const updatedPost = await Post.findByIdAndUpdate(id, updatedPostData, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(updatedPost);
  } catch (err) {
    console.error('Error updating post:', err);
    res.status(500).json({ message: 'Error updating post' });
  }
}];


// 
// Use promises-based fs for async/await


// Delete a post by ID
exports.deletePost = async (req, res) => {
  const { id } = req.params; // Get post ID from request parameters
  
  try {
    // Find the post by ID in the database
    const post = await Post.findById(id);
    
    // If the post is not found, return a 404 error
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the post has a cover image and delete it if it exists
    if (post.cover) {
      // Ensure the file exists before trying to delete it
      try {
        await fs.unlink(post.cover); // Asynchronous file deletion
        console.log(`Deleted cover image: ${post.cover}`);
      } catch (err) {
        console.error(`Error deleting image ${post.cover}:`, err);
      }
    }

    // Delete the post from the database
    await Post.findByIdAndDelete(id);

    // Respond with a success message after deletion
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('Error deleting post:', err);
    // Respond with a 500 error if something goes wrong during the deletion
    res.status(500).json({ message: 'Error deleting post' });
  }
};

// Controller to get the total number of posts
exports.getTotalPosts = async (req, res) => {
  try {
    const totalPosts = await Post.countDocuments(); // Replace with actual post fetching logic
    res.json({ total: totalPosts });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching total posts' });
  }
};
exports.getPost = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', ['username'])
      .sort({ createdAt: -1 })
      .limit(20); // Fetch only the latest 20 posts

    res.json(posts); // Ensure you're returning valid JSON
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: 'Error fetching posts' }); // Send error as JSON
  }
}