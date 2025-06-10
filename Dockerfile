# シンプルに静的ファイルを出すだけなら
FROM node:20

WORKDIR /app

COPY web/ .

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", ".", "-l", "3000"]