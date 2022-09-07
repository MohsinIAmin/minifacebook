FROM nginx:alpine

WORKDIR /var/www/html

COPY ./public/dist/public .

COPY ./nginx.conf /etc/nginx/conf.d/default.conf