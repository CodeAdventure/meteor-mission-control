(function () {
  "use strict";

  Class('MissionControl.Mediator', {

    configure: function() {},

    destroy: function() {

      var dependencies = this.constructor.prototype.Dependencies;

      for(var dependencyName in dependencies) {

        if(dependencies.hasOwnProperty(dependencyName)) {

          // remove reference to dependency instance
          this[dependencyName] = null;

        }

      }

      // remove reference to the mediated view instance
      this.view = null;

    }

  });

}());