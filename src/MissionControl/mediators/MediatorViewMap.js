(function (globalNamespace) {
  "use strict";

  function defineMediatorViewMapModule(Class, MediatorViewMapping) {

    return Class('MissionControl.mediators.MediatorViewMap', {

      map: function(view) {
        return new MediatorViewMapping(view);
      }

    });

  }

  // module dependencies
  var Class, MediatorViewMapping;

  // Return as AMD module or attach to head object
  if (typeof define !== "undefined") {
    define('MissionControl/mediators/MediatorViewMap',
      ['Class', 'MissionControl/mediators/MediatorViewMapping'],

      function (Class, MediatorViewMapping) {
        return defineMediatorViewMapModule(Class, MediatorViewMapping);
    });
  }
  // expose on global namespace (browser)
  else if (typeof window !== "undefined") {
    /** @expose */
    Class = globalNamespace['Class'];
    MediatorViewMapping = globalNamespace.MissionControl.mediators.MediatorViewMapping;

    defineMediatorViewMapModule(Class, MediatorViewMapping);
  }
  // expose as node module
  else {
    Class = require('../../../src/Class')['Class'];
    MediatorViewMapping = require('./MediatorViewMapping')['MediatorViewMapping'];

    globalNamespace.MediatorViewMap = defineMediatorViewMapModule(Class, MediatorViewMapping);
  }

}(typeof define !== "undefined" || typeof window === "undefined" ? exports : window));