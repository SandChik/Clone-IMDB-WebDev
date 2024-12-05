# Gunakan image Node.js sebagai base image untuk build
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin seluruh kode aplikasi
COPY . .

# Build aplikasi
RUN npm run build

# Expose the frontend port
# EXPOSE 3000

# Start the frontend development server
# CMD ["npm", "start"]
# Gunakan image Nginx
FROM nginx:alpine

# Salin konfigurasi Nginx ke dalam kontainer
COPY nginx.conf /etc/nginx/nginx.conf

# Salin hasil build React dari /app/build ke direktori yang digunakan Nginx
COPY --from=build /app/build/ /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Jalankan Nginx
CMD ["nginx", "-g", "daemon off;"]
