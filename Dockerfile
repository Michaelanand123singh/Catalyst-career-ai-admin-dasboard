# Step 1: Build Vite app
FROM node:18 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:stable-alpine
RUN apk add --no-cache gettext

# Copy Vite build output
COPY --from=build /app/dist /usr/share/nginx/html

# Copy Nginx template
COPY default.conf.template /etc/nginx/conf.d/default.conf.template

EXPOSE 8080

# Replace $PORT at runtime and start Nginx
CMD ["sh", "-c", "envsubst '$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]

