import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { formatISO9075 } from 'date-fns';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { UserContext } from './UserContext';

export default function Post({
  _id,
  title,
  summary,
  cover,
  content,
  createdAt,
  author,
}) {
  const [isDeleted, setIsDeleted] = useState(false);
  const { userInfo } = useContext(UserContext);

  const handleDelete = async () => {
    try {
      // Check if the current user is the author before making the DELETE request
      if (userInfo && userInfo.id === author._id) {
        const response = await fetch(`http://localhost:4000/post/${_id}`, {
          method: 'DELETE',
          credentials: 'include',
        });

        console.log('Delete Response:', response);

        if (response.ok) {
          setIsDeleted(true);
        } else {
          console.error(
            'Error deleting post. Status:',
            response.status,
            'Message:',
            response.statusText
          );
        }
      } else {
        console.error('Unauthorized: You can only delete your own posts.');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (isDeleted) {
    return null;
  }

  // Check if userInfo is null before accessing properties
  // console.log('userInfo._id:', userInfo?.id);
  // console.log('author._id:', author._id);
//   console.log('userInfo.id:', userInfo.id);
// console.log('author._id:', author._id);
// console.log('User Info:', userInfo.id);


  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img
            src={`http://localhost:4000/${cover}`}
            alt=""
            style={{
              width: '350px',
              height: '350px',
              borderRadius: '5px',
            }}
          />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <a style={{ color: '#ddd' }} className="author">
            {author.username}
          </a>
          <time style={{ color: '#888' }}>
            {formatISO9075(new Date(createdAt))}
          </time>
        </p>
        <p className="summary">{summary}</p>

        {/* Conditionally render the Delete Button based on the current user */}
        {userInfo?.id && author && author._id && userInfo.id === author._id && (
          <button
            onClick={handleDelete}
            style={{
              fontSize: '25px',
              float: 'right',
              background: 'none',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              transition: 'transform 0.3s ease-in-out',
            }}
            onMouseOver={(e) => {
              e.target.style.color = 'red';
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseOut={(e) => {
              e.target.style.color = 'white';
              e.target.style.transform = 'scale(1)';
            }}
          >
            <RiDeleteBin5Fill />
          </button>
        )}
      </div>
    </div>
  );
}
