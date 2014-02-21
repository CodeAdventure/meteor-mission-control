(function () {
  "use strict";

  Class('MissionControl.mappings.TemplateMediatorMapping', {

    _injector: null,
    _template: null,
    _context: null,

    Constructor: function (template, injector) {
      this._template = template;

      if(injector) {
        this._injector = injector;
      } else {
        throw new Error('Injector argument is required but missing.');
      }
    },

    inContext: function(context) {

      this._context = context;

      return this;
    },

    toMediator: function (MediatorClass) {

      var injector = this._injector;

      var template = this._template,
        context = this._context,
        templateCreatedCallback = template.created,
        templateRenderedFunction = template.rendered,
        templateDestroyedFunction = template.destroyed;

      // create mapping for mediator class if it doesnt exist yet.
      if(!injector.hasMappingFor(MediatorClass)) {
        injector.map(MediatorClass);
      }

      function createdCallback() {

        // call previously assigned render callbacks
        if(templateCreatedCallback) templateCreatedCallback.apply(this, arguments);

        // only assign mediator if the context is correct
        if(!context || (context != null && this.data.as == context)) {

          // assign mediator instance to template if has none yet
          if(!this.mediator) {
            this.mediator = this.data.mediator = injector.get(MediatorClass);
            this.mediator.setup(this);
          }
        }

      };

      // apply the created callback only once per template
      if(template.created != createdCallback) {
        template.created = createdCallback;
      }

      function destroyCallback() {

        // call previously assigned destroy callbacks
        if(templateDestroyedFunction) templateDestroyedFunction.apply(this, arguments);

        if(this.mediator) {
          this.mediator.destroy();
          delete this.mediator;
        }

      };

      // apply the destroy callback only once per template
      if(template.destroyed != destroyCallback) {
        template.destroyed = destroyCallback;
      }

    }

  });

}());