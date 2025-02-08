import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOAuthClick = () => {
    // Placeholder function for OAuth click event
    console.log('OAuth button clicked');
  };

  return (
    <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleOAuthClick}>
      <AiFillGoogleCircle className='w-6 h-6 mr-2' />
      Continue with OAuth
    </Button>
  );
}
