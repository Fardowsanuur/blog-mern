// import React, { useEffect, useState } from 'react';
// import { useContext } from 'react';
// import { UserContext } from '../UserContext';
// import { Table, Modal, Button } from 'flowbite-react';
// import { HiOutlineExclamationCircle } from 'react-icons/hi';

// export default function DashPosts() {
//   const { userInfo } = useContext(UserContext); // Access userInfo from context
//   const [userPosts, setUserPosts] = useState([]);
//   const [showMore, setShowMore] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [postIdToDelete, setPostIdToDelete] = useState('');
//   const [loading, setLoading] = useState(true); // For loading state
//   const [error, setError] = useState(null); // For error state

//   useEffect(() => {
//     const fetchPosts = async () => {
//       if (!userInfo || !userInfo._id) {
//         setError('User not logged in or missing user ID');
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await fetch(`/api/post/getposts?userId=${userInfo._id}`);
//         const data = await res.json();

//         if (res.ok) {
//           setUserPosts(data.posts);
//           if (data.posts.length < 9) {
//             setShowMore(false);
//           }
//         } else {
//           setError(data.message || 'Failed to fetch posts');
//         }
//       } catch (error) {
//         setError('Error fetching posts: ' + error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, [userInfo]);

//   const handleShowMore = async () => {
//     const startIndex = userPosts.length;
//     try {
//       const res = await fetch(`/api/post/getposts?userId=${userInfo._id}&startIndex=${startIndex}`);
//       const data = await res.json();

//       if (res.ok) {
//         setUserPosts((prev) => [...prev, ...data.posts]);
//         if (data.posts.length < 9) {
//           setShowMore(false);
//         }
//       } else {
//         setError('Failed to fetch more posts: ' + data.message);
//       }
//     } catch (error) {
//       setError('Error fetching more posts: ' + error.message);
//     }
//   };

//   const handleDeletePost = async () => {
//     setShowModal(false);
//     try {
//       const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${userInfo._id}`, {
//         method: 'DELETE',
//       });
//       const data = await res.json();

//       if (res.ok) {
//         setUserPosts((prev) => prev.filter((post) => post._id !== postIdToDelete));
//       } else {
//         setError('Failed to delete post: ' + data.message);
//       }
//     } catch (error) {
//       setError('Error deleting post: ' + error.message);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>; // Display error message to the user
//   }

//   return (
//     <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
//       {userInfo.isAdmin && userPosts.length > 0 ? (
//         <>
//           <Table hoverable className="shadow-md">
//             <Table.Head>
//               <Table.HeadCell>Date updated</Table.HeadCell>
//               <Table.HeadCell>Post image</Table.HeadCell>
//               <Table.HeadCell>Post title</Table.HeadCell>
//               <Table.HeadCell>Category</Table.HeadCell>
//               <Table.HeadCell>Delete</Table.HeadCell>
//               <Table.HeadCell>Edit</Table.HeadCell>
//             </Table.Head>
//             {userPosts.map((post) => (
//               <Table.Body className="divide-y" key={post._id}>
//                 <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
//                   <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
//                   <Table.Cell>
//                     <img src={post.image} alt={post.title} className="w-20 h-10 object-cover bg-gray-500" />
//                   </Table.Cell>
//                   <Table.Cell>{post.title}</Table.Cell>
//                   <Table.Cell>{post.category}</Table.Cell>
//                   <Table.Cell>
//                     <span
//                       onClick={() => {
//                         setShowModal(true);
//                         setPostIdToDelete(post._id);
//                       }}
//                       className="font-medium text-red-500 hover:underline cursor-pointer"
//                     >
//                       Delete
//                     </span>
//                   </Table.Cell>
//                   <Table.Cell>
//                     <a className="text-teal-500 hover:underline" href={`/update-post/${post._id}`}>
//                       Edit
//                     </a>
//                   </Table.Cell>
//                 </Table.Row>
//               </Table.Body>
//             ))}
//           </Table>
//           {showMore && (
//             <button onClick={handleShowMore} className="w-full text-teal-500 self-center text-sm py-7">
//               Show more
//             </button>
//           )}
//         </>
//       ) : (
//         <p>You have no posts yet!</p>
//       )}

