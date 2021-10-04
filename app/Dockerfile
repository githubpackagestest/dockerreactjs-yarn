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
