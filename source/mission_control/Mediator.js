(function () {
  "use strict";

  Class('MissionControl.Mediator', {

    template: null,

    setup: function(template) {
      this.template = template;
    },

    templateDidRender: function(template) {

    },

    destroy: function() {

      var dependencies = this.constructor.prototype.Dependencies;

      for(var dependencyName in dependencies) {

        if(dependencies.hasOwnProperty(dependencyName)) {

          // remove reference to dependency instance
          this[dependencyName] = null;

        }

      }

      // remove reference to the mediated view instance
      this.template = null;

    }

  });

}());