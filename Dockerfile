# Stage 1: Build Angular app
FROM node:22.12 AS build   # Use Node 22.12 to match Angular CLI requirements

WORKDIR /app

# Copy package.json and package-lock.json first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build Angular app in production mode
RUN npm run build -- --configuration production   # <-- note the extra --

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built Angular app to Nginx html folder
COPY --from=build /app/dist/insurance-fe/browser /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
