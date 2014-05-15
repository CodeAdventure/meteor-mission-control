(function () {
  "use strict";

  Class('MissionControl.Mediator', {

    template: null,

    setup: function(template) {
      this.template = template;

      this.configure();
    },

    configure: function() {},

    setupTemplateProperties: function(properties) {

      for(var index = 0; index < properties.length; index++) {

        var propertyName = properties[index];

        this.template.__component__[propertyName] = this._createBoundTemplatePropertyHelper(propertyName);

      }

    },

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
    },

    onSuccess: function(method) {
      return _.bind(method, this);
    },

    onError: function(method) {
      return _.bind(method, this);
    },

    _createBoundTemplatePropertyHelper: function(propertyName) {

      var This = this;

      return function() {
        return This[propertyName].get();
      };

    }

  });

}());