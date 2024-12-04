FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy application files
COPY . .

# Expose the frontend port
EXPOSE 3000

# Start the frontend development server
CMD ["npm", "start"]
