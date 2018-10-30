npm run build 

docker build --network="host" --build-arg HTTP_PROXY="http://proxy.dmz:3128" -t "cicd-portal:0.0.15" .

docker stop $(docker ps -q --filter "name=cicd-portal")

docker rm  $(docker ps -a -q --filter "name=cicd-portal")

docker run -d -t -i  \
-e BUILDER_API_URL='http://10.60.165.12:8090/builder-api' \
 -p 4200:4200 \
 --name=cicd-portal  cicd-portal:0.0.15
