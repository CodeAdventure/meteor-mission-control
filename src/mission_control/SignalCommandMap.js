(function () {
  "use strict";

  Class('MissionControl.SignalCommandMap', {

    _injector: null,

    initialize: function(injector) {
      this._injector = injector;
    },

    map: function(signalClass) {
      return new MissionControl.mappings.SignalCommandMapping(signalClass, this._injector);
    }

  });

}());