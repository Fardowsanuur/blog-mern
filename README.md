# Blog Application

This is  for a blogging platform built using **Node.js**, **Express.js**, **MongoDB**, and **JWT** (JSON Web Tokens). This API provides full CRUD operations for users and posts with a secure authentication system, file upload support, and role-based authorization.

## Features

### 🔑 **Authentication & Authorization**

- **JWT Authentication**: Securely authenticate users using JSON Web Tokens.
- **Role-based Authorization**: Different access levels for **Admin** and **Regular Users**.
- **Password Hashing**: Use **bcrypt** to securely store user passwords.

### 🗂 **MongoDB Integration**

- **Mongoose ORM**: Seamlessly connect to **MongoDB** using **Mongoose** for efficient data management.
- **Data Models**: Defined models for **User** and **Post**, including **relationships** between them.
- **Indexing**: Implemented MongoDB indexing to optimize database queries.

### 🏗 **MVC Architecture**

- **Models**: Define your database schemas using **Mongoose** for data validation and relationships.
- **Views (Routes)**: RESTful routes for CRUD operations, protected with authentication where necessary.
- **Controllers**: Logic handling for user and post operations, ensuring separation of concerns.

### 📝 **CRUD Operations**

- **Create**: Register new users, create posts with title, content, and cover image.
- **Read**: Fetch user profiles, view all posts, or view a specific post by its ID.
- **Update**: Edit existing posts or user information.
- **Delete**: Delete posts or users as necessary.
  
### 📸 **File Uploads (Multer)**

- Use **Multer** for handling **image uploads** (such as post cover images).
- Files are stored in a designated folder and linked to the corresponding posts.

### 🚨 **Error Handling & Validation**

- Proper validation and error handling for each request to ensure data integrity.
- **Custom error messages** for different failure scenarios (e.g., missing fields, invalid data).
- Use **Mongoose validation** to ensure correct data types and constraints.


---

## API Documentation

### **Authentication**

- **POST** `/api/auth/login`  
  Logs a user in and returns a JWT token.

- **POST** `/api/auth/register`  
  Registers a new user and returns a success message.

### **User Operations**

- **GET** `/api/users/:id`  
  Fetch a specific user's profile by their ID.
  
- **PUT** `/api/users/:id`  
  Update a user's profile.

- **DELETE** `/api/users/:id`  
  Delete a user by ID.

### **Post Operations**

- **GET** `/api/posts`  
  Get all posts with pagination.

- **GET** `/api/posts/:id`  
  Fetch a single post by its ID.

- **POST** `/api/posts`  
  Create a new post with a title, summary, content, and image.

- **PUT** `/api/posts/:id`  
  Update an existing post by its ID.

- **DELETE** `/api/posts/:id`  
  Delete a post by its ID.

---

## Project Setup

### Prerequisites

Ensure that you have the following installed:

- **Node.js** (v14.x or above)
- **MongoDB** (locally or using a service like MongoDB Atlas)




## Key Features:

- ![API Architecture](https://github.com/HawaMuhumedAli/blog-app-mern-s/blob/ea61baa946cbcdc2f4ede5df078b93f60ed8971d/Screenshot%202025-01-31%20041926.png)
- **Role-based Authorization** (Admin vs Regular Users)
- 
            *Admin*: hawa
            *Admin pass*: hawa1234@r



...

