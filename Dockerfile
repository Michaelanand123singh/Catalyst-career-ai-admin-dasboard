# Step 1: Build the React app
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve the build using Nginx
FROM nginx:stable-alpine

# Install gettext for envsubst (so $PORT gets injected)
RUN apk add --no-cache gettext

# Copy build output
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx template
COPY default.conf.template /etc/nginx/conf.d/default.conf.template

# Cloud Run will set $PORT at runtime
EXPOSE 8080

# Render the nginx config with $PORT and start nginx
CMD ["sh", "-c", "envsubst '$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]
