

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const { sequelize } = require('./models');

app.use(cors());
app.use(express.json());

// Routes
app.get('/ping', (req, res) => {
  res.send('pong 🟢');
});
app.post('/test-register', (req, res) => {
  console.log('📩 Body reçu :', req.body);
  res.json({ message: 'Reçu !', body: req.body });
});

app.use('/auth', require('./routes/auth'));
app.use('/tickets', require('./routes/tickets'));
app.use('/admin', require('./routes/admin'));
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
  