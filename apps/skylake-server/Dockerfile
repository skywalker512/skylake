FROM node:lts-slim

WORKDIR /app
COPY ./dist .
ENV NODE_ENV=production
EXPOSE 1234
CMD ["node", "index.js"]