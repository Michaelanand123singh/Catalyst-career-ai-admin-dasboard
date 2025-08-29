
# Step 1: Build Vite app
FROM node:18 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Pass build-time env var here using ARG and ENV
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=https://catalyst-career-ai-backend-147549542423.asia-southeast1.run.app

RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:stable-alpine
RUN apk add --no-cache gettext

COPY --from=build /app/dist /usr/share/nginx/html
COPY default.conf.template /etc/nginx/conf.d/default.conf.template

EXPOSE 8080
ENV PORT=8080

CMD ["sh", "-c", "envsubst '$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]
