[![version](https://badge.fury.io/js/logger-facade-nodejs.svg)](https://www.npmjs.org/package/logger-facade-nodejs)
[![Build Status](https://travis-ci.org/pjanuario/logger-facade-nodejs.svg?branch=master)](https://travis-ci.org/pjanuario/logger-facade-nodejs)
[![Code Climate](https://codeclimate.com/github/pjanuario/logger-facade-nodejs.png)](https://codeclimate.com/github/pjanuario/logger-facade-nodejs)
[![Coverage](http://img.shields.io/codeclimate/coverage/github/pjanuario/logger-facade-nodejs.svg)](https://codeclimate.com/github/pjanuario/logger-facade-nodejs)
[![Dependency Status](https://gemnasium.com/pjanuario/logger-facade-nodejs.svg)](https://gemnasium.com/pjanuario/logger-facade-nodejs)
![Grunt](https://cdn.gruntjs.com/builtwith.png)

Logger Facade Nodejs
====================

Simple node module to work as logger facade.

This simple logger facade allows you to hook plugins to execute async logging.

The logger facade contract:
```javascript
// register a plugin on logger
Logger.use(plugin);
// retrieve the list of plugin names
Logger.plugins();
// clean  up the list of plugins
Logger.clearPlugins();
// retrieve a logger with the specified name
var log = Logger.getLogger("Log Name");
```

The logger contract is:
```javascript
log.isDebug(); // return if in debug or trace level
log.trace("trace %s", "something");
log.debug("debug %s", "something"),
log.info("info");
log.warn();
log.error();
```

The logger uses util.format to build log message.


The plugins must follow this contract:
```javascript
plugin = {
  name: 'mock',
  isDebug: Function.apply(),
  trace: Function.apply(),
  debug: Function.apply(),
  info: Function.apply(),
  warn: Function.apply(),
  error: Function.apply()
};
```

# How to use it

Install it:

```
npm install logger-facade-nodejs
```

Set up plugins
```javascript
var Logger = require('logger-facade');

var plugin = {
  name: 'mock',
  isDebug: Function.apply(),
  trace: Function.apply(),
  debug: Function.apply(),
  info: Function.apply(),
  warn: Function.apply(),
  error: Function.apply()
};

Logger.use(plugin);

var log = Logger.getLogger("Log Name");

log.debug("something to log");

log.info("something to log in %s", 'info');
```

## Available plugins
* [Console](https://www.npmjs.org/package/logger-facade-console-plugin-nodejs)
* Airbrake (Will be developed soon)
* Elasticsearch (Will be developed soon)

** Do you need some other plugin?**

Feel free to create one and get in touch with me, that i will add it to this list.

# Contributing
Bug fixes and new features are of course very welcome!

To get started developing:
 - Install [Grunt](http://gruntjs.com/)
 - Install dependencies with ```npm install```
 - Run the test suite with ```npm test```

Please accompany any Pull Requests with the relevant test cases and make sure everything else still passes :).

# Credits
Shout out to @pjanuario.
