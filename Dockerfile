FROM mhart/alpine-node:base

WORKDIR /src
ADD . .

EXPOSE 5005
CMD ["node", "server.js"]
