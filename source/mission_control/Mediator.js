(function () {
  "use strict";

  Class('MissionControl.Mediator', {

    template: null,

    setup: function(template) {
      this.template = template;

      this.setupData();
    },

    setupData: function() {},

    templateDidRender: function() {},

    destroy: function() {

      var dependencies = this.constructor.prototype.Dependencies;

      for(var dependencyName in dependencies) {

        if(dependencies.hasOwnProperty(dependencyName)) {

          // remove reference to dependency instance
          delete this[dependencyName];

        }

      }

      // remove reference to the mediated view instance
      delete this.template;
    }

  });

}());