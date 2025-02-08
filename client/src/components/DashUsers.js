// import { Modal, Table, Button } from "flowbite-react";
// import { useEffect, useState, useContext } from "react";
// import { HiOutlineExclamationCircle } from "react-icons/hi";
// import { FaCheck, FaTimes } from "react-icons/fa";
// import axios from "axios"; // Use axios for API requests
// import { UserContext } from "../UserContext"; // Import UserContext

// export default function DashUsers() {
//   const { userInfo } = useContext(UserContext); // Access userInfo from UserContext
//   const [users, setUsers] = useState([]);
//   const [showMore, setShowMore] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [userIdToDelete, setUserIdToDelete] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const baseURL = process.env.REACT_APP_API_URL || "http://localhost:4000"; // Base API URL
//   const limit = 10; // Limit for paginated requests
//   const [page, setPage] = useState(1); // Track the current page

//   useEffect(() => {
//     const fetchUsers = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await axios.get(`${baseURL}/api/user/getAllUsers?page=${page}&limit=${limit}`);
//         console.log("API response:", res); // Log the API response to debug
//         if (res.status === 200) {
//           setUsers((prev) => [...prev, ...res.data.users]); // Append new users to the existing array
//           if (!res.data.users || res.data.users.length < limit) {
//             setShowMore(false); // Disable "Show More" if fewer users are returned than the limit
//           }
//         } else {
//           setError("Failed to load users");
//         }
//       } catch (err) {
//         console.error("Error fetching users:", err);
//         setError("Failed to load users");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userInfo?.isAdmin) {
//       fetchUsers();
//     } else {
//       console.log("User is not an admin, cannot fetch users.");
//     }
//   }, [userInfo, page]); // Refetch users when page changes

//   const handleShowMore = () => {
//     setPage((prevPage) => prevPage + 1); // Increment the page to fetch more users
//   };

//   const handleDeleteUser = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.delete(`${baseURL}/api/user/${userIdToDelete}`);
//       if (res.status === 200) {
//         setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
//         setShowModal(false);
//       } else {
//         setError(res.data.message || "Failed to delete user");
//       }
//     } catch (err) {
//       console.error("Error deleting user:", err);
//       setError("Failed to delete user");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="table-auto overflow-x-scroll md:mx-auto p-3">
//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {userInfo?.isAdmin && users.length > 0 ? (
//         <>
//           <Table hoverable className="shadow-md">
//             <Table.Head>
//               <Table.HeadCell>Date created</Table.HeadCell>
//               <Table.HeadCell>User image</Table.HeadCell>
//               <Table.HeadCell>Username</Table.HeadCell>
//               <Table.HeadCell>Email</Table.HeadCell>
//               <Table.HeadCell>Admin</Table.HeadCell>
//               <Table.HeadCell>Delete</Table.HeadCell>
//             </Table.Head>
//             <Table.Body>
//               {users.map((user, index) => (
//                 <Table.Row
//                   className="bg-white dark:border-gray-700 dark:bg-gray-800"
//                   key={`${user._id}-${index}`} // Ensure unique key by combining _id and index
//                 >
//                   <Table.Cell>
//                     {new Date(user.createdAt).toLocaleDateString()}
//                   </Table.Cell>
//                   <Table.Cell>
//                     <img
//                       src={user.profilePicture || "/default-avatar.png"} // Fallback for missing profile pictures
//                       alt={user.username}
//                       className="w-10 h-10 object-cover bg-gray-500 rounded-full"
//                     />
//                   </Table.Cell>
//                   <Table.Cell>{user.username}</Table.Cell>
//                   <Table.Cell>{user.email}</Table.Cell>
//                   <Table.Cell>
//                     {user.isAdmin ? (
//                       <FaCheck className="text-green-500" />
//                     ) : (
//                       <FaTimes className="text-red-500" />
//                     )}
//                   </Table.Cell>
//                   <Table.Cell>
//                     <span
//                       onClick={() => {
//                         setShowModal(true);
//                         setUserIdToDelete(user._id);
//                       }}
//                       className="font-medium text-red-500 hover:underline cursor-pointer"
//                     >
//                       Delete
//                     </span>
//                   </Table.Cell>
//                 </Table.Row>
//               ))}
//             </Table.Body>
//           </Table>
//           {showMore && (
//             <button
//               onClick={handleShowMore}
//               className="w-full text-teal-500 self-center text-sm py-7"
//               disabled={loading}
//             >
//               {loading ? "Loading..." : "Show more"}
//             </button>
//           )}
//         </>
//       ) : (
//         !loading && <p>You have no users yet!</p>
//       )}

