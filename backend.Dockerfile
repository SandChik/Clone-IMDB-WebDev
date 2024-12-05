FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install OpenSSL (optional)
# RUN apt-get update -y && apt-get install -y openssl

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin seluruh kode aplikasi
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Apply migrations
#RUN npx prisma migrate deploy

# Expose port backend
EXPOSE 7001

# Jalankan server
CMD ["node", "src/Backend/Server/server.js"]
