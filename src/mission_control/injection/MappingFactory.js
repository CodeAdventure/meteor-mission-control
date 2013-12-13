(function () {
  "use strict";

  Class('MissionControl.injection.MappingFactory', {

    _typeMappings: null,

    initialize: function () {
      this._typeMappings = {};
    },

    create: function (type) {

      if (this.get(type)) {
        this._throwMappingWouldBeOverridenError(type);
      }

      var mapping = new MissionControl.injection.InjectionMapping(type);

      this._typeMappings[type.toString()] = mapping;

      return mapping;
    },

    add: function (mapping) {
      var type = mapping.getRequestType();

      if (this.get(type)) {
        this._throwMappingWouldBeOverridenError(type);
      }

      this._typeMappings[mapping.getRequestType()] = mapping;
    },

    get: function (type) {
      return this._typeMappings[type] || null;
    },

    _throwMappingWouldBeOverridenError: function (type) {
      throw new Error(
        'There already exists a mapping for ' + type + ', this would be overriden. ' +
          'You have to unmap the type before mapping it again.'
      );
    }

  });

}());