### Adding Messages to Homepage and Recommendation Page

Within the return function we display either a buy, sell or hold field:

```
<div>
  <p>Today's $FCNTX Recommendation</p>
  <SvgBluecircle width="350" height="auto" />
  <h1>Hold</h1>
</div>
```

### Modifying Favicon

Basically, modify all of the specified favicons and logos in the, "public" file and keep the name the same.

To move quickly, I used [Favicon.io](https://favicon.io/emoji-favicons/blue-circle).

### reportWebVitals.js

Not needed at this time.

### setupTests.js

Not needed at this time.

### Deploying on Docker

After finishing up the app, build the image using the Docker procedure established previously:

```
docker build -t sample:dev .
```
After building everything, we get a lot of deprecated package warnings, however it deployed successfully on localhost:3001 with:

```
docker run \
    -it \
    --rm \
    -v ${PWD}:/app \
    -v /app/node_modules \
    -p 3001:3000 \
    -e CHOKIDAR_USEPOLLING=true \
    sample:dev
```

### Deploying on Heroku

The last time deploying to Heroku on the individual machine that the author is using was previous to the machine being wiped and re-installed in terms of the OS.

So, we have to go through the main steps needed to be able to deploy on Heroku again, much of which is elicidated on [this repo](https://github.com/pwdel/herokudockerflask).

#### Heroku CLI

[Per Heroku's Recommendations](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)

```
sudo snap install --classic heroku
```

After this is installed, we login to Heroku, create a new app and deploy.

#### Logging In

```
$ heroku login
```
Follow the browser prompt.

However, you also have to login to the Heroku docker registry.

```
$ sudo docker login --username=_ --password=$(heroku auth:token) registry.heroku.com
```
We got a security warning password, which doesn't really apply since we're pushing from a secure local linux machine, but good to note:

```
WARNING! Using --password via the CLI is insecure. Use --password-stdin.
WARNING! Your password will be stored unencrypted in /root/.docker/config.json.
Configure a credential helper to remove this warning. See
https://docs.docker.com/engine/reference/commandline/login/#credentials-store
```

#### Create a New App

Create a new app with heroku create:

```
$ sudo heroku create
```
(after a login process, we get...)

```
Creating app... done, ⬢ morning-escarpment-67260
https://morning-escarpment-67260.herokuapp.com/
```
#### Tagging New App on Docker Registry

We use our image named, "sample:dev" to tag with the following format, including the heroku app name:

> sudo docker tag IMAGE registry.heroku.com/APP_NAME/web

```
$ sudo docker tag sample:dev registry.heroku.com/morning-escarpment-67260/web
```

#### Release to Web

After the above tag has been added, simply do 1. Push to registry. 2. Release to registry.:

> docker push registry.heroku.com/<app>/<process-type>

```
sudo docker push registry.heroku.com/morning-escarpment-67260/web
```
You should get feedback (note that it's using the latest tag):

```
Using default tag: latest
The push refers to repository [registry.heroku.com/morning-escarpment-67260/web]
3188327bcc3d: Pushed
5976416b2268: Pushed
a15f11bf307d: Pushed
a64ef9976f22: Pushed
f6f8de2f23da: Pushed
93632468eabc: Pushed
42c97e50d44b: Pushed
b2d5eeeaba3a: Pushed
```

Then use the following format to release to the web:

> heroku container:release web -a APP_NAME

```
heroku container:release web -a morning-escarpment-67260
````

After this step, the container has been successfully pushed to Heroku.
