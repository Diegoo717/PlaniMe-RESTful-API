require('dotenv').config();
require('./models');
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const apiKeyMiddleware = require('./middlewares/apiKeyMiddleware');
const jwtMiddleware = require('./middlewares/jwtMiddleware');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/plans', express.static(path.join(__dirname, 'plans')));
app.use('/api', authRoutes);
app.use('/api/protected', jwtMiddleware, protectedRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API RESTful corriendo en http://localhost:${PORT}`));
