var _ = require('lodash');
var moment = require('moment');

(function() {

  var plugins = [];

  var LoggerInstance = function(name){

    this.isDebug = function(){

      var debug = false;

      plugins.forEach(function(plugin) {
        debug = plugin.isDebug() ? true : debug;
      });

      return debug;
    };

    var isString = function (val) {
      return (typeof val === 'string' || val instanceof String);
    };

    var log = function(data, level){

      var args = Array.prototype.slice.call(data);

      // handles call with no metadata
      if (args.length > 0 && isString(args[0])) {
        args.unshift(null);
      } else {
        // ensure the metadata that is logged is the one passed in the call
        // otherwise since log might be deffered the data migth be different already.
        args[0] = _.cloneDeep(args[0]);
      }

      // add logger name
      args.unshift(name);

      // add timestamp of the log entry
      // since logging is deffered we need to collect the timestamp
      args.unshift(moment.utc().toISOString());

      plugins.forEach(function(plugin) {

        var compute = function(){
          plugin[level].apply(plugin, args);
        };

        // using execution deferral
        setImmediate(compute);
      });
    };

    this.trace = function(){
      log(arguments, 'trace');
    };

    this.debug = function() {
      log(arguments, 'debug');
    };

    this.info = function(){
      log(arguments, 'info');
    };

    this.warn = function(){
      log(arguments, 'warn');
    };

    this.error = function(){
      log(arguments, 'error');
    };

  };

  var isValidPlugin = function(plugin){

    var isValid = plugin && plugin.name;
    isValid = isValid && (plugin.isDebug instanceof Function);
    isValid = isValid && (plugin.trace instanceof Function);
    isValid = isValid && (plugin.debug instanceof Function);
    isValid = isValid && (plugin.info instanceof Function);
    isValid = isValid && (plugin.warn instanceof Function);
    isValid = isValid && (plugin.error instanceof Function);

    return isValid;
  };

  var Logger = { };

  Logger.getLogger = function(name){
    return new LoggerInstance(name);
  };

  Logger.use = function(plugin) {

    if(isValidPlugin(plugin)){
      plugins.push(plugin);
    }
  };

  Logger.plugins = function() {

    return plugins.map(function(plugin){
      return plugin.name;
    });
  };

  Logger.clearPlugins = function() {

    plugins.splice(0, plugins.length);
  };

  module.exports = Logger;
}());
