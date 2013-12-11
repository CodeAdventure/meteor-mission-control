(function (globalNamespace) {
  "use strict";

  function defineSingletonProviderModule(Class) {

    return Class('MissionControl.injection.SingletonProvider', {

      _type: null,
      _instance : null,

      initialize: function(type) {
        this._type = type;
      },

      provideInstance: function() {
        return this._instance || this._createSingleton();
      },

      getType: function() {
        return this._type;
      },

      _createSingleton: function() {
        return this._instance = new this._type();
      }

    });

  }

  // module dependencies
  var Class;

  // Return as AMD module or attach to head object
  if (typeof define !== "undefined") {
    define('MissionControl/injection/SingletonProvider', ['Class'], function (Class) {
      return defineSingletonProviderModule(Class);
    });
  } 
  // expose on agnostic namespace (browser)
  else if (typeof window !== "undefined") {
    /** @expose */
    Class = globalNamespace['Class'];
    defineSingletonProviderModule(Class);
  }
  // expose as node module
  else {
    Class = require('../../../src/Class')['Class'];
    globalNamespace.SingletonProvider = defineSingletonProviderModule(Class);
  }
  
}(typeof define !== "undefined" || typeof window === "undefined" ? exports : window));