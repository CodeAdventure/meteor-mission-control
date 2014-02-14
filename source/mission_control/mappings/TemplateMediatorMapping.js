(function () {
  "use strict";

  Class('MissionControl.mappings.TemplateMediatorMapping', {

    _injector: null,
    _template: null,

    Constructor: function (template, injector) {
      this._template = template;

      if(injector) {
        this._injector = injector;
      } else {
        throw new Error('Injector argument is required but missing.');
      }
    },

    toMediator: function (MediatorClass) {

      var injector = this._injector;

      // create mapping for mediator class if it doesnt exist yet.
      if(!injector.hasMappingFor(MediatorClass)) {
        injector.map(MediatorClass);
      }

      var template = this._template;

      // instantiate and setup view when template is created
      template.created = function() {
        this.mediator = injector.get(MediatorClass);
        this.mediator.setup(template);
      };

      template.rendered = function() {
        this.mediator.templateDidRender();
      };

      template.destroyed = function() {

        if(this.mediator) {
          this.mediator.destroy();
          delete this.mediator;
        }

      };
    }

  });

}());