//       {/* Modal for deleting a user */}
//       <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
//         <Modal.Header />
//         <Modal.Body>
//           <div className="text-center">
//             <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
//             <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
//               Are you sure you want to delete this user?
//             </h3>
//             <div className="flex justify-center gap-4">
//               <Button color="failure" onClick={handleDeleteUser} disabled={loading}>
//                 {loading ? "Deleting..." : "Yes, I'm sure"}
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

// import { Modal, Table, Button } from "flowbite-react";
// import { useEffect, useState, useContext } from "react";
// import { HiOutlineExclamationCircle } from "react-icons/hi";
// import { FaCheck, FaTimes } from "react-icons/fa";
// import axios from "axios"; // Use axios for API requests
// import { UserContext } from "../UserContext"; // Import UserContext

// export default function DashUsers() {
//   const { userInfo } = useContext(UserContext); // Access userInfo from UserContext
//   const [users, setUsers] = useState([]);
//   const [showMore, setShowMore] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [userIdToDelete, setUserIdToDelete] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const baseURL = process.env.REACT_APP_API_URL || "http://localhost:4000"; // Base API URL
//   const limit = 10; // Limit for paginated requests
//   const [page, setPage] = useState(1); // Track the current page

//   useEffect(() => {
//     const fetchUsers = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await axios.get(`${baseURL}/api/user/getAllUsers?page=${page}&limit=${limit}`);
//         console.log("Fetched users:", res.data.users); // Debugging log
        
//         if (res.status === 200) {
//           const newUsers = res.data.users;

//           // Ensure no duplicates in new users by filtering out already existing users
//           const newUserIds = newUsers.map((user) => user._id);
//           const uniqueUsers = [
//             ...users.filter((user) => !newUserIds.includes(user._id)),
//             ...newUsers
//           ];

//           setUsers(uniqueUsers); // Set the unique list of users

//           if (newUsers.length < limit) {
//             setShowMore(false); // Disable "Show More" if fewer users are returned than the limit
//           }
//         } else {
//           setError("Failed to load users");
//         }
//       } catch (err) {
//         console.error("Error fetching users:", err);
//         setError("Failed to load users");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userInfo?.isAdmin) {
//       fetchUsers();
//     }
//   }, [userInfo, page]); // Refetch users when page changes

//   const handleShowMore = () => {
//     setPage((prevPage) => prevPage + 1); // Increment the page to fetch more users
//   };

  // const handleDeleteUser = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await axios.delete(`${baseURL}/api/user/${userIdToDelete}`);
  //     if (res.status === 200) {
  //       setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
  //       setShowModal(false);
  //     } else {
  //       setError(res.data.message || "Failed to delete user");
  //     }
  //   } catch (err) {
  //     console.error("Error deleting user:", err);
  //     setError("Failed to delete user");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

