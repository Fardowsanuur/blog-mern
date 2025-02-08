import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineUserGroup, HiDocumentText } from "react-icons/hi";

export default function DashboardComp() {
  const { userInfo = {} } = useSelector((state) => state.user || {}); // Replaced currentUser with userInfo
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);

  const baseURL = process.env.REACT_APP_API_URL || "http://localhost:4000"; // Base URL

  useEffect(() => {
    const fetchData = async (endpoint, setStateCallback, dataKey) => {
      try {
        const res = await fetch(`${baseURL}${endpoint}`);
        const data = await res.json();
        
        // Log the response to check what we are getting
        console.log(`Fetched data from ${endpoint}:`, data);

        if (res.ok) {
          setStateCallback(data[dataKey] || 0); // Use dataKey for dynamic key assignment
        } else {
          console.error(`Error fetching ${endpoint}:`, data.message || res.statusText);
        }
      } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error.message);
      }
    };

    // Fetch data only if the userInfo is an admin
    if (userInfo?.isAdmin) {
      fetchData("/api/user/getTotalUsers", setTotalUsers, "totalUsers");
      fetchData("/api/post/totalPosts", setTotalPosts, "totalPosts");
    }
  }, [userInfo, baseURL]);

  return (
    <div className="p-3 md:mx-auto">
      <div className="flex-wrap flex gap-4 justify-center">
        {/* Total Users Section */}
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between items-center">
            {/* Large Icon for Total Users */}
            <HiOutlineUserGroup className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
            <div>
              <h3 className="text-gray-500 text-md uppercase">Total Users</h3>
              <div className="flex items-center gap-2">
                {/* Small Icon for Total Users */}
                <HiOutlineUserGroup className="text-teal-600 text-3xl" />
                <p className="text-2xl">{totalUsers}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Total Posts Section */}
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between items-center">
            {/* Large Icon for Total Posts */}
            <HiDocumentText className="bg-lime-600 text-white rounded-full text-5xl p-3 shadow-lg" />
            <div>
              <h3 className="text-gray-500 text-md uppercase">Total Posts</h3>
              <div className="flex items-center gap-2">
                {/* Smal Icon for Total Posts */}
                <HiDocumentText className="text-lime-600 text-3xl" />
                <p className="text-2xl">{totalPosts}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
