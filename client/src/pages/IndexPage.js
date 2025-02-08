import { useEffect, useState } from "react";
import Post from "../Post";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [latestPost, setLatestPost] = useState(null); // Store the latest post

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/post/getPost');
        const posts = await response.json();
        console.log(posts);  // Check if the author is populated corectly
        setPosts(posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
  
    fetchPosts();
  }, []);
 

  return (
    <>
      {latestPost && (
        <div>
          <h2>Latest Post</h2>
          <Post key={latestPost._id} {...latestPost} /> {/* Display the latest post */}
        </div>
      )}

      {posts.length > 0 ? (
        posts.map(post => (
          post.author ? <Post key={post._id} {...post} /> : null
        ))
      ) : (
        <div>No posts available</div>
      )}
    </>
  );
}
