(function (globalNamespace) {
  "use strict";

  function defineMediatorViewMappingModule(Class) {

    return Class('MissionControl.mediators.MediatorViewMapping', {

      _view: null,

      initialize: function(view) {
        this._view = view;
      },

      getView: function() {
        return this._view;
      }

    });

  }

  // module dependencies
  var Class;

  // Return as AMD module or attach to head object
  if (typeof define !== "undefined") {
    define('MissionControl/mediators/MediatorViewMapping', ['Class'], function (Class) {
      return defineMediatorViewMappingModule(Class);
    });
  }
  // expose on agnostic namespace (browser)
  else if (typeof window !== "undefined") {
    /** @expose */
    Class = globalNamespace['Class'];

    defineMediatorViewMappingModule(Class);
  }
  // expose as node module
  else {
    Class = require('../../../src/Class')['Class'];

    globalNamespace.MediatorViewMapping = defineMediatorViewMappingModule(Class);
  }

}(typeof define !== "undefined" || typeof window === "undefined" ? exports : window));