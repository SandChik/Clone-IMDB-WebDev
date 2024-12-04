FROM node:18-slim

# Set working directory
WORKDIR /app

# Install OpenSSL (optional)
RUN apt-get update -y && apt-get install -y openssl

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Pastikan folder prisma disalin dengan benar
COPY prisma ./prisma/ 

# Generate Prisma Client
RUN npx prisma generate

# Apply migrations
#RUN npx prisma migrate deploy

# Salin seluruh kode backend
COPY . .

# Expose port backend
EXPOSE 5000

# Jalankan server
CMD ["node", "src/Backend/Server/server.js"]
