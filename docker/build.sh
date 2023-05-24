npm run build
cp -r ../dist ./
docker build --platform linux/amd64 -t registry.cn-hongkong.aliyuncs.com/baoyan/baoyanvideo-ui:v2.0.0 ./
docker push registry.cn-hongkong.aliyuncs.com/baoyan/baoyanvideo-ui:v2.0.0
