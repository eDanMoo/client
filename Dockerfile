#도커 이미지를 노드 16.19 기반으로 만든다.
FROM node:16.19.0-alpine 

# app라는 디렉토리 만들고 워크 디렉토리로 지정
# 파일들을 app 아래로 복사
RUN mkdir -p /app
WORKDIR /app
ADD . /app/

# RUN npm install -g pnpm
# RUN pnpm install
# RUN pnpm build

# RUN rm yarn.lock || true && rm package-lock.json || true
RUN npm install -g yarn && yarn install && yarn build

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]