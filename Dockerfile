# Estágio 1: Build da aplicação
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Estágio 2: Servidor Web Leve
FROM nginx:alpine
# Copia os arquivos compilados do estágio anterior para a pasta pública do Nginx
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]