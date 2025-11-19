const express = require('express');
const cors = require('cors');
const app = express();
const apiRoutes = require('./routes/api');

app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);

app.listen(5000, () => console.log('Backend running on port 5000'));
