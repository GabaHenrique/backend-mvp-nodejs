# 🚲 Rua Bike Shop - Backend API (MVP)

Backend de um e-commerce inspirado na Rua Bike Shop, desenvolvido como projeto de portfólio com foco em **arquitetura backend, APIs REST e banco de dados relacional**.

O projeto simula uma aplicação real de loja virtual, incluindo gestão de produtos, pedidos e métricas administrativas.

---

# 🧠 Tecnologias

- Node.js
- Express
- MySQL
- JWT (autenticação)
- Bcrypt (hash de senha)
- Dotenv

---

# 🏗 Arquitetura

O projeto segue uma arquitetura em camadas para separação de responsabilidades:


Frontend
   │
   ▼
Routes
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Models
   │
   ▼
MySQL

## 🗄 Banco de Dados


### 🔹 Descrição das camadas

- **Routes** → Define as rotas da aplicação  
- **Controllers** → Recebe requisições e retorna respostas  
- **Services** → Contém regras de negócio  
- **Models** → Comunicação direta com o banco de dados  
- **Database** → MySQL  

---

# 🗄 Banco de Dados

Estrutura baseada em MySQL com as seguintes entidades:

- `products`
- `orders`
- `order_items`
- `admins`

### 🔹 Relacionamentos

- Um pedido pode ter vários itens (`orders` ↔ `order_items`)
- Produtos são associados aos pedidos via JOIN

---

# ⚙️ Funcionalidades

### 🛍 Produtos
- CRUD completo
- Paginação
- Filtro por categoria
- Validação de dados

### 📦 Pedidos
- Criação de pedidos com múltiplos produtos
- Relacionamento com itens do pedido (JOIN)
- Consulta de pedidos com produtos vinculados

### 🔐 Autenticação
- Login de admin com JWT
- Senhas criptografadas com Bcrypt

### 📊 Admin / Métricas
- Total de pedidos
- Total de vendas
- Dados agregados do sistema

---

# 📡 Endpoints

## 🔹 Products

| Método | Rota | Descrição |
|------|------|---------|
| POST | /products | Criar produto |
| GET | /products | Listar produtos |
| GET | /products?category= | Filtrar por categoria |
| PATCH | /products/:id | Atualizar produto |
| DELETE | /products/:id | Deletar produto |

---

## 🔹 Orders

| Método | Rota | Descrição |
|------|------|---------|
| POST | /orders | Criar pedido |
| GET | /orders | Listar pedidos |
| GET | /orders/:id | Buscar pedido por ID |

---

## 🔹 Admin

| Método | Rota | Descrição |
|------|------|---------|
| POST | /admin/login | Login admin |
| GET | /admin/metrics | Métricas do sistema |

---

# ▶️ Como rodar o projeto

```bash
# instalar dependências
npm install

# rodar servidor
npm start