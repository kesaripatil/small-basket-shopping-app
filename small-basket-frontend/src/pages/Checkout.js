import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchCheckout = async () => {
      const res = await fetch(`http://localhost:5000/api/checkout/${userId}`);
      const data = await res.json();
      setItems(data);
      setTotal(data.reduce((sum, item) => sum + Number(item.total_price), 0));
    };
    fetchCheckout();
  }, [userId]);

  const handlePurchase = async () => {
    if (items.length === 0) return;
    await fetch('http://localhost:5000/api/checkout/pay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    });
    navigate('/success');
  };

  return (
    <div>
      <h2>Checkout Summary for {username}</h2>
      {items.length === 0 ? (
        <>
          <p>NO Items in Cart</p>
          <button onClick={() => navigate('/dashboard')}>Continue Shopping</button>
        </>
      ) : (
        <>
          {items.map(item => (
            <div key={item.id}>
              {item.vegetable_name} x {item.quantity} = ₹{item.total_price}
            </div>
          ))}
          <h3>Total: ₹{total}</h3>
          <button onClick={handlePurchase}>Pay and Purchase</button>
          <button onClick={() => navigate('/dashboard')}>Go back to Shelves</button>
        </>
      )}
    </div>
  );
}

