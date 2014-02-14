(function () {
  "use strict";

  Class('MissionControl.mappings.SignalCommandMapping', {

    _signalClass: null,
    _commandClass: null,
    _injector: null,

    Constructor: function(signalClass, injector) {
      this._signalClass = signalClass;
      this._injector = injector;
    },

    toCommand: function(commandClass) {

      this._commandClass = commandClass;

      // create mapping for signal class if it doesnt exist yet.
      if(!this._injector.hasMappingFor(this._signalClass)) {
        this._injector.map(this._signalClass).asSingleton();
      }

      // create mapping for command class if it doesnt exist yet.
      if(!this._injector.hasMappingFor(commandClass)) {
        this._injector.map(commandClass);
      }

      this._injector.get(this._signalClass).add(this.executeCommand, this);
    },

    executeCommand: function(signalData) {
      var commandInstance = this._injector.get(this._commandClass);

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