(function () {
  "use strict";

  Class('MissionControl.mappings.SignalCommandMapping', {

    _signalClass: null,
    _commandClass: null,
    _injector: null,

    initialize: function(signalClass, injector) {
      this._signalClass = signalClass;
      this._injector = injector;
    },

    toCommand: function(commandClass) {
      this._commandClass = commandClass;
      this._injector.getInstanceFor(this._signalClass).add(this.executeCommand, this);
    },

    executeCommand: function(signalData) {
      var commandInstance = this._injector.getInstanceFor(this._commandClass);

      commandInstance.data = signalData;
      commandInstance.execute();
    },

    setCommand: function(commandClass) {
      this._commandClass = commandClass;
    },

    getInjector: function() {
      return this._injector;
    }

  });

}());