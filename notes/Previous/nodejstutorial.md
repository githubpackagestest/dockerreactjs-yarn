# NodeJS Tutorial

## Overall Motivation

For a fully functional app. You would use react to create user interfaces. And nodejs for creating an API which your react app will call.

## What is Package.json?

package.json is a part of node.js and is a list of all of the meta-properties of the project including the name, browser, development vs. production variables and dependencies.

The most basic example of an empty [package.json file can be found here](/notes/empty_package.json).

## Getting started

We start out by creating a super simple script and putting it in /app/main.js:

```
var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello World!');
}).listen(8080);
```
We can then use node to run this script from the command line, under the appropriate folder structure (in this case, /app/ ).

```
$ node main.js
```
This very simply creates an app at localhost:8080 which says, "Hello World!"

This has been stored in [main.js](/notes/main.js).




# References

* [w3 Schools NodeJS Tutorial](https://www.w3schools.com/nodejs/)
* [Managing Package.json](https://krishankantsinghal.medium.com/package-json-understanding-it-for-your-nodejs-reactjs-angularjs-or-any-javascript-app-which-use-5a18de90d33)
