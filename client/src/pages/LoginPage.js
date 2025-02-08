// import { useContext, useState } from "react";
// import { Navigate } from "react-router-dom";
// import { UserContext } from "../UserContext";
// import { Alert, Button, Label, TextInput } from 'flowbite-react';
// import { Link } from 'react-router-dom';


// export default function LoginPage() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [redirect, setRedirect] = useState('');
//   const [error, setError] = useState('');
//   const { setUserInfo } = useContext(UserContext);

//   async function login(ev) {
//     ev.preventDefault();

//     // Validation check for empty fields
//     if (!username || !password) {
//       setError('Please fill the empty fields');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:4000/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//         credentials: 'include', // Include cookies with the request
//       });

//       if (response.ok) {
//         // Login successful
//         setError(''); // Reset all errors
//         const userInfo = await response.json();
//         setUserInfo(userInfo);

//         // Redirect to dashboard if the user is an admin
//         if (userInfo.isAdmin) {
//           setRedirect('/dashboard');  // Redirect to dashboard if admin
//         } else {
//           setRedirect('/');  // Redirect to home if not an admin (same behavior as before)
//         }
//       } else {
//         // Handle errors from the server
//         const data = await response.json();
//         if (data.error === 'IncorrectUsername') {
//           setError('Your username is incorrect');
//         } else if (data.error === 'IncorrectPassword') {
//           setError('Your password is incorrect');
//         } else {
//           setError('An error occurred while trying to log in');
//         }
//       }
//     } catch (error) {
//       setError('An error occurred while trying to log in');
//     }
//   }

//   if (redirect) {
//     return <Navigate to={redirect} />;
//   }

//   return (
//     <div className='min-h-screen mt-20'>
//       <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
//         {/* Left section */}
//         <div className='flex-1'>
//           <Link to='/' className='font-bold dark:text-white text-4xl'>
//             <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
//               Hawa's
//             </span>
//             Blog
//           </Link>
//           <p className='text-sm mt-5'>
//             This is a demo project. You can log in with your username and password.
//           </p>
//         </div>

//         {/* Right section */}
//         <div className='flex-1'>
//           <form className='flex flex-col gap-4' onSubmit={login}>
//             {/* Username input */}
//             <div>
//               <Label value='Your username' />
//               <TextInput
//                 type='text'
//                 placeholder='Enter your username'
//                 value={username}
//                 onChange={(ev) => setUsername(ev.target.value)}
//                 required
//               />
//             </div>

//             {/* Password input */}
//             <div>
//               <Label value='Your password' />
//               <TextInput
//                 type='password'
//                 placeholder='**********'
//                 value={password}
//                 onChange={(ev) => setPassword(ev.target.value)}
//                 required
//               />
//             </div>

//             {/* Submit button */}
//             <Button
//               gradientDuoTone='purpleToPink'
//               type='submit'
//             >
//               Login
//             </Button>
//             <div className='flex gap-2 text-sm mt-5'>
//               <span>Don't have an account?</span>
//               <Link to='/sign-up' className='text-blue-500'>
//                 Sign Up
//               </Link>
//             </div>
//           </form>

//           {/* Error message */}
//           {error && (
//             <Alert className='mt-5' color='failure'>
//               {error}
//             </Alert>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useContext, useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import { UserContext } from '../UserContext';
// import { Alert, Button, Label, TextInput } from 'flowbite-react';
// import { Link } from 'react-router-dom';

// export default function LoginPage() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [redirect, setRedirect] = useState('');
//   const [error, setError] = useState('');
//   const { setUserInfo } = useContext(UserContext);

//   async function login(ev) {
//     ev.preventDefault();
//     setError(''); // Reset error on each login attempt

//     if (!username || !password) {
//       setError('Please fill the empty fields');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:4000/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password }),
//         credentials: 'include',
//       });

//       if (response.ok) {
//         const userInfo = await response.json();
//         setUserInfo(userInfo); // Update context with user data
//         setRedirect(userInfo.isAdmin ? '/dashboard?tab=dash' : '/'); // Navigate to appropriate dashboard or home
//       } else {
//         const data = await response.json();
//         if (data.error === 'IncorrectUsername') {
//           setError('Your username is incorrect');
//         } else if (data.error === 'IncorrectPassword') {
//           setError('Your password is incorrect');
//         } else {
//           setError('An error occurred while trying to log in');
//         }
//       }
//     } catch {
//       setError('An error occurred while trying to log in');
//     }
//   }

//   if (redirect) {
//     return <Navigate to={redirect} />;
//   }

//   return (
//     <div className='min-h-screen mt-20'>
//       <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
//         {/* Left section */}
//         <div className='flex-1'>
//           <Link to='/' className='font-bold dark:text-white text-4xl'>
//             <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
//               Hawa's
//             </span>
//             Blog
//           </Link>
//           <p className='text-sm mt-5'>
//             This is a demo project. You can log in with your username and password.
//           </p>
//         </div>

