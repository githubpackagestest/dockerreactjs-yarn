# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
RUN npm install
RUN npm install react-scripts@3.4.1 -g
COPY package.json ./
COPY package-lock.json ./

# attempt to delete node_modules directory


# add app
COPY . ./

# start app
CMD ["npm", "start"]
