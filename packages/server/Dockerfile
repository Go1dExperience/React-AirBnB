FROM node:14

RUN mkdir -p /app/server
COPY /packages/server/package.json /app/server
WORKDIR /app/server
RUN yarn
COPY /packages/server /app/server
RUN yarn build
RUN ls -la

EXPOSE 3001
CMD ["node", "./dist/index.js"]
