# 使用 node 官方的 Alpine 基础镜像
FROM node:18.17-alpine AS builder

# 设置 npm 和 pnpm 的镜像源
RUN npm config set registry https://registry.npmmirror.com/ && \
    apk add --no-cache libc6-compat && \
    npm install -g pnpm && \
    pnpm config set registry https://registry.npmmirror.com/

# 设置工作目录
WORKDIR /app

# 设置环境变量
ENV NEXT_TELEMETRY_DISABLED=1 \
    VITE_PUBLIC_SERVER_URL=""

# 复制项目文件到容器
COPY . .

# 安装依赖并构建项目
RUN pnpm install && \
    pnpm build

# 生产阶段
FROM node:18.17-alpine AS runner

WORKDIR /app

# 设置环境变量
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3001

# 安装运行时依赖
RUN apk --no-cache add curl ca-certificates && \
    update-ca-certificates

# 复制构建阶段生成的文件到生产镜像
COPY --from=builder /app/server.js ./server.js
COPY --from=builder /app/service ./service
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

# 安装生产依赖
RUN npm install -g pnpm && \
    pnpm config set registry https://registry.npmmirror.com/ && \
    pnpm install --prod && \
    npm remove -g pnpm

# 设置容器监听端口
EXPOSE 3001

# 不切换用户，使用 root 用户运行
# USER nextjs

# 设置容器启动命令
CMD ["node", "server.js"]
