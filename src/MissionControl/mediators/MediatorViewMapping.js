(function () {
  "use strict";

  Class('MissionControl.mediators.MediatorViewMapping', {

    injector: null,
    _view: null,

    initialize: function (view) {
      this._view = view;
    },

    getView: function () {
      return this._view;
    },

    toMediator: function (Mediator) {

      var injector = this.injector;

      this._view.rendered = function() {
        this.mediator = injector.getInstanceFor(Mediator);
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