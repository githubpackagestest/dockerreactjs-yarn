# Docker + ReactJS

### Notes and Background About React and Node

* React - It's principlally a front end library.
* Node - Excellent choice for backend since it is asynchronous, has non-blocking I/O, and is event-driven nature. Also has front end capability.
* Together Using NPM, Node works alongside the NPM registry to easily install any package through the NPM CLI. Node bundles a React application into a single file for easy compilation using webpack and several other Node modules.

#### Side Note - the MERN Stack and How Things Could Differ

* MongoDB - document database
* Express(.js) - Node.js web framework
* React(.js) - a client-side JavaScript framework - frameworks provides you the skeleton of an application, including pre-built code to listen at a port, parse HTTP requests, and format HTTP responses.
* Node(.js) - the premier JavaScript web server - web server responds to HTTP requests, sending back the data the request asked for.

In the case of Flask, - Flask is the framework, whereas Werkzeug is the Web Server Gateway Interface (WSGI), whereas the server may be Ngnix. In python, they use WSGI as an attempt to standardize things, whereas Node has everything architected directly in Javascript, custom for Node and there is no WSGI standard. Another example of an alternate WSGI in python is Gunicorn.

#### Another Side Note - Jinja vs. React

React vs. Jinja for flask applications - why would you want to use React when you could just use Jinja?

Jinja is a server-side template rendering engine while React is client-side.

> Jinja makes sense when you can't do much on the client other than render pages. Nowadays clients, even on phones, can do a lot more than they used to. Therefore it makes sense to use that to improve the user experience. For example, you can check inputs as they are being typed or you can use controls to draw to canvas. All of these sorts of dynamic things can't be done with Jinja-rendered templates alone.

### Installing React Globally

1. Install NPM globally on Ubuntu.

```
sudo apt install npm
```
2. Install react globally on Ubuntu.

```
sudo npm install -g create-react-app@3.4.1
```
3. Create [dockerfile](/Dockerfile)
4. Create [dockerignore](/.dockerignore)
5. Build and run dev version.

```
docker build -t sample:dev .

docker run \
    -it \
    --rm \
    -v ${PWD}:/app \
    -v /app/node_modules \
    -p 3001:3000 \
    -e CHOKIDAR_USEPOLLING=true \
    sample:dev
```

Note - the above Dockerfile as initially created doesn't work because of the following line:

> COPY package.json ./

Basically, we get an error saying that the package doesn't exist, and same for "package-lock.json" - so, we created files in the root directory with those titles (just blank files). These are presumably analogous to gemfiles or requirements.txt in python.

After doing that, the build passed - however, we get:

> The command '/bin/sh -c npm install --silent' returned a non-zero code: 1

So, we removed "--silent" from the dockerfile as well as all references to it.  After doing so, the dockerfile moved forward.  However, we get another error, stating that the package.json files need to be in json format.

After this point, the build seems to run, but we get the following package.json warnings:

```
npm WARN app No description
npm WARN app No repository field.
npm WARN app No license field.
```
Additionally, we get a number of deprecated package warnings, but ultimately the build is successful.

After attempting to run the docker build command we get the following error:

```
npm ERR! missing script: start
```
In a normal, non-docker environment, this error would come from missing a line in the package.json file, essentially a script which tells the application to start. In our example so far, our package.json file is completely blank.

One quick observation while attempting to diagnose this is that having to run npm install AFTER modifying package.json is very time consuming. For the time being, to eliminate the long wait time between cycles, it might make more sense to order the Dockerfile like so, until we need to put actual dependencies together:

```
RUN npm install
RUN npm install react-scripts@3.4.1 -g
COPY package.json ./
COPY package-lock.json ./
```
Once we have actual dependencies that we need to install, we could re-arrange the dockerfile with npm install after running COPY package.json.

Once we modify package.json to include some reference to a script, the container seems to build properly, but since we don't have any actual script, we get:

```
Error: Cannot find module '/app/your-script.js'
```
To understand the basics of what kind of script would be needed to run something, we started a [node tutorial](/notes/nodejstutorial.md).

After building a simple, runnable script and testing it on node without docker, we then run a build, having modified our package.json such that the start script points to app/main:

```
{
  "scripts": {
      "start": "app/main.js"
  }
}
```
We then get a permission denied error.  This appears to be a Docker problem, in which the file must be written as an executable, rather than a node problem. Essentially Docker is a linux environment (alpine) so we have to try something like the following:

```
RUN ["chmod", "+x", "executable.sh"]
```
Where executable.sh is a shell file that goes and starts the node file.  Note, the original line:

```
CMD ["npm", "start"]
```
..."start" refers to the start within the start package.json - "start": "app/main.js"

