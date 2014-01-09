(function () {
  "use strict";

  Class('MissionControl.mappings.MediatorViewMapping', {

    _injector: null,
    _view: null,

    Constructor: function (view, injector) {
      this._view = view;

      if(injector) {
        this._injector = injector;
      } else {
        throw new Error('Injector argument is required but missing.');
      }
    },

    getView: function () {
      return this._view;
    },

    toMediator: function (Mediator) {

      var injector = this._injector;

      this._view.rendered = function() {
        this.mediator = injector.get(Mediator);
      };

      this._view.destroyed = function() {

        if(this.mediator) {
          this.mediator.destroy();
          this.mediator = null;
        }
      };
    }

  });

}());