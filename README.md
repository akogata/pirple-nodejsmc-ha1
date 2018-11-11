# pirple-nodejsmc-ha1

## The NodeJS Master Class - Home Assignment #1 - Hello World API

This is the first of several homework assignments you'll receive in this course. In order to receive your certificate of completion (at the end of this course) you must complete all the assignments and receive a passing grade. 

How to Turn It In:

1. Create a public github repo for this assignment. 

2. Create a new post in the Facebook Group  and note "Homework Assignment #1" at the top.

3. In that thread, discuss what you have built, and include the link to your Github repo. 

The Assignment:

Please create a simple "Hello World" API. Meaning:

1. It should be a RESTful JSON API that listens on a port of your choice. 

2. When someone posts anything to the route /hello, you should return a welcome message, in JSON format. This message can be anything you want. 

## Configuration
Configuration is stored in ./config.js, where one can change the environment name (dev/prod) and http/https port.

## Running - server
After clonning the repo, one can run the application by executing:
```
cd pirple-nodejsmc-ha1
node index.js
```
The expected output in case of success:
```
$ node index.js
Http server listening on port 3000 now in staging mode
Https server listening on port 3001 now in staging mode
```
By default, the **development** environment and the **port 3000** are chosen. This can be changed using **ENV_NODE** environment variable:

```
$ NODE_ENV=production node index.js
Http server listening on port 5000 now in production mode
Https server listening on port 5001 now in production mode
```

## Running - browser
Assuming the default configuration (envName:development/port:3000), once the url `localhost:3000` is opened in the browser, an empty JSON is returned (status 404).
The 'Hello World' API can be accessed by using `localhost:3000/hello`, which returns the expected greeting JSON.

**Bonus**
If a name is given, the API uses that:
`localhost:3000/hello?name=john`

## Using curl
`curl localhost:3000` ->  404

`curl localhost:3000/hello' -> default greeting

`curl localhost:3000/hello?name=john' -> custom greeting, query string

`curl localhost:3000/hello --header 'name=john'` -> custom greeting, header

`curl localhost:3000/hello?name=john --header 'name=jack' -> custom greeting, query string has priority over header parameter
