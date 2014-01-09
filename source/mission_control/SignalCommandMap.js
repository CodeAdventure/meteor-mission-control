(function () {
  "use strict";

  Class('MissionControl.SignalCommandMap', {

    _injector: null,

    Constructor: function(injector) {
      this._injector = injector;
    },

    map: function(signalClass) {
      return new MissionControl.mappings.SignalCommandMapping(signalClass, this._injector);
    }

  });

}());