//         {/* Right section */}
//         <div className='flex-1'>
//           <form className='flex flex-col gap-4' onSubmit={login}>
//             {/* Username input */}
//             <div>
//               <Label value='Your username' />
//               <TextInput
//                 type='text'
//                 placeholder='Enter your username'
//                 value={username}
//                 onChange={(ev) => setUsername(ev.target.value)}
//                 required
//               />
//             </div>

//             {/* Password input */}
//             <div>
//               <Label value='Your password' />
//               <TextInput
//                 type='password'
//                 placeholder='**********'
//                 value={password}
//                 onChange={(ev) => setPassword(ev.target.value)}
//                 required
//               />
//             </div>

//             {/* Submit button */}
//             <Button gradientDuoTone='purpleToPink' type='submit'>
//               Login
//             </Button>
//             <div className='flex gap-2 text-sm mt-5'>
//               <span>Don't have an account?</span>
//               <Link to='/sign-up' className='text-blue-500'>
//                 Sign Up
//               </Link>
//             </div>
//           </form>

//           {/* Error message */}
//           {error && (
//             <Alert className='mt-5' color='failure'>
//               {error}
//             </Alert>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useContext, useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import { UserContext } from '../UserContext';
// import { Alert, Button, Label, TextInput } from 'flowbite-react';
// import { Link } from 'react-router-dom';
// import RegisterPage from './RegisterPage';

// export default function LoginPage() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [redirect, setRedirect] = useState('');
//   const [error, setError] = useState('');
//   const { setUserInfo } = useContext(UserContext);

//   async function login(ev) {
//     ev.preventDefault();
//     setError(''); // Reset error on each login attempt

//     if (!username || !password) {
//       setError('Please fill the empty fields');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:4000/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password }),
//         credentials: 'include',
//       });

//       if (response.ok) {
//         const userInfo = await response.json();

//         // Log the user info before saving the token to localStorage
//         console.log('Login successful, received user info:', userInfo);

//         // Save token to localStorage
//         localStorage.setItem('token', userInfo.token); // Save token to localStorage

//         // Update context with user data
//         setUserInfo(userInfo);

//         // Navigate to appropriate route based on user role
//         setRedirect(userInfo.isAdmin ? '/dashboard?tab=dash' : '/');
//       } else {
//         const data = await response.json();
//         if (data.error === 'IncorrectUsername') {
//           setError('Your username is incorrect');
//         } else if (data.error === 'IncorrectPassword') {
//           setError('Your password is incorrect');
//         } else {
//           setError('An error occurred while trying to log in');
//         }
//       }
//     } catch {
//       setError('An error occurred while trying to log in');
//     }
//   }

//   if (redirect) {
//     return <Navigate to={redirect} />;
//   }
//   //
//   //  if (redirect) {
//   //   return <Navigate to={'/'} />
//   // }

//   return (
//     <div className='min-h-screen mt-20'>
//       <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
//         {/* Left section */}
//         <div className='flex-1'>
//           <Link to='/' className='font-bold dark:text-white text-4xl'>
//             <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
//               Hawa's
//             </span>
//             Blog
//           </Link>
//           <p className='text-sm mt-5'>
//             This is a demo project. You can log in with your username and password.
//           </p>
//         </div>

//         {/* Right section */}
//         <div className='flex-1'>
//           <form className='flex flex-col gap-4' onSubmit={login}>
//             {/* Username input */}
//             <div>
//               <Label value='Your username' />
//               <TextInput
//                 type='text'
//                 placeholder='Enter your username'
//                 value={username}
//                 onChange={(ev) => setUsername(ev.target.value)}
//                 required
//               />
//             </div>

//             {/* Password input */}
//             <div>
//               <Label value='Your password' />
//               <TextInput
//                 type='password'
//                 placeholder='**********'
//                 value={password}
//                 onChange={(ev) => setPassword(ev.target.value)}
//                 required
//               />
//             </div>

//             {/* Submit button */}
//             <Button gradientDuoTone='purpleToPink' type='submit'>
//               Login
//             </Button>
//             <div className='flex gap-2 text-sm mt-5'>
//               <span>Don't have an account?</span>
//               <Link to='/register' className='text-blue-500'>
//                 Sign Up
//               </Link>

//             </div>
//           </form>

//           {/* Error message */}
//           {error && (
//             <Alert className='mt-5' color='failure'>
//               {error}
//             </Alert>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useContext, useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import { UserContext } from '../UserContext';
// import { Alert, Button, Label, TextInput } from 'flowbite-react';
// import { Link } from 'react-router-dom';
// import Cookies from 'js-cookie'; // Import js-cookie

// export default function LoginPage() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [redirect, setRedirect] = useState('');
//   const [error, setError] = useState('');
//   const { setUserInfo } = useContext(UserContext);

//   async function login(ev) {
//     ev.preventDefault();
//     setError(''); // Reset error on each login attempt

//     if (!username || !password) {
//       setError('Please fill the empty fields');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:4000/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password }),
//         credentials: 'include',
//       });

