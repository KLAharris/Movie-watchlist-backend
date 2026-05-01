 FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma
COPY prisma.config.ts ./
RUN npx prisma generate

RUN npm prune --omit=dev

COPY src ./src

EXPOSE 5001

CMD ["node", "src/server.js"]
