import { useNavigate } from 'react-router-dom';

export default function Success() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  return (
    <div>
      <h2>
        Payment successful, {username}! You bought fresh and healthy vegetables. Enjoy your meal!
      </h2>
      <button onClick={() => navigate('/dashboard')}>Continue Shopping</button>
    </div>
  );
}
