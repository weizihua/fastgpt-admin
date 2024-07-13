# fastgpt-admin
## 项目

使用[项目做的前端](https://github.com/stakeswky/fastgpt-admin)，重构了后台的接口和用户管理部分，可以实现简单的用户创建和管理，本地部署的版本是fastgpt4.8.3，可以进行用户的增删改查，暂时没时间开发团队部分的内容

## 本地开发

1. 修改 `.env.local`里面的环境变量，连接到本地部署的 mongodb 数据库
2. `pnpm i`
3. `pnpm dev`
4. 打开 `http://localhost:5173/` 访问前端页面
5. 后端接口运行在http://localhost:3001/

## 部署

1. Docker 构建镜像
   1. 运行 make build
   2. 运行 `docker-compose up -d`


2. 部署时候提前修改`docker-compose环境变量

```
MONGODB_URI: "mongodb://myusername:mypassword@127.0.0.1:27017/fastgpt?authSource=admin&directConnection=true"
MONGODB_NAME: "fastgpt"
ADMIN_USER: "root"
ADMIN_PASS: "1234"
ADMIN_SECRET: "fastgpt"
PARENT_URL: "http://127.0.0.1:3000/"  # FastGpt服务的地址
PARENT_ROOT_KEY: "root_key"  # FastGpt的rootkey
VITE_PUBLIC_SERVER_URL: "http://127.0.0.1:30003"  # 和server.js一致
```

## 贡献

欢迎贡献代码，平时比较忙可能没时间更新新内容
