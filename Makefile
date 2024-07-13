VERSION = v1.2.0
IMAGE_NAME = fastgpt-admin

# 构建镜像
build:
	docker build -t $(IMAGE_NAME):$(VERSION) .
