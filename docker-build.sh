docker build --tag=cicd-portal:0.0.1 --rm=true .
docker push cicd-portal:0.0.1
docker run -p 4200:4200 cicd-portal:0.0.1
