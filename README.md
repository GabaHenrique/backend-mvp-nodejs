# Rua Bike Shop — Backend

E-commerce fictício de peças e bikes BMX. Backend construído pra treinar arquitetura de verdade: camadas separadas, transações que não deixam dado pela metade no banco, autenticação com JWT, e deploy em produção — não só um CRUD rodando local.

🔗 [API em produção](https://backend-mvp-nodejs.onrender.com) · [Frontend em produção](https://rua-mvp-frontend.vercel.app) · [Repo do frontend](https://github.com/GabaHenrique/rua-mvp-frontend)

## Stack

Node.js, Express, MySQL (`mysql2`), JWT, Bcrypt, Docker, Jest.

Em produção: banco no **TiDB Cloud** (MySQL-compatible, SSL), backend no **Render** (deploy automático via Docker), frontend no **Vercel**.

## Arquitetura

```
Routes → Controller → Service → Model → MySQL
```

Separação clássica: controller só traduz HTTP, service concentra as regras de negócio, model só executa query.

## Destaques técnicos

- **Transação com rollback** na criação de pedido — se um item falhar (ex: estoque insuficiente), tudo é desfeito, nunca fica pedido pela metade no banco.
- **`SELECT ... FOR UPDATE`** trava a linha do produto durante a compra, evitando vender a mesma última unidade duas vezes em compras simultâneas.
- **JWT + middleware** protegendo rotas sensíveis (dashboard, criação de produto, registro de admin, status de pedido) — registro de novo admin exige um admin já autenticado.
- **Update parcial seguro**: editar só um campo do produto não sobrescreve os outros com `NULL`.

## Endpoints

**Products**
```
GET    /products               GET    /products/:id
POST   /products       🔒      PUT    /products/:id        🔒
DELETE /products/:id   🔒      PATCH  /products/:id/stock   🔒
```

**Orders**
```
POST   /orders                 GET    /orders
GET    /orders/:id              GET    /orders/with-products
PATCH  /orders/:id/status  🔒
```

**Admin**
```
POST   /admin/login             POST   /admin/register  🔒
GET    /admin/dashboard  🔒
```
🔒 = requer JWT válido

## Rodando local

```bash
git clone https://github.com/GabaHenrique/backend-mvp-nodejs.git
cd backend-mvp-nodejs
cp .env.example .env
docker compose up -d --build
```
API em `http://localhost:4001`.

## Testes

```bash
npx jest --verbose
```
Cobertura: `orderService`, `productService`, `adminService` (mocks, sem depender de banco real).

## Competências demonstradas

- API RESTful com autenticação stateless (JWT)
- Transações SQL com rollback e controle de concorrência (row-level locking)
- Arquitetura em camadas (Controller / Service / Model)
- Testes unitários com mocking (Jest)
- Containerização (Docker, Docker Compose, healthcheck)
- Deploy em produção com CI/CD via push (Render, Vercel) e banco gerenciado na nuvem (TiDB Cloud)
- Hash de senha (Bcrypt), variáveis de ambiente e CORS configurável por ambiente

## Em aberto

Fila de mensagens (BullMQ + Redis) pra e-mail de confirmação, integração de pagamento (Stripe/Mercado Pago), testes de integração pro `authMiddleware`.