//       if (response.ok) {
//         const userInfo = await response.json();

//         // Log the user info before saving the token and userId
//         console.log('Login successful, received user info:', userInfo);

//         // Save token to localStorage
//         localStorage.setItem('token', userInfo.token); 

//         // Save userId in cookies
//         Cookies.set('userId', userInfo.userId, { expires: 7 }); // Set cookie for 7 days

//         // Update context with user data
//         setUserInfo(userInfo);

//         // Navigate to appropriate route based on user role
//         setRedirect(userInfo.isAdmin ? '/dashboard?tab=dash' : '/');
//       } else {
//         const data = await response.json();
//         if (data.error === 'IncorrectUsername') {
//           setError('Your username is incorrect');
//         } else if (data.error === 'IncorrectPassword') {
//           setError('Your password is incorrect');
//         } else {
//           setError('An error occurred while trying to log in');
//         }
//       }
//     } catch {
//       setError('An error occurred while trying to log in');
//     }
//   }

//   if (redirect) {
//     return <Navigate to={redirect} />;
//   }

//   return (
//     <div className='min-h-screen mt-20'>
//       <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
//         {/* Left section */}
//         <div className='flex-1'>
//           <Link to='/' className='font-bold dark:text-white text-4xl'>
//             <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
//               Hawa's
//             </span>
//             Blog
//           </Link>
//           <p className='text-sm mt-5'>
//             This is a demo project. You can log in with your username and password.
//           </p>
//         </div>

//         {/* Right section */}
//         <div className='flex-1'>
//           <form className='flex flex-col gap-4' onSubmit={login}>
//             {/* Username input */}
//             <div>
//               <Label value='Your username' />
//               <TextInput
//                 type='text'
//                 placeholder='Enter your username'
//                 value={username}
//                 onChange={(ev) => setUsername(ev.target.value)}
//                 required
//               />
//             </div>

//             {/* Password input */}
//             <div>
//               <Label value='Your password' />
//               <TextInput
//                 type='password'
//                 placeholder='**********'
//                 value={password}
//                 onChange={(ev) => setPassword(ev.target.value)}
//                 required
//               />
//             </div>

//             {/* Submit button */}
//             <Button gradientDuoTone='purpleToPink' type='submit'>
//               Login
//             </Button>
//             <div className='flex gap-2 text-sm mt-5'>
//               <span>Don't have an account?</span>
//               <Link to='/register' className='text-blue-500'>
//                 Sign Up
//               </Link>
//             </div>
//           </form>

//           {/* Error message */}
//           {error && (
//             <Alert className='mt-5' color='failure'>
//               {error}
//             </Alert>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { Alert, Button, Label, TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie for cookies management

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState('');
  const [error, setError] = useState('');
  const { setUserInfo } = useContext(UserContext);

  // Handle login
  async function login(ev) {
    ev.preventDefault();
    setError(''); // Reset error on each login attempt

    if (!username || !password) {
      setError('Please fill the empty fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      if (response.ok) {
        const userInfo = await response.json();

        // Log the user info before saving the token and userId
        console.log('Login successful, received user info:', userInfo);

        // Save token to localStorage
        localStorage.setItem('token', userInfo.token); 

        // Save userId in cookies
        Cookies.set('userId', userInfo.userId, { expires: 7 }); // Set cookie for 7 days

        // Update context with user data
        setUserInfo(userInfo);

        // Navigate to appropriate route based on user role
        setRedirect(userInfo.isAdmin ? '/dashboard?tab=dash' : '/');
      } else {
        const data = await response.json();
        if (data.error === 'IncorrectUsername') {
          setError('Your username is incorrect');
        } else if (data.error === 'IncorrectPassword') {
          setError('Your password is incorrect');
        } else {
          setError('An error occurred while trying to log in');
        }
      }
    } catch {
      setError('An error occurred while trying to log in');
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* Left section */}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              Hawa's
            </span>
            Blog
          </Link>
          <p className='text-sm mt-5'>
            This is a demo project. You can log in with your username and password.
          </p>
        </div>

        {/* Right section */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={login}>
            {/* Username input */}
            <div>
              <Label value='Your username' />
              <TextInput
                type='text'
                placeholder='Enter your username'
                value={username}
                onChange={(ev) => setUsername(ev.target.value)}
                required
              />
            </div>

            {/* Password input */}
            <div>
              <Label value='Your password' />
              <TextInput
                type='password'
                placeholder='**********'
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                required
              />
            </div>

            {/* Submit button */}
            <Button gradientDuoTone='purpleToPink' type='submit'>
              Login
            </Button>
            <div className='flex gap-2 text-sm mt-5'>
              <span>Don't have an account?</span>
              <Link to='/register' className='text-blue-500'>
                Sign Up
              </Link>
            </div>
          </form>

          {/* Error message */}
          {error && (
            <Alert className='mt-5' color='failure'>
              {error}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

