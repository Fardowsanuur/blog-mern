// Header.js
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function Header() {
  const navigate = useNavigate();
  const { setUserInfo, userInfo } = useContext(UserContext);

  function logout() {
    fetch("http://localhost:4000/api/auth/logout", {
      credentials: "include",
      method: "POST",
    }).then(() => {
      setUserInfo(null);
      console.log(setUserInfo); // Set userInfo to null after successful logout
    });
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              Hawa's Blog
            </span>
            
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/create" className="Create">
              Create new post
            </Link>
            <a onClick={logout}>Logout ({username})</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login" className="Create">
              Login
            </Link>
            <Link to="/register" className="Create">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
