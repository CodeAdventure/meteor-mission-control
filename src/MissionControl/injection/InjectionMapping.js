(function () {
  "use strict";

  Class('MissionControl.injection.InjectionMapping', {

    _requestType: null,
    _responseType: null,
    _dependencyProvider: null,

    initialize: function (requestType, dependencyProvider) {
      this._requestType = requestType;

      if(dependencyProvider) {
        this._dependencyProvider = dependencyProvider;
      }
      else {
        this._dependencyProvider = new MissionControl.injection.dependencyProviders.ClassProvider(requestType);
      }
    },

    toSingleton: function (responseType) {
      this._responseType = responseType;
      this._dependencyProvider = new MissionControl.injection.SingletonProvider(responseType);

      return this;
    },

    asSingleton: function () {
      return this.toSingleton(this._requestType);
    },

    getProvider: function () {
      return this._dependencyProvider;
    },

    getResponseType: function () {
      return this._responseType;
    },

    getRequestType: function () {
      return this._requestType;
    },

    getInstance: function (injector) {
      return this._dependencyProvider.provideInstance(injector);
    }

  });

}());