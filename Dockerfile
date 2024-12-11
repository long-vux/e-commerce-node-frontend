# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn
COPY . .

# Build React app
RUN npm run build

# Cài đặt server để serve build (nếu cần)
RUN npm install -g serve

# Expose cổng
EXPOSE 3000

# Serve ứng dụng
CMD ["serve", "-s", "build"]
