FROM node as build-stage
WORKDIR /app
ADD . .
RUN yarn install
RUN yarn build

# production stage
FROM nginx:1.18 as production-stage
COPY ./data/nginx/app.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
