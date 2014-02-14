(function () {
  "use strict";

  Class('MissionControl.TemplateViewMap', {

    _injector: null,

    Constructor: function(injector) {
      if(injector) {
        this._injector = injector;
      } else {
        throw new Error('Injector instance is needed as constructor parameter to setup the mappings.');
      }
    },

    map: function (template) {
      return new MissionControl.mappings.TemplateMediatorMapping(template, this._injector);
    }

  });

}());