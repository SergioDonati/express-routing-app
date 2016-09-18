# Express Routing App

	Helper for routing [Express](http://expressjs.com/) applications.

## Install

This module require node >= 6.5.0 because is written with the last ECMAScript 6 features, so firstly check you version.

```bash
$ npm install express-routing-app --save
```

## Example

###### /index.js

```javascript
const express = require('express');
const app = express();
const RoutingApp = require('express-routing-app');

const routingApp = new RoutingApp({
	root: __dirname,
	models: {
		User: ...
	}
});

app.use(routingApp.Router(__dirname+'/router/index', { message: 'Hello' }));

app.listen(3000);
```

###### /router/index.js

```javascript
module.exports = function(router, routingApp, args){

	router.get('/', function(req, res, next){
		res.render('index', { message: args.message });
	});

	router.use('/user', routingApp.Route(__dirname+'/user'));
}
```

###### /router/user.js

```javascript
module.exports = function(router, routingApp){

	const {User} = routingApp.models;

	router.get('/', function(req, res, next){
		User.find({}, function(err, users){
			res.render('users', { users: users });
		});
	});
}
```

## How work

Instantiate the class passing all variables, methods or other stuff to constructor:
```javascript
const RoutingApp = require('express-routing-app');
const routingApp = new RoutingApp({
	root: __dirname,
	myFun: function(){ ... }
	models: {
		User: ...
	}
});
```
now you can call *Router* method passing the absolute path of the file that defining you router,
optionally you can pass also your parameters
*Router* method return a new express router
```javascript
app.use(routingApp.Router(absoluteFilePath, yourParameter1, yourParameter2));
```
the passed file can export an express router or export a function with the follow format
```javascript
function (router, routingApp, ...yourParameters)
```
* *router* is the new express router, use it for implement your logic
* *routingApp* is the routingApp instance that call this file, use it for access to all your application stuff or call nested *Router*
* *yourParameters* spreaded parameters that you pass when calling *Router*

## Credits

- [Sergio Donati](https://github.com/SergioDonati)

## License

[MIT](LICENSE)

Copyright (c) 2016 Sergio Donati
