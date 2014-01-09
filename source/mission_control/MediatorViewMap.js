(function () {
  "use strict";

  Class('MissionControl.MediatorViewMap', {

    _injector: null,

    Constructor: function(injector) {
      if(injector) {
        this._injector = injector;
      } else {
        throw new Error('Injector instance is needed as constructor parameter to setup the mappings.');
      }
    },

    map: function (view) {
      return new MissionControl.mappings.MediatorViewMapping(view, this._injector);
    }

  });

}());