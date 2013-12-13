(function () {
  "use strict";

  Class('MissionControl.Signal', { Extends: signals.Signal,

    getNumberOfListeners: function() {
      return this.getNumListeners();
    }

  });

}());