//   return (
//     <div className="table-auto overflow-x-scroll md:mx-auto p-3">
//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {userInfo?.isAdmin && users.length > 0 ? (
//         <>
//           <Table hoverable className="shadow-md">
//             <Table.Head>
//               <Table.HeadCell>Date created</Table.HeadCell>
//               <Table.HeadCell>User image</Table.HeadCell>
//               <Table.HeadCell>Username</Table.HeadCell>
//               <Table.HeadCell>Email</Table.HeadCell>
//               <Table.HeadCell>Admin</Table.HeadCell>
//               <Table.HeadCell>Delete</Table.HeadCell>
//             </Table.Head>
//             <Table.Body>
//               {users.length === 0 ? (
//                 <Table.Row>
//                   <Table.Cell colSpan="6" className="text-center text-gray-500">
//                     No users available
//                   </Table.Cell>
//                 </Table.Row>
//               ) : (
//                 users.map((user) => (
//                   <Table.Row
//                     className="bg-white dark:border-gray-700 dark:bg-gray-800"
//                     key={user._id} // Ensure _id is unique
//                   >
//                     <Table.Cell>
//                       {new Date(user.createdAt).toLocaleDateString()}
//                     </Table.Cell>
//                     <Table.Cell>
//                       <img
//                         src={user.profilePicture || "/default-avatar.png"} // Fallback for missing profile pictures
//                         alt={user.username}
//                         className="w-10 h-10 object-cover bg-gray-500 rounded-full"
//                       />
//                     </Table.Cell>
//                     <Table.Cell>{user.username}</Table.Cell>
//                     <Table.Cell>{user.email}</Table.Cell>
//                     <Table.Cell>
//                       {user.isAdmin ? (
//                         <FaCheck className="text-green-500" />
//                       ) : (
//                         <FaTimes className="text-red-500" />
//                       )}
//                     </Table.Cell>
//                     <Table.Cell>
//                       <span
//                         onClick={() => {
//                           setShowModal(true);
//                           setUserIdToDelete(user._id);
//                         }}
//                         className="font-medium text-red-500 hover:underline cursor-pointer"
//                       >
//                         Delete
//                       </span>
//                     </Table.Cell>
//                   </Table.Row>
//                 ))
//               )}
//             </Table.Body>
//           </Table>

//           {showMore && (
//             <button
//               onClick={handleShowMore}
//               className="w-full text-teal-500 self-center text-sm py-7"
//               disabled={loading}
//             >
//               {loading ? "Loading..." : "Show more"}
//             </button>
//           )}
//         </>
//       ) : (
//         !loading && <p>You have no users yet!</p>
//       )}

//       {/* Modal for deleting a user */}
//       <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
//         <Modal.Header />
//         <Modal.Body>
//           <div className="text-center">
//             <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
//             <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
//               Are you sure you want to delete this user?
//             </h3>
//             <div className="flex justify-center gap-4">
//               <Button color="failure" onClick={handleDeleteUser} disabled={loading}>
//                 {loading ? "Deleting..." : "Yes, I'm sure"}
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
// import { FaCheck, FaTimes } from "react-icons/fa";
// import axios from "axios"; // Use axios for API requests
// import { UserContext } from "../UserContext"; // Import UserContext

// export default function DashUsers() {
//   const { userInfo } = useContext(UserContext); // Access userInfo from UserContext
//   const [users, setUsers] = useState([]);
//   const [showMore, setShowMore] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [userIdToDelete, setUserIdToDelete] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const baseURL = process.env.REACT_APP_API_URL || "http://localhost:4000"; // Base API URL
//   const limit = 10; // Limit for paginated requests
//   const [page, setPage] = useState(1); // Track the current page

//   useEffect(() => {
//     const fetchUsers = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await axios.get(`${baseURL}/api/user/getAllUsers?page=${page}&limit=${limit}`, {
//           withCredentials: true,  // Ensure cookies are sent with the request
//         });

//         if (res.status === 200) {
//           const newUsers = res.data.users;

//           // Ensure no duplicates in new users by filtering out already existing users
//           const newUserIds = newUsers.map((user) => user._id);
//           const uniqueUsers = [
//             ...users.filter((user) => !newUserIds.includes(user._id)),
//             ...newUsers
//           ];

//           setUsers(uniqueUsers); // Set the unique list of users

//           if (newUsers.length < limit) {
//             setShowMore(false); // Disable "Show More" if fewer users are returned than the limit
//           }
//         } else {
//           setError("Failed to load users");
//         }
//       } catch (err) {
//         console.error("Error fetching users:", err);
//         setError("Failed to load users");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userInfo?.isAdmin) {
//       fetchUsers();
//     }
//   }, [userInfo, page]); // Refetch users when page changes

//   const handleShowMore = () => {
//     setPage((prevPage) => prevPage + 1); // Increment the page to fetch more users
//   };

  // const handleDeleteUser = async () => {
  //   setLoading(true);
  //   try {
  //     const token = localStorage.getItem("token"); // Retrieve token from localStorage

  //     if (!token) {
  //       console.error("No token found");
  //       setError("No token found. Please login again.");
  //       return;
  //     }

  //     const res = await axios.delete(`${baseURL}/api/user/${userIdToDelete}`, { // Updated route
  //       headers: {
  //         Authorization: `Bearer ${token}`, // Send token as Bearer token in the headers
  //       },
  //       withCredentials: true,  // Ensure cookies are sent with the request
  //     });

  //     if (res.status === 200) {
  //       setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
  //       setShowModal(false);
  //     } else {
  //       setError(res.data.message || "Failed to delete user");
  //     }
  //   } catch (err) {
  //     console.error("Error deleting user:", err);
  //     setError("Failed to delete user");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

//   return (
//     <div className="p-4">
//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {userInfo?.isAdmin && users.length > 0 ? (
//         <>
//           <table className="min-w-full table-auto border-collapse border border-gray-200">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="border border-gray-300 p-2 text-left">User Image</th>
//                 <th className="border border-gray-300 p-2 text-left">Username</th>
//                 <th className="border border-gray-300 p-2 text-left">Admin</th>
//                 <th className="border border-gray-300 p-2 text-left">Delete</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.length === 0 ? (
//                 <tr>
//                   <td colSpan="4" className="text-center text-gray-500">
//                     No users available
//                   </td>
//                 </tr>
//               ) : (
//                 users.map((user) => (
//                   <tr key={user._id} className="hover:bg-gray-50">
//                     <td className="border border-gray-300 p-2">
//                       <img
//                         src={user.profilePicture || "/default-avatar.png"}
//                         alt={user.username}
//                         className="w-10 h-10 object-cover bg-gray-500 rounded-full"
//                       />
//                     </td>
//                     <td className="border border-gray-300 p-2">{user.username}</td>
//                     <td className="border border-gray-300 p-2">
//                       {user.isAdmin ? (
//                         <FaCheck className="text-green-500" />
//                       ) : (
//                         <FaTimes className="text-red-500" />
//                       )}
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       <button
//                         onClick={() => {
//                           setShowModal(true);
//                           setUserIdToDelete(user._id);
//                         }}
//                         className="text-red-500 hover:underline"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
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
//         !loading && <p>You have no users yet!</p>
//       )}

//       {/* Modal for deleting a user */}
//       <div
//         className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ease-in-out ${showModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
//         onClick={() => setShowModal(false)}
//       >
//         <div
//           className="bg-white p-6 rounded-lg shadow-lg w-96 transform transition-all duration-300 ease-in-out scale-95 md:scale-100"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="text-center">
//             <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 mb-4 mx-auto" />
//             <h3 className="text-lg text-gray-500 mb-5">Are you sure you want to delete this user?</h3>
//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={handleDeleteUser}
//                 className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition"
//                 disabled={loading}
//               >
//                 {loading ? "Deleting..." : "Yes, I'm sure"}
//               </button>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 transition"
//               >
//                 No, cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState, useContext } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";
import axios from "axios"; // Use axios for API requests
import { UserContext } from "../UserContext"; // Import UserContext

export default function DashUsers() {
  const { userInfo } = useContext(UserContext); // Access userInfo from UserContext
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseURL = process.env.REACT_APP_API_URL || "http://localhost:4000"; // Base API URL
  const limit = 10; // Limit for paginated requests
  const [page, setPage] = useState(1); // Track the current page

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${baseURL}/api/user/getAllUsers?page=${page}&limit=${limit}`, {
          headers: {
            // No need to send token explicitly in header, it's automatically sent from cookies
          },
          withCredentials: true,  // Ensure cookies are sent with the request
        });

        if (res.status === 200) {
          const newUsers = res.data.users;

          // Ensure no duplicates in new users by filtering out already existing users
          const newUserIds = newUsers.map((user) => user._id);
          const uniqueUsers = [
            ...users.filter((user) => !newUserIds.includes(user._id)),
            ...newUsers
          ];

          setUsers(uniqueUsers); // Set the unique list of users

          if (newUsers.length < limit) {
            setShowMore(false); // Disable "Show More" if fewer users are returned than the limit
          }
        } else {
          setError("Failed to load users");
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    if (userInfo?.isAdmin) {
      fetchUsers();
    }
  }, [userInfo, page]); // Refetch users when page changes

  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1); // Increment the page to fetch more users
  };

 // Assume you're using cookies for authentication, so make sure to include credentials if needed
//  const handleDeleteUser = async (userId) => {
//   setLoading(true);
//   setError(null); // Reset any previous errors

//   try {
//     const token = localStorage.getItem('token');  // Retrieve token from localStorage

//     if (!token) {
//       console.error('No token found');
//       setError('No token found. Please login again.');
//       return;
//     }

//     // Send DELETE request to the API to delete the user
//     const res = await axios.delete(
//       `${baseURL}/api/user/${userId}`,  // Make sure this is your correct API endpoint
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,  // Pass the token in the headers
//         },
//         withCredentials: true,  // Ensure cookies are sent if needed
//       }
//     );

//     if (res.status === 200) {
//       // Successfully deleted the user
//       setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId)); // Update the list
//       setShowModal(false);  // Close the modal if open
//       alert('User deleted successfully');
//     } else {
//       setError(res.data.message || 'Failed to delete user');
//     }
//   } catch (err) {
//     console.error('Error deleting user:', err);
//     setError('Failed to delete user');
//   } finally {
//     setLoading(false);
//   }
// };
// const handleDeleteUser = async () => {
//   setLoading(true);
//   try {
//     const res = await axios.delete(`http://localhost:4000/api/user`);
//     if (res.status === 200) {
//       setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
//       setShowModal(false);
//     } else {
//       setError(res.data.message || "Failed to delete user");
//     }
//   } catch (err) {
//     console.error("Error deleting user:", err);
//     setError("Failed to delete user");
//   } finally {
//     setLoading(false);
//   }
// };
  // handleDeleteUser function
  const handleDeleteUser = async () => {
    setLoading(true);
    setError(null); // Reset any previous errors

    try {
      const token = localStorage.getItem('token');  // Retrieve token from localStorage

      if (!token) {
        console.error('No token found');
        setError('No token found. Please login again.');
        return;
      }

      // Make sure the user ID to delete exists
      if (!userIdToDelete) {
        setError('No user ID provided for deletion');
        return;
      }

      // Send DELETE request to the API to delete the user
      const res = await axios.delete(
        `${baseURL}/api/user/${userIdToDelete}`,  // API endpoint for user deletion with userId
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Pass the token in the headers
          },
          withCredentials: true,  // Ensure cookies are sent if needed
        }
      );

      if (res.status === 200) {
        // Successfully deleted the user
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userIdToDelete)); // Update the list
        setShowModal(false);  // Close the modal if open
        alert('User deleted successfully');
      } else {
        setError(res.data.message || 'Failed to delete user');
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Failed to delete user');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="p-4">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {userInfo?.isAdmin && users.length > 0 ? (
        <>
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 p-2 text-left">User Image</th>
                <th className="border border-gray-300 p-2 text-left">Username</th>
                <th className="border border-gray-300 p-2 text-left">Admin</th>
                <th className="border border-gray-300 p-2 text-left">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500">
                    No users available
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-2">
                      <img
                        src={user.profilePicture || "/default-avatar.png"}
                        alt={user.username}
                        className="w-10 h-10 object-cover bg-gray-500 rounded-full"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">{user.username}</td>
                    <td className="border border-gray-300 p-2">
                      {user.isAdmin ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <FaTimes className="text-red-500" />
                      )}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <button
                        onClick={() => {
                          setShowModal(true);
                          setUserIdToDelete(user._id);
                        }}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
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
        !loading && <p>You have no users yet!</p>
      )}

      {/* Modal for deleting a user */}
      <div
        className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ease-in-out ${showModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setShowModal(false)}
      >
        <div
          className="bg-white p-6 rounded-lg shadow-lg w-96 transform transition-all duration-300 ease-in-out scale-95 md:scale-100"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 mb-4 mx-auto" />
            <h3 className="text-lg text-gray-500 mb-5">Are you sure you want to delete this user?</h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeleteUser}
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
    </div>
  );
}

