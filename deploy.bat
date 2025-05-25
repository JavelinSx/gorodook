@echo off
echo Building project...
npm run build

echo Uploading to Yandex Object Storage...
aws s3 sync .output/public/ s3://gorodook.ru/ --endpoint-url https://storage.yandexcloud.net --delete

echo Deploy completed!
pause