//       <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
//         <Modal.Header />
//         <Modal.Body>
//           <div className="text-center">
//             <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
//             <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
//               Are you sure you want to delete this post?
//             </h3>
//             <div className="flex justify-center gap-4">
//               <Button color="failure" onClick={handleDeletePost}>
//                 Yes, I'm sure
//               </Button>
//               <Button color="gray" onClick={() => setShowModal(false)}>
//                 No, cancel
//               </Button>
//             </div>
//           </div>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }

// import { useEffect, useState, useContext } from "react";
// import { HiOutlineExclamationCircle } from "react-icons/hi";
// import axios from "axios"; // Use axios for API requests
// import { UserContext } from "../UserContext"; // Import UserContext

// export default function DashPosts() {
//   const { userInfo } = useContext(UserContext); // Access userInfo from UserContext
//   const [posts, setPosts] = useState([]);
//   const [showMore, setShowMore] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [postIdToDelete, setPostIdToDelete] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const baseURL = process.env.REACT_APP_API_URL || "http://localhost:4000"; // Base API URL
//   const limit = 10; // Limit for paginated requests
//   const [page, setPage] = useState(1); // Track the current page

//   // Fetch posts from the server
//   useEffect(() => {
//     const fetchPosts = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await axios.get(
//           `${baseURL}/api/post/getAllPosts?page=${page}&limit=${limit}`,
//           {
//             withCredentials: true, // Ensure cookies are sent with the request
//           }
//         );

//         if (res.status === 200) {
//           const newPosts = res.data.posts;

//           // Avoid duplicate posts
//           const newPostIds = newPosts.map((post) => post._id);
//           const uniquePosts = [
//             ...posts.filter((post) => !newPostIds.includes(post._id)),
//             ...newPosts,
//           ];

//           setPosts(uniquePosts); // Update state with unique posts

//           if (newPosts.length < limit) {
//             setShowMore(false); // Disable "Show More" if fewer posts are returned
//           }
//         } else {
//           setError("Failed to load posts");
//         }
//       } catch (err) {
//         console.error("Error fetching posts:", err);
//         setError("Failed to load posts");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userInfo?.isAdmin) {
//       fetchPosts();
//     }
//   }, [userInfo, page]); // Refetch posts when the page changes

//   const handleShowMore = () => {
//     setPage((prevPage) => prevPage + 1); // Increment page for "Show More"
//   };

//   const handleDeletePost = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token"); // Retrieve token from localStorage

//       if (!token) {
//         console.error("No token found");
//         setError("No token found. Please login again.");
//         return;
//       }

//       const res = await axios.delete(
//         `${baseURL}/api/post/deletepost/${postIdToDelete}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Pass the token in headers
//           },
//           withCredentials: true, // Ensure cookies are sent
//         }
//       );

//       if (res.status === 200) {
//         setPosts((prev) => prev.filter((post) => post._id !== postIdToDelete));
//         setShowModal(false);
//       } else {
//         setError(res.data.message || "Failed to delete post");
//       }
//     } catch (err) {
//       console.error("Error deleting post:", err);
//       setError("Failed to delete post");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4">
//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {userInfo?.isAdmin && posts.length > 0 ? (
//         <>
//           <table className="min-w-full table-auto border-collapse border border-gray-200">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="border border-gray-300 p-2 text-left">Date Updated</th>
//                 <th className="border border-gray-300 p-2 text-left">Post Image</th>
//                 <th className="border border-gray-300 p-2 text-left">Post Title</th>
//                 <th className="border border-gray-300 p-2 text-left">Delete</th>
//               </tr>
//             </thead>
//             <tbody>
//               {posts.map((post) => (
//                 <tr key={post._id} className="hover:bg-gray-50">
//                   <td className="border border-gray-300 p-2">
//                     {new Date(post.updatedAt).toLocaleDateString()}
//                   </td>
//                   <td className="border border-gray-300 p-2">
//                     <img
//                       src={post.cover ? `${baseURL}/${post.cover}` : "/default-image.png"}
//                       alt={post.title}
//                       className="w-20 h-10 object-cover bg-gray-500"
//                     />
//                   </td>
//                   <td className="border border-gray-300 p-2">{post.title}</td>
//                   <td className="border border-gray-300 p-2">
//                     <button
//                       onClick={() => {
//                         setShowModal(true);
//                         setPostIdToDelete(post._id);
//                       }}
//                       className="text-red-500 hover:underline"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {showMore && (
//             <button
//               onClick={handleShowMore}
//               className="w-full text-teal-500 self-center text-sm py-7 mt-4"
//               disabled={loading}
//             >
//               {loading ? "Loading..." : "Show more"}
//             </button>
//           )}
//         </>
//       ) : (
//         !loading && <p>You have no posts yet!</p>
//       )}

