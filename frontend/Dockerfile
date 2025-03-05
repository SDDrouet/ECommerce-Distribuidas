# Usa una imagen base de Node para construir la aplicación
FROM node:20-alpine AS build

# Instala dependencias del sistema necesarias
RUN apk add --no-cache python3 make g++

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración de dependencias
COPY package*.json ./
COPY .env* ./

# Limpia la caché de npm e instala dependencias
RUN npm cache clean --force && \
    npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Usa nginx para servir la aplicación
FROM nginx:alpine

# Copia los archivos construidos desde la etapa de build
COPY --from=build /app/dist /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]