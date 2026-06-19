// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const checkupRoutes = require('./routes/checkupRoutes');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api', checkupRoutes);

// // Database Connection
// mongoose.connect('mongodb://127.0.0.1:27017/medai', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('✅ MongoDB Connected'))
// .catch(err => console.error('❌ MongoDB Error:', err));

// // Test Route
// app.get('/', (req, res) => res.send('MedAI Backend Running...'));

// // Start Server
// const PORT = 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const checkupRoutes = require('./routes/checkupRoutes');

const app = express();

// =======================
// MIDDLEWARE
// =======================
app.use(cors({
  origin: "*"
}));
app.use(express.json());

// =======================
// ROUTES
// =======================
app.use('/api', checkupRoutes);

// =======================
// MONGODB CONNECTION
// =======================
// IMPORTANT: Use MongoDB Atlas URL in Render ENV
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Error:', err));

// =======================
// TEST ROUTE
// =======================
app.get('/', (req, res) => {
  res.send('MedAI Backend Running...');
});

// =======================
// START SERVER (RENDER SAFE)
// =======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
