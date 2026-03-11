# 🚲 Rua Bike Shop - Backend API (MVP)

Backend de um e-commerce inspirado na Rua Bike Shop desenvolvido como projeto de portfólio para demonstrar habilidades em Node.js, arquitetura backend e banco de dados relacional.

## 🧠 Tecnologias

- Node.js
- Express
- MySQL
- JWT
- Bcrypt
- Dotenv

## Arquitetura - 
Client → Routes → Controller → Service → Model → Database

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

O projeto utiliza MySQL com as seguintes entidades:

- products
- orders
- order_items
- admins

## Features

Product CRUD
Authentication
Input validation

## 📦 Endpoints

Products

POST /products  
GET /products  
PATCH /products/:id  
DELETE /products/:id  

Orders

POST /orders

## Run project

npm install
npm start