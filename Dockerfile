# Step 1: Build the React app
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve the build using Nginx
FROM nginx:stable-alpine

# needed for envsubst
RUN apk add --no-cache gettext

# copy build output
COPY --from=build /app/build /usr/share/nginx/html

# copy the nginx template that uses ${PORT}
COPY default.conf.template /etc/nginx/conf.d/default.conf.template

# EXPOSE is informational; Cloud Run will set PORT at runtime
EXPOSE 8080

# render the template with the runtime PORT and start nginx
CMD ["sh", "-c", "envsubst '$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]