On the other hand, this may be a node error, as [this stackoverflow thread](https://stackoverflow.com/questions/51811564/sh-1-node-permission-denied) seems to indicate that the solution seems to be to run npm under a root account.

This stackoverflow exchange seems to indicate that [you can set up a temporary sudo user to execute npm installations, and there may be some caching issues to work thorough](https://stackoverflow.com/questions/21906419/dockerfile-npm-create-a-sudo-user-to-run-npm-install). However after we try this direction, we get the same error.

```
sh: app/main.js: Permission denied
npm ERR! code ELIFECYCLE
npm ERR! errno 126
npm ERR! @ start: `app/main.js`
npm ERR! Exit status 126

```
After doing some more Googling, it appears that we may actually have to build a React app and can't just start out quite as simply as creating a single node file at main.js.  We use command:

```
$ sudo npx create-react-app app
```
[npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) is an npm package runner, so basically what we're doing is running a, "create-react-app" package.

Note! Once this app is created, an additional [readme](/app/README.md) is created as well with various instructions on how to use and launch the application.

The process of building the app through npx looks like the following:

![reactappcreated](/img/reactappcreated.png)

The folder structure which gets created looks like the following:

![reactappcreated](/img/reactappcreated.png)

Note, when you navigate to the appropriate project folder and run,

You get the following terminal feedback:

```
Compiled successfully!

You can now view app in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.0.105:3000

Note that the development build is not optimized.
To create a production build, use npm run build.
```
And the localhost on your browser looks like the following:

![reactlaunched](/img/reactlaunched.png)


The docker file must then be re-created to contain the following:

```
# pull the base image
FROM node:alpine
# set the working direction
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install
# add app
COPY . ./
# start app
CMD ["npm", "start"]
```
Then we can add the following to our .dockerignore file:

```
node_modules
npm-debug.log
build
.dockerignore
**/.git
**/.DS_Store
**/node_modules
```

Finally, we can run the following in our base directory:

```
$ docker build -t ps-container:dev .
```
This tags a different image that what we had been building above, ps-container:dev

```
sudo docker run -it --rm \
-v ${PWD}:/app \
-v /app/node_modules \
-p 3001:3000 \
-e CHOKIDAR_USEPOLLING=true \
ps-container:dev
```
However now we are confronted with a new error:

```
sh: react-scripts: not found
```
Within the overall React project structure, react-scripts appears to be within /app/node_modules/react-scripts, a folder as shown below:

![](/img/react-scrpts.png)

These are evidently not getting copied over within the Dockerfile process, perhaps because the working directory is incorrect, or perhaps because node_modules is in our .dockerignore file.

We can start out by changing our working directory:

```
WORKDIR /
```
Once we changed the working directory, we get the following success message, as though we were running the app outside of a container:

```
Compiled successfully!

You can now view app in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://172.17.0.2:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

```
So now, if we visit "http://localhost:3001/" we see our react running.

Presumably this is being hosted within the actual docker process. We could test by killing the docker process and seeing if the localhost:3001 will still load.

First, we see that we have the following container running, with, "sudo docker ps -all":

```
CONTAINER ID   IMAGE              COMMAND                  CREATED         STATUS         PORTS                                       NAMES
b2ebde5c0a1a   ps-container:dev   "docker-entrypoint.s…"   3 minutes ago   Up 2 minutes   0.0.0.0:3001->3000/tcp, :::3001->3000/tcp   lucid_pascal
```
And indeed, when we run, "sudo docker stop <CONTAINER ID>" on this, the app crashes! It's alive!

5. A.) Hot Fixes

The section which is supposed to allow us to update the application after building the application is:

```
-e CHOKIDAR_USEPOLLING=true \
```
However


[//]: <> (..........SECTION..........)


6. If you want to use docker-compose...create docker-compose yml file.

```
version: '3.7'

services:

  sample:
    container_name: sample
    build:
      context: .
      dockerfile: Dockerfile
    volumes:
      - '.:/app'
      - '/app/node_modules'
    ports:
      - 3001:3000
    environment:
      - CHOKIDAR_USEPOLLING=true

```
7. Build with docker compose:

```
docker-compose up -d --build
```
8. Create prod dockerfile.

9. Build prod dockerfile.

```
docker build -f Dockerfile.prod -t sample:prod .
```

10. Start prod container.

```
docker run -it --rm -p 1337:80 sample:prod
```
11. Create docker-compose prod yml.

12. Run prod container with docker-compose

```
docker-compose -f docker-compose.prod.yml up -d --build
```
14. React Router

# References

1. [Using React and Node](https://www.simform.com/use-nodejs-with-react/)
2. [Dockerizing a React App](https://mherman.org/blog/dockerizing-a-react-app/)
3. [Using React with Docker](https://www.pluralsight.com/guides/using-react.js-with-docker) <--- Used to get started.
4. [NPX Package Runner](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b)
5. [Creating a React App](https://create-react-app.dev/docs/deployment/)
6. [Docker Create react app hot reload not working](https://stackoverflow.com/questions/58508772/docker-create-react-app-hot-reload-not-working)
