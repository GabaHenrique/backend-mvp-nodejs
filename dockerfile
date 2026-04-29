# imagem base
FROM node:18

# pasta dentro do container
WORKDIR /app

# copiar arquivos
COPY package*.json ./

# instalar dependências
RUN npm install

# copiar resto do projeto
COPY . .

# expor porta
EXPOSE 4000

# comando de start
CMD ["npm", "start"]