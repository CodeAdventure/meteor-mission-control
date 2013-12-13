(function () {
  "use strict";

  Class('MissionControl.injection.dependencyProviders.SingletonProvider', {

    Extends: MissionControl.injection.dependencyProviders.DependencyProvider,

    _instance: null,

    provideInstance: function (injector) {

      if(this._instance === null) {
        this._instance = injector.instantiateUnmapped(this.getType());
      }

      return this._instance;
    }

  });

}());