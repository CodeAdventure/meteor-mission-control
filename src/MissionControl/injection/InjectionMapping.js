(function (globalNamespace) {
  "use strict";

  function defineInjectionMappingModule(Class, SingletonProvider) {

    return Class('MissionControl.injection.InjectionMapping', {

      _requestType: null,
      _responseType: null,
      _dependencyProvider: null,

      initialize: function(requestType) {
        this._requestType = requestType;
      },

      toSingleton: function(responseType) {
        this._responseType = responseType;
        this._dependencyProvider = new SingletonProvider(responseType);

        return this;
      },

      asSingleton: function() {
        return this.toSingleton(this._requestType);
      },

      getProvider: function() {
        return this._dependencyProvider;
      },

      getResponseType: function() {
        return this._responseType;
      },

      getRequestType: function() {
        return this._requestType;
      },

      getInstance: function() {
        return this._dependencyProvider.provideInstance();
      }

    });

  }

  // module dependencies
  var Class, SingletonProvider;

  // Return as AMD module or attach to head object
  if (typeof define !== "undefined") {
    define('MissionControl/injection/InjectionMapping', ['Class', 'SingletonProvider'], function (Class, SingletonProvider) {
      return defineInjectionMappingModule(Class, SingletonProvider);
    });
  } 
  // expose on agnostic namespace (browser)
  else if (typeof window !== "undefined") {
    /** @expose */
    Class = globalNamespace['Class'];
    SingletonProvider = globalNamespace.MissionControl.injection.SingletonProvider;

    defineInjectionMappingModule(Class, SingletonProvider);
  }
  // expose as node module
  else {
    Class = require('../../../src/Class')['Class'];
    SingletonProvider = require('./SingletonProvider').SingletonProvider;

    globalNamespace.InjectionMapping = defineInjectionMappingModule(Class, SingletonProvider);
  }
  
}(typeof define !== "undefined" || typeof window === "undefined" ? exports : window));