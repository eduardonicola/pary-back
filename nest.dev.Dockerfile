# Estágio 1: Imagem base para desenvolvimento
FROM node:22-alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie apenas os arquivos de pacotes para instalar as dependências primeiro
COPY package*.json ./

# Instale as dependências de desenvolvimento e produção
RUN npm install

# Instale nodemon globalmente para facilitar o desenvolvimento com hot-reload
RUN npm install -g nodemon

# Copie todo o restante do código
COPY . .

# Exponha a porta que o NestJS usará (geralmente 3000)
EXPOSE 3000

# Use o comando para rodar o NestJS em modo de desenvolvimento com hot-reload
CMD ["npm", "run", "start:dev"]
