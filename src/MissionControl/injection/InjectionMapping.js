(function () {
  "use strict";

  Class('MissionControl.injection.InjectionMapping', {

    _requestType: null,
    _responseType: null,
    _dependencyProvider: null,

    initialize: function (requestType) {
      this._requestType = requestType;
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

    getInstance: function () {
      return this._dependencyProvider.provideInstance();
    }

  });

}());