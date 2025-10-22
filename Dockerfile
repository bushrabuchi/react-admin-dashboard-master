# Multi-stage build for React (CRA) app

# 1) Build stage
FROM node:18-alpine AS build
WORKDIR /app

# Install deps separately for better layer caching
COPY package*.json ./
RUN npm ci --legacy-peer-deps --no-audit --no-fund

# Copy source and build
COPY . .
RUN npm run build

# 2) Runtime stage (Nginx)
FROM nginx:alpine

# Copy build output to Nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Optional: custom Nginx config could be added here if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]


