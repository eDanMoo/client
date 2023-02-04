#도커 이미지를 노드 16.19 기반으로 만든다.
FROM node:16.19.0-alpine as build-stage

# app라는 디렉토리 만들고 워크 디렉토리로 지정
# 파일들을 app 아래로 복사
RUN mkdir -p /app
WORKDIR /app
ADD . /app/

# RUN npm install -g pnpm
# RUN pnpm install
# RUN pnpm build

# RUN rm yarn.lock || true && rm package-lock.json || true
# RUN apt update && apt upgrade -y && apt install npm
RUN yarn install && yarn build

# FROM nginx:1.18.0-alpine as production-stage
# RUN mkdir /app
# COPY --from=build-stage /app/dist /app
# COPY ./config/nginx/default.conf /etc/nginx/default.conf

# FROM nginx:stable-alpine
# RUN rm -rf /etc/nginx/conf.d/default.conf
# COPY --from=build-stage /app/config/nginx/default.conf /etc/nginx/conf.d/default.conf

# RUN rm -rf /usr/share/nginx/html/*
# COPY --from=build-stage /app/dist /usr/share/nginx/html

FROM nginx:stable-alpine as production-stage
# COPY --from=build-stage /app/dist /usr/share/nginx/html
# RUN rm /etc/nginx/conf.d/default.conf
COPY ./config/nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000 
CMD [ "nginx", "-g", "daemon off;" ]

#ENV HOST 0.0.0.0
#EXPOSE 3000

#ENTRYPOINT [ "ngnix", "-g", "daemon off;" ]

#CMD ["yarn", "preview"]
