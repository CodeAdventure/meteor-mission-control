(function () {
  "use strict";

  Class('MissionControl.mediators.MediatorViewMap', {

    _injector: null,

    initialize: function(injector) {
      if(injector) {
        this._injector = injector;
      } else {
        throw new Error('Injector instance is needed as constructor parameter to setup the mappings.');
      }
    },

    map: function (view) {
      return new MissionControl.mediators.MediatorViewMapping(view, this._injector);
    }

  });

}());