# Usa Node oficial
FROM node:20

# Cria diretório app
WORKDIR /usr/src/app

# Copia os arquivos
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante
COPY . .

EXPOSE 3000

# Comando para iniciar
CMD [ "node", "index.js" ]


