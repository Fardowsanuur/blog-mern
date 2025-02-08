// import { useState } from "react";

// export default function RegisterPage() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   function handleUsernameChange(ev) {
//     const inputUsername = ev.target.value;

//     // Check if the username contains only letters or is empty
//     if (/^[a-zA-Z]*$/.test(inputUsername)) {
//       setUsername(inputUsername);
//       setError('');
//     } else {
//       setError('Username must contain only letters');
//     }
//   }

//   function isPasswordValid(inputPassword) {
//     // Password should have at least 8 characters and a combination of letters, characters, and special characters
//     return /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d).{8,}$/.test(inputPassword);
//   }

//   async function register(ev) {
//     ev.preventDefault();

//     // Check if both username and password are entered
//     if (!username || !password) {
//       setError('Please fill the empty field');
//       return;
//     }

//     // Validate password
//     if (!isPasswordValid(password)) {
//       setError('Password must have at least 8 characters with a combination of letters, characters, and special characters');
//       return;
//     }

//     // Validate username
//     if (!/^[a-zA-Z]*$/.test(username)) {
//       setError('Username must contain only letters');
//       return;
//     }

//     // If both username and password are valid, proceed with registration
//     const response = await fetch('http://localhost:4000/register', {
//       method: 'POST',
//       body: JSON.stringify({ username, password }),
//       headers: { 'Content-Type': 'application/json' },
//     });

//     if (response.status === 200) {
//       setError(''); // Clear the error if registration is successful
//       alert('Registration successful');
//     } else {
//       setError('Registration failed');
//     }
//   }

//   return (
//     <div className="register-container">
//       <form className="register" onSubmit={register}>
//         <h1>Register</h1>
//         <input
//           type="text"
//           placeholder="username"
//           value={username}
//           onChange={handleUsernameChange}
//         />
//         <input
//           type="password"
//           placeholder="password"
//           value={password}
//           onChange={(ev) => setPassword(ev.target.value)}
//         />
//         <button>Register</button>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//       </form>
//     </div>
//   );
// }
import { useState } from "react";
import { Button, Label, TextInput, Alert } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";

// import OAuth from "../components/OAuth";

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleUsernameChange(ev) {
    const inputUsername = ev.target.value;
    if (/^[a-zA-Z]*$/.test(inputUsername)) {
      setUsername(inputUsername);
      setError('');
    } else {
      setError('Username must contain only letters');
    }
  }

  function isPasswordValid(inputPassword) {
    return /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d).{8,}$/.test(inputPassword);
  }

  async function register(ev) {
    ev.preventDefault();
    if (!username || !password) {
      setError('Please fill the empty field');
      return;
    }
    if (!isPasswordValid(password)) {
      setError('Password must have at least 8 characters with a combination of letters, characters, and special characters');
      return;
    }
    if (!/^[a-zA-Z]*$/.test(username)) {
      setError('Username must contain only letters');
      return;
    }

    const response = await fetch('http://localhost:4000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status === 200) {
      setError('');
      alert('Registration successful');
    } else {
      setError('Registration failed');
    }
  }

  return (
    <div className="min-h-screen mt-20 ">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Hawa's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            Register with your username and password 
          </p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={register}>
            <div>
              <Label value="Your username" />
              <TextInput
                type="text"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
              />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit">
              Register
            </Button>
            {error && <Alert className="mt-5" color="failure">{error}</Alert>}
            
          </form>
         
        </div>
      </div>
    </div>
  );
}
