# pull the Node.js Docker image
FROM node:latest as build-stage

# create the directory inside the container
WORKDIR /memobook.org

# copy the package.json files from local machine to the workdir in container
COPY . .


RUN cd memobook.org && npm i && npm run build


## server configuration
FROM nginx:latest as production-stage
COPY /memobook.org/nginx/nginx.conf /etc/nginx/nginx.conf
# website files
COPY --from=build-stage /memobook.org/memobook.org/dist /usr/share/nginx/html
EXPOSE 5000
CMD ["nginx", "-g", "daemon off;"]

