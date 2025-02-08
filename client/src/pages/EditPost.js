import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";

export default function EditPost() {
  const { id } = useParams(); // Get the post ID from the URL params
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(null); // Initialize as null to handle file input correctly
  const [redirect, setRedirect] = useState(false);
  const [currentCoverImage, setCurrentCoverImage] = useState(null); // To hold the current image URL

  useEffect(() => {
    // Fetch the post details from the API
    fetch(`http://localhost:4000/api/post/getPostById/${id}`)
      .then((response) => response.json())
      .then((postInfo) => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
        setCurrentCoverImage(postInfo.cover); // Store current cover image URL
      })
      .catch((error) => console.error("Error fetching post data:", error));
  }, [id]);

  async function updatePost(ev) {
    ev.preventDefault();

    if (!title || !summary || !content) {
      console.error('All fields are required');
      return; // Prevent submission if required fields are empty
    }

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);

    if (files?.[0]) {
      data.set('file', files?.[0]); // Set the image (if provided)
    }

    try {
      const response = await fetch(`http://localhost:4000/api/post/updatePost/${id}`, {
        method: 'PUT',
        body: data,
        credentials: 'include', // Include credentials if necessary (cookies, session)
      });

      if (response.ok) {
        setRedirect(true); // If the post is updated successfully, redirect
      } else {
        console.error('Failed to update post. Status:', response.status);
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  }

  // If redirect is true, navigate to the post's page (or home page as you prefer)
  if (redirect) {
    return <Navigate to={`/post/${id}`} />; // Redirect to the post details page after successful update
  }

  return (
    <form onSubmit={updatePost}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
        required
      />

      {currentCoverImage && (
        <div>
          <img src={`http://localhost:4000/${currentCoverImage}`} alt="Current Cover" style={{ width: '100px', height: 'auto' }} />
          <button
            type="button"
            onClick={() => setFiles(null)} // Allow removing the current image
            style={{ display: 'block', marginTop: '5px' }}
          >
            Remove Image
          </button>
        </div>
      )}

      <input
        type="file"
        onChange={(ev) => setFiles(ev.target.files)}
      />

      <Editor onChange={setContent} value={content} />

      <button type="submit" style={{ marginTop: '5px' }}>Update Post</button>
    </form>
  );
}
