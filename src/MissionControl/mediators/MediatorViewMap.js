(function () {
  "use strict";

  Class('MissionControl.mediators.MediatorViewMap', {

    map: function (view) {
      return new MissionControl.mediators.MediatorViewMapping(view);
    }

  });

}());