FROM node:20-slim

WORKDIR /usr/src/app

# Copiamos archivos estáticos
COPY . .

# Instalamos 'serve' para servir HTML estático
RUN npm install -g serve

# Exponemos puerto 3000
EXPOSE 3000

# Servimos la carpeta actual
CMD ["serve", "-s", "public", "-l", "3000"]
