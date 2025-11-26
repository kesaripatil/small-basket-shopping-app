import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const regex = /^[A-Za-z ]+$/;
    if (!regex.test(name)) return alert('Only letters and spaces allowed');

    fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem('username', data.user.name);
        localStorage.setItem('userId', data.user.id);
        navigate('/dashboard');
      });
  };

  return (
    <div>
      <h2>Welcome to Small Basket</h2>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
