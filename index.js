'use script';

const path = require('path');
const express = require('express');

module.exports = class RoutingApp {
	constructor(args){
		const keys = Object.keys(args);
		for(let i=0;i<keys.length;i++){
			this.add(keys[i], args[key]);
		}
	}

	/**
	 *	This method allow to add property after contructor
	 */
	add(key, o){
		if (this[key]) throw new Error('Property "'+key+'" just exist! Check for double add.');
		this[key] = o;
	}

	/**
	 *	A simple shorthand
	 */
	get isDev(){
		if (!process.env.NODE_ENV) return true;
		return process.env.NODE_ENV == 'development';
	}

	/**
	 *	Return an express router from the file
	 */
	Router(routerFilePath, ...args){
		const route = require(path.normalize(routerFilePath));
		if (typeof route !== 'undefined' && route.stack) return route;	// check if is an express router
		else if (typeof route === 'function'){
			const router = express.Router();
			route(router, this, ...args);
			return router;
		} else throw new Error('The file '+routerFilePath+' must export function(router, app, options) or an express router');
	}
}
