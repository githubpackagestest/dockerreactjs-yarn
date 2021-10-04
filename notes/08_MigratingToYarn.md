
# Yarn Installation

```
npm install --global yarn
```
# Converting from npm to Yarn

We can simply run the following within the /app/src file:

```
yarn
```

> In most cases, running yarn or yarn add for the first time will just work. In some cases, the information in a package.json file is not explicit enough to eliminate dependencies, and the deterministic way that Yarn chooses dependencies will run into dependency conflicts. This is especially likely to happen in larger projects where sometimes npm install does not work and developers are frequently removing node_modules and rebuilding from scratch. If this happens, try using npm to make the versions of dependencies more explicit, before converting to Yarn.

## Verifying Works in Yarn on Local Machine

npm start --> yarn start

By running, "yarn start," we can successfully run the program on localhost.

# CLI Commands Comparison

* [Source](https://classic.yarnpkg.com/en/docs/migrating-from-npm/#toc-cli-commands-comparison)

## Changing the Dockerfile

### adding yarn

RUN npm install --> RUN yarn add

CMD ["npm", "start"] --> CMD ["yarn", "start"]

## Running the Dockerfile Again

Build the image:

```
docker build -t ps-container:dev .
```
When we attempt to build, we get the following message:

```
#8 0.480 error Missing list of packages to add to your project.
#8 0.481 info Visit https://yarnpkg.com/en/docs/cli/add for documentation about this command.
```
This is because, "yarn add" is not directly equivalent to "npm install" - whereas npm install is a function that installs either individual packages or all packages, "yarn add" is designed to install individual packages while, "yarn" installs all of the dependencies from package.json. 

After we change this and run the buildfile, we see that the image size is still inthe 456MB range. To shrink this, we can start by using node:12-alpine rather than node:alpine, then running the build again.

FROM node:alpine --> FROM node:12-alpine

This reduced the size down to 418MB, which is not a huge improvement. But, we can test to make sure it runs:


```
docker run -it --rm \
-v ${PWD}:/app \
-v /app/node_modules \
-p 3001:3000 \
-e CHOKIDAR_USEPOLLING=true \
ps-container:dev
```
This we find running on 0.0.0.0:3001.

# Next Options

We could attempt to shrink the container size with a multistage build.


# Resources

* [Migrating to Yarn](https://classic.yarnpkg.com/en/docs/migrating-from-npm/)
* [NPM to Yarn](https://classic.yarnpkg.com/en/docs/migrating-from-npm/#toc-cli-commands-comparison)
* [Shrinking Image Size](https://javascript.plainenglish.io/how-i-reduced-docker-image-size-from-1-43-gb-to-22-4-mb-84058d70574b)