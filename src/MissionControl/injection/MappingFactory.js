(function (globalNamespace) {
  "use strict";

  function defineMappingFactoryModule(Class, InjectionMapping) {

    return Class('MissionControl.injection.MappingFactory', {

      _typeMappings: null,

      initialize: function() {
        this._typeMappings = {};
      },

      create: function(type) {

        if(this.get(type)) {
          this._throwMappingWouldBeOverridenError(type);
        }

        var mapping = new InjectionMapping(type);

        this._typeMappings[type] = mapping;

        return mapping;
      },

      add: function(mapping) {
        var type = mapping.getRequestType();

        if(this.get(type)) {
          this._throwMappingWouldBeOverridenError(type);
        }

        this._typeMappings[mapping.getRequestType()] = mapping;
      },

      get: function(type) {
        return this._typeMappings[type];
      },

      _throwMappingWouldBeOverridenError: function(type) {
        throw new Error(
          'There already exists a mapping for ' + type + ', this would be overriden. ' +
            'You have to unmap the type before mapping it again.'
        );
      }

    }, true);

  }

  var Class, InjectionMapping;

  // Return as AMD module or attach to head object
  if (typeof define !== "undefined") {
    define('MissionControl/injection/MappingFactory', ['Class', 'InjectionMapping'], function (Class, InjectionMapping) {
      return defineMappingFactoryModule(Class, InjectionMapping);
    });
  }
  // expose on MissionControl namespace (browser)
  else if (typeof window !== "undefined") {
    /** @expose */
    Class = globalNamespace['Class'],
    InjectionMapping = globalNamespace.MissionControl.injection.InjectionMapping;

    globalNamespace.MissionControl.injection.MappingFactory = defineMappingFactoryModule(Class, InjectionMapping);
  }
  // expose on MissionControl namespace (node)
  else {
    Class = require('../../../src/Class')['Class'];
    InjectionMapping = require('../../../src/MissionControl/injection/InjectionMapping').InjectionMapping;

    globalNamespace.MappingFactory = defineMappingFactoryModule(Class, InjectionMapping);
  }

}(typeof define !== "undefined" || typeof window === "undefined" ? exports : window));