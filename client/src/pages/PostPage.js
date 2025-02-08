// import { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { formatISO9075 } from "date-fns";
// import { UserContext } from "../UserContext";
// import { Link } from 'react-router-dom';

// export default function PostPage() {
//   const [postInfo, setPostInfo] = useState(null);  // Initialize state as null
//   const { userInfo } = useContext(UserContext);
//   const { id } = useParams();

//   useEffect(() => {
//     // Fetch the post data
//     fetch(`http://localhost:4000/api/post/getPostById/${id}`)
//       .then(response => response.json())
//       .then(postInfo => {
//         setPostInfo(postInfo);
//       })
//       .catch((error) => {
//         console.error("Error fetching post data:", error);
//       });
//   }, [id]);

//   // Check if postInfo and postInfo.author exist before rendering
//   if (!postInfo || !postInfo.author) {
//     return <div>Loading...</div>;  // Render loading state if data is not yet available
//   }

//   const { title, createdAt, cover, content, author } = postInfo;

//   return (
//     <div className="post-page">
//       <h1>{title}</h1>
//       <time>{formatISO9075(new Date(createdAt))}</time>
//       <div className="author">
//         by @{author?.username || 'Unknown'}  {/* Safely access author.username */}
//       </div>
//       {userInfo.id === author._id && (
//         <div className="edit-row">
//           <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
//             </svg>
//             Edit this post
//           </Link>
//         </div>
//       )}
//       <div className="image">
//         <img
//           src={`http://localhost:4000/${cover}`} // Assuming cover path is correct
//           alt="Cover"
//         />
//       </div>
//       <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
//     </div>
//   );
// }
import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null); // Initialize state as null
  const [loading, setLoading] = useState(true);  // Add loading state
  const [error, setError] = useState(null);      // Add error state
  const { userInfo } = useContext(UserContext);
  const { id } = useParams(); // Get post ID from route parameters

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`http://localhost:4000/api/post/getPostById/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch post with ID ${id}. Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched Post:", data); // Log fetched post for debugging
        setPostInfo(data.post); // Correctly set the post object
      } catch (err) {
        console.error("Error fetching post:", err);
        setError(err.message);
      } finally {
        setLoading(false); // Stop loading once fetch is complete
      }
    }
    fetchPost();
  }, [id]);

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Check if postInfo exists and render post details
  if (!postInfo) {
    return <div>Post not found or missing data.</div>;
  }

  const { title, createdAt, cover, content, author } = postInfo;

  return (
    <div className="post-page">
      <h1>{title}</h1>
      <time>{formatISO9075(new Date(createdAt))}</time>
      <div className="author">by @{author?.username || "Unknown"}</div>
      {userInfo?.id === author?._id && (
        <div className="edit-row">
          <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            Edit this post
          </Link>
        </div>
      )}
      <div className="image">
        <img
          src={`http://localhost:4000/${cover}`} // Assuming cover path is correct
          alt="Cover"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: content }} // Render HTML safely
      />
    </div>
  );
}

