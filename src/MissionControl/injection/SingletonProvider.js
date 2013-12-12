(function () {
  "use strict";

  Class('MissionControl.injection.SingletonProvider', {

    _type: null,
    _instance: null,

    initialize: function (type) {
      this._type = type;
    },

    provideInstance: function () {
      return this._instance || this._createSingleton();
    },

    getType: function () {
      return this._type;
    },

    _createSingleton: function () {
      this._instance = new this._type();

      return this._instance;
    }

  });

}());