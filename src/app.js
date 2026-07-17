// 1 Importações
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');



// 2 Criar app
const app = express();

// HELMET 
app.use(helmet());


// 3  Middlewares globais
app.use(express.json());

// 4 Transactions Rotas 
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok'})
});

const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRoutes');

const allowedOrigins = [process.env.FRONTEND_URL];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Bloqueado por CORS"));
    }
  }
}));
app.use('/orders', orderRoutes);
app.use('/products', productRoutes);
app.use('/admin', adminRoutes);


// 5 Porta
const PORT = process.env.PORT;

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.statusCode ? err.message : 'Erro interno no servidor';
  res.status(statusCode).json({ error: message });
});

// 7 Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
