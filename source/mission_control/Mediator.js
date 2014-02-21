(function () {
  "use strict";

  Class('MissionControl.Mediator', {

    view: null,

    setup: function(view) {
      this.view = view;

      this.setupData();
    },

    setupData: function() {},

    viewDidRender: function() {},

    destroy: function() {

      var dependencies = this.constructor.prototype.Dependencies;

      for(var dependencyName in dependencies) {

        if(dependencies.hasOwnProperty(dependencyName)) {

          // remove reference to dependency instance
          delete this[dependencyName];

        }

      }

      // remove reference to the mediated view instance
      delete this.view;
    }

  });

}());