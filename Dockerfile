# Step 1: Build Vite app
FROM node:18 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Use production env file
ENV NODE_ENV=production
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:stable-alpine

# Add gettext for envsubst (Cloud Run $PORT handling)
RUN apk add --no-cache gettext

COPY --from=build /app/dist /usr/share/nginx/html
COPY default.conf.template /etc/nginx/conf.d/default.conf.template

EXPOSE 8080

CMD ["sh", "-c", "envsubst < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]
