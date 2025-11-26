import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [vegetables, setVegetables] = useState([]);
  const [cart, setCart] = useState({});
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchData = async () => {
      const vegRes = await fetch(`${process.env.REACT_APP_API_URL}/api/vegetables`);
      const vegData = await vegRes.json();
      setVegetables(vegData);

      const cartRes = await fetch(`${process.env.REACT_APP_API_URL}/api/checkout/${userId}`);
      const cartData = await cartRes.json();
      const cartState = {};
      cartData.forEach(item => {
        cartState[item.vegetable_id] = {
          id: item.vegetable_id,
          name: item.vegetable_name,
          price: item.total_price / item.quantity,
          quantity: item.quantity
        };
      });
      setCart(cartState);
    };

    fetchData();
  }, [userId]);

  const handleQuantityChange = (id, delta) => {
    setCart(prev => {
      const current = prev[id] || { ...vegetables.find(v => v.id === id), quantity: 0 };
      const newQty = Math.max(0, current.quantity + delta);
      return { ...prev, [id]: { ...current, quantity: newQty } };
    });
  };

  const isCheckoutEnabled = Object.values(cart).some(item => item?.quantity > 0);

  const handleCheckout = async () => {
    const items = Object.values(cart).map(item => ({
      id: item.id,
      quantity: item.quantity,
      total: item.price * item.quantity
    }));

    await fetch(`${process.env.REACT_APP_API_URL}/api/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items, userId })
    });

    navigate('/checkout');
  };

  return (
    <div>
      <h2>Hello, {username}</h2>
      {vegetables.map(veg => (
        <div key={veg.id}>
          <span>{veg.name} - ₹{veg.price}</span>
          <button onClick={() => handleQuantityChange(veg.id, -1)}>-</button>
          <span>{cart[veg.id]?.quantity || 0}</span>
          <button onClick={() => handleQuantityChange(veg.id, 1)}>+</button>
        </div>
      ))}
      <button onClick={handleCheckout} disabled={!isCheckoutEnabled}>Checkout</button>
    </div>
  );
}

