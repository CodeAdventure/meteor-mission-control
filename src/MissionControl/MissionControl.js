(function (globalNamespace) {
  "use strict";

  var MissionControl = {};

  // Return as AMD module or attach to head object
  if (typeof define !== "undefined") {
    define('MissionControl', [], function () { return MissionControl; });
  } 
  // expose on global namespace like window (browser) or exports (node)
  else if (globalNamespace) {
    /** @expose */
    globalNamespace['MissionControl'] = MissionControl;
  }
  
}(typeof define !== "undefined" || typeof window === "undefined" ? exports : window));