const express = require('express');
const db = require('../db.js');

const router = express.Router();

// Login
router.post('/login', async (req, res) => {
  const { name } = req.body;
  const [existing] = await db.query('SELECT * FROM users WHERE name = ?', [name]);
  if (existing.length > 0) return res.json({ user: existing[0] });

  const [result] = await db.query('INSERT INTO users (name) VALUES (?)', [name]);
  const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [result.insertId]);
  res.json({ user: rows[0] });
});

// Vegetables
router.get('/vegetables', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM vegetables WHERE available = 1');
  res.json(rows);
});

// Checkout insert/update/delete
router.post('/checkout', async (req, res) => {
  const { items, userId } = req.body;

  for (const item of items) {
    const [existing] = await db.query(
      'SELECT * FROM checkout WHERE user_id = ? AND vegetable_id = ? AND paid = false',
      [userId, item.id]
    );

    if (item.quantity === 0) {
      if (existing.length > 0) {
        await db.query('DELETE FROM checkout WHERE id = ?', [existing[0].id]);
      }
      continue;
    }

    if (existing.length > 0) {
      await db.query(
        'UPDATE checkout SET quantity = ?, total_price = ? WHERE id = ?',
        [item.quantity, item.total, existing[0].id]
      );
    } else {
      await db.query(
        'INSERT INTO checkout (vegetable_id, quantity, total_price, user_id, paid, created_at) VALUES (?, ?, ?, ?, false, NOW())',
        [item.id, item.quantity, item.total, userId]
      );
    }
  }

  res.json({ message: 'Cart updated successfully' });
});

// Checkout summary (only unpaid)
router.get('/checkout/:userId', async (req, res) => {
  const { userId } = req.params;
  const [rows] = await db.query(`
    SELECT c.id, c.vegetable_id, v.name AS vegetable_name, c.quantity, c.total_price
    FROM checkout c
    JOIN vegetables v ON c.vegetable_id = v.id
    WHERE c.user_id = ? AND c.paid = false
  `, [userId]);
  res.json(rows);
});

// Mark items as paid
router.post('/checkout/pay', async (req, res) => {
  const { userId } = req.body;
  await db.query('UPDATE checkout SET paid = true WHERE user_id = ? AND paid = false', [userId]);
  res.json({ message: 'Payment successful' });
});

module.exports = router;

