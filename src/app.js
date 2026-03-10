// 1️⃣ Importações
require('dotenv').config();
const express = require('express');

// 2️⃣ Criar app
const app = express();


// 3️⃣ Middlewares globais
app.use(express.json());


// 1️⃣ Importações
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRoutes');



// 4️⃣ Registrar rotas
app.use('/products', productRoutes);
app.use('/admin', adminRoutes);


// 5️⃣ Porta
const PORT = 4000;

// 6️⃣ Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


