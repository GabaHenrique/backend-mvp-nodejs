// 1 Importações
require('dotenv').config();
const express = require('express');

// 2 Criar app
const app = express();


// 3  Middlewares globais
app.use(express.json());

// 4 Transactions Rotas 
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRoutes');

app.use('/orders', orderRoutes);
app.use('/products', productRoutes);
app.use('/admin', adminRoutes);

// 5 Order View
const orderViewRoutes = require('./routes/orderViewRoutes');

app.use('/orders', orderViewRoutes);


// 5 Porta
const PORT = 4000;

// 7 Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
