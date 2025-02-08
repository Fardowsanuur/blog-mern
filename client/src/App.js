import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import the Redux Provider
import { store } from './redux/store'; // Assuming you have a Redux store setup
import Layout from './Layout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { UserContextProvider } from './UserContext';
import CreatePost from './pages/CreatePost';
import PostPage from './pages/PostPage';
import EditPost from './pages/EditPost';
// import Report from './Report';
import Dashboard from './pages/Dashboard'; // Correct path
import Post from './Post';
import Header from './Header';
import '../src/index.css'; // Or the correct path to your Tailwind CSS file

function App() {
  return (
    <Provider store={store}> {/* Wrap the entire app with the Redux Provider */}
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Route>
          {/* <Route path="/report" element={<Report />} /> */}
          <Route path="/dashboard" element={<Dashboard />} /> {/* Add this line for dashboard */}
        </Routes>
      </UserContextProvider>
    </Provider>
  );
}

export default App;