//       {/* Modal for deleting a post */}
//       {showModal && (
//         <div
//           className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
//           onClick={() => setShowModal(false)}
//         >
//           <div
//             className="bg-white p-6 rounded-lg shadow-lg w-96"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="text-center">
//               <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 mb-4 mx-auto" />
//               <h3 className="text-lg text-gray-500 mb-5">
//                 Are you sure you want to delete this post?
//               </h3>
//               <div className="flex justify-center gap-4">
//                 <button
//                   onClick={handleDeletePost}
//                   className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition"
//                   disabled={loading}
//                 >
//                   {loading ? "Deleting..." : "Yes, I'm sure"}
//                 </button>
//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 transition"
//                 >
//                   No, cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import { useEffect, useState, useContext } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import axios from "axios"; // Use axios for API requests
import { UserContext } from "../UserContext"; // Import UserContext

export default function DashPosts() {
  const { userInfo } = useContext(UserContext); // Access userInfo from UserContext
  const [posts, setPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseURL = process.env.REACT_APP_API_URL || "http://localhost:4000"; // Base API URL
  const limit = 10; // Limit for paginated requests
  const [page, setPage] = useState(1); // Track the current page

  // Fetch posts from the server
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `${baseURL}/api/post/getAllPosts?page=${page}&limit=${limit}`,
          {
            withCredentials: true, // Ensure cookies are sent with the request
          }
        );

        if (res.status === 200) {
          const newPosts = res.data.posts;

          // Avoid duplicate posts
          const newPostIds = newPosts.map((post) => post._id);
          const uniquePosts = [
            ...posts.filter((post) => !newPostIds.includes(post._id)),
            ...newPosts,
          ];

          setPosts(uniquePosts); // Update state with unique posts

          if (newPosts.length < limit) {
            setShowMore(false); // Disable "Show More" if fewer posts are returned
          }
        } else {
          setError("Failed to load posts");
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    if (userInfo?.isAdmin) {
      fetchPosts();
    }
  }, [userInfo, page]); // Refetch posts when the page changes

  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1); // Increment page for "Show More"
  };

  // Generalized delete function
  const handleDelete = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage

      if (!token) {
        console.error("No token found");
        setError("No token found. Please login again.");
        return;
      }

      const res = await axios.delete(
        `${baseURL}/api/post/deletepost/${postIdToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in headers
          },
          withCredentials: true, // Ensure cookies are sent
        }
      );

      if (res.status === 200) {
        // Remove the deletedd post from the list
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postIdToDelete));
        setShowModal(false); // Close modal
      } else {
        setError(res.data.message || "Failed to delete post");
      }
    } catch (err) {
      console.error("Error deleting:", err);
      setError("Failed to delete post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {userInfo?.isAdmin && posts.length > 0 ? (
        <>
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 p-2 text-left">Date Updated</th>
                <th className="border border-gray-300 p-2 text-left">Post Image</th>
                <th className="border border-gray-300 p-2 text-left">Post Title</th>
                <th className="border border-gray-300 p-2 text-left">Delete</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2">
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <img
                      src={post.cover ? `${baseURL}/${post.cover}` : "/default-image.png"}
                      alt={post.title}
                      className="w-20 h-10 object-cover bg-gray-500"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">{post.title}</td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setPostIdToDelete(post._id); // Set the postId to delete
                      }}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7 mt-4"
              disabled={loading}
            >
              {loading ? "Loading..." : "Show more"}
            </button>
          )}
        </>
      ) : (
        !loading && <p>You have no posts yet!</p>
      )}

      {/* Modal for deleting a post */}
      {showModal && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 mb-4 mx-auto" />
              <h3 className="text-lg text-gray-500 mb-5">
                Are you sure you want to delete this post?
              </h3>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition"
                  disabled={loading}
                >
                  {loading ? "Deleting..." : "Yes, I'm sure"}
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 transition"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

