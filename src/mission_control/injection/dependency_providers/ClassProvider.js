(function () {
  "use strict";

  Class('MissionControl.injection.dependencyProviders.ClassProvider', {

    Extends: MissionControl.injection.dependencyProviders.DependencyProvider,

    provideInstance: function(injector) {
      return injector.instantiateUnmapped(this.getType());
    }

  });

}());