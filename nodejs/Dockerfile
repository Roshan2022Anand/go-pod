FROM node:22-alpine AS builder

WORKDIR /server

COPY package.json package.json
COPY pnpm-lock.yaml pnpm-lock.yaml

RUN npm install -g pnpm
RUN pnpm install

COPY . .
RUN pnpm build

FROM node:22-alpine AS runner

WORKDIR /server

COPY --from=builder /server/dist ./dist
COPY --from=builder /server/package.json ./package.json
COPY --from=builder /server/pnpm-lock.yaml ./pnpm-lock.yaml

RUN npm install -g pnpm
RUN pnpm install --prod

EXPOSE 5000

ENTRYPOINT [ "pnpm","start" ]