# use a imagem oficial do Node.js (já traz npm)
FROM node:18-alpine

WORKDIR /app

# copia só as definições de dependências primeiro
COPY package*.json ./

# instala via npm sem erro
RUN npm install

# copia o restante do código
COPY . .

# inicia sua aplicação
CMD ["npm", "run", "start"]
