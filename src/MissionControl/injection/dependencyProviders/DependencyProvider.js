(function () {
  "use strict";

  Class('MissionControl.injection.dependencyProviders.DependencyProvider', {

    _type: null,

    initialize: function (type) {
      this._type = type;
    },

    getType: function () {
      return this._type;
    }

  });

}());