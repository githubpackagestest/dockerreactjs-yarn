
We can run this as a two-stage build.  Basically in the previous configuration, we were copying all of our source code into the working directory. But really we only need the build folder to serve our website.

So whereas the previous buildfile looked like this:

```
# pull the base image
FROM node:12-alpine

# set the working direction
WORKDIR /

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

# adding yarn
RUN yarn

# add app
COPY . ./

# start app
CMD ["yarn", "start"]

```
We now create:

```
# STAGE 1

# pull the base image, name it "build"
FROM node:12-alpine AS build

# set the working directory
WORKDIR /

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

# adding yarn
RUN yarn install

# add app
COPY . ./

# run the yarn build, which was our base image above in that context
RUN yarn build

# STAGE 2

# base image
FROM node:12-alpine

# set the working directory
WORKDIR /

# install the webserver
RUN npm install -g webserver.local



# start app
CMD ["yarn", "start"]

```
