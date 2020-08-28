# 開発用: src をボリュームマウントして dev/start する
FROM node:lts-alpine AS dev
EXPOSE 3000
WORKDIR /src
CMD [ "run", "start" ]
ENTRYPOINT [ "yarn" ]

# 本番用: ボリュームマウントせずビルドしたコンテンツを封入する
FROM dev AS build
ADD . /src
WORKDIR /src
RUN yarn \
 && yarn build \
 && cp -R dist /app \
 && rm -rf /src
WORKDIR /app

# 本番用: Webサーバーにコンテンツを乗せる
FROM httpd:2.4-alpine AS prod
COPY --from=build /app /usr/local/apache2/htdocs/
WORKDIR /usr/local/apache2/htdocs
EXPOSE 80
