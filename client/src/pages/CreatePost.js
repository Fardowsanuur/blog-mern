

// import ReactQuill from "react-quill";
// import 'react-quill/dist/quill.snow.css';
// import {useState} from "react";
// import {Navigate} from "react-router-dom";
// import Editor from "../Editor";

// export default function CreatePost() {
//   const [title,setTitle] = useState('');
//   const [summary,setSummary] = useState('');
//   const [content,setContent] = useState('');
//   const [files, setFiles] = useState('');
//   const [redirect, setRedirect] = useState(false);
//   async function createNewPost(ev) {
//     const data = new FormData();
//     data.set('title', title);
//     data.set('summary', summary);
//     data.set('content', content);
//     data.set('file', files[0]);
//     ev.preventDefault();
//     const response = await fetch('http://localhost:4000/api/post/createPost', {
//       method: 'POST',
//       body: data,
//       credentials: 'include',
//     });
//     if (response.ok) {
//       setRedirect(true);
//     }
//   }

//   if (redirect) {
//     return <Navigate to={'/'} />
//   }
//   return (
//     <form onSubmit={createNewPost}>
//       <input type="title"
//              placeholder={'Title'}
//              value={title}
//              onChange={ev => setTitle(ev.target.value)} />
//       <input type="summary"
//              placeholder={'Summary'}
//              value={summary}
//              onChange={ev => setSummary(ev.target.value)} />
//       <input type="file"
//              onChange={ev => setFiles(ev.target.files)} />
//       <Editor value={content} onChange={setContent} />
//       <button style={{marginTop:'5px'}}>Create post</button>
//     </form>
//   );
//  }
// import ReactQuill from "react-quill";
// import 'react-quill/dist/quill.snow.css';
// import { useState } from "react";
// import { Navigate } from "react-router-dom";
// import Cookies from 'js-cookie'; // Import js-cookie to access cookies
// import Editor from "../Editor";

// export default function CreatePost() {
//   const [title, setTitle] = useState('');
//   const [summary, setSummary] = useState('');
//   const [content, setContent] = useState('');
//   const [files, setFiles] = useState('');
//   const [redirect, setRedirect] = useState(false);

//   async function createNewPost(ev) {
//     ev.preventDefault();

//     const userId = Cookies.get('userId'); // Extract userId from cookies
//     if (!userId) {
//       alert('User is not logged in');
//       return;
//     }

//     const data = new FormData();
//     data.set('title', title);
//     data.set('summary', summary);
//     data.set('content', content);
//     data.set('authorId', userId);  // Add the userId (authorId) to the request
//     data.set('file', files[0]);    // Handle file upload

//     try {
//       const response = await fetch('http://localhost:4000/api/post/createPost', {
//         method: 'POST',
//         body: data,
//         credentials: 'include',  // Include credentials (cookies)
//       });

//       if (response.ok) {
//         setRedirect(true);  // Redirect to home after post creation
//       } else {
//         const errorData = await response.json();
//         alert(errorData.message || 'Failed to create post');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Error creating post');
//     }
//   }

//   if (redirect) {
//     return <Navigate to="/" />;  // Redirect to homepage on successful post creation
//   }

//   return (
//     <form onSubmit={createNewPost}>
//       <input
//         type="text"
//         placeholder="Title"
//         value={title}
//         onChange={ev => setTitle(ev.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Summary"
//         value={summary}
//         onChange={ev => setSummary(ev.target.value)}
//       />
//       <input
//         type="file"
//         onChange={ev => setFiles(ev.target.files)}
//       />
//       <Editor value={content} onChange={setContent} />
//       <button style={{ marginTop: '5px' }}>Create Post</button>
//     </form>
//   );
// }


import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {useState} from "react";
import {Navigate} from "react-router-dom";
import Editor from "../Editor";

export default function CreatePost() {
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  async function createNewPost(ev) {
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/api/post/createPost/:id', {
      method: 'POST',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <form onSubmit={createNewPost}>
      <input type="title"
             placeholder={'Title'}
             value={title}
             onChange={ev => setTitle(ev.target.value)} />
      <input type="summary"
             placeholder={'Summary'}
             value={summary}
             onChange={ev => setSummary(ev.target.value)} />
      <input type="file"
             onChange={ev => setFiles(ev.target.files)} />
      <Editor value={content} onChange={setContent} />
      <button style={{marginTop:'5px'}}>Create post</button>
    </form>
  );
}