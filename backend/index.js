require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const { sequelize } = require('./models');

app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/tickets', require('./routes/tickets'));

// Sync DB
sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Backend running on port ${process.env.PORT}`);
  });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Erreur serveur' });
  });
  