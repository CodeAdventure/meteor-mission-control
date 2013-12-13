(function () {
  "use strict";

  Class('MissionControl.injection.dependencyProviders.InstanceProvider', {

    Extends: MissionControl.injection.dependencyProviders.DependencyProvider,

    provideInstance: function() {
      return this.getType();
    }

  });

}());