FROM node:10-alpine

# Copy AppSource
COPY . /www/

#Installing angularCLI
RUN npm install -g @angular/cli

#Install all dependencies
RUN cd /www; npm install
#Creating a build using angularCLI
RUN cd /www; npm run build

# Set work directory to /www
WORKDIR /www

# set your port
ENV PORT 4200
#EXPOSE  4200

# start command as per package.json
CMD ["npm", "run", "start-prod"]
