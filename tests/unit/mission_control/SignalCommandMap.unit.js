(function () {
  "use strict";

  var SignalCommandMap = MissionControl.SignalCommandMap;
  var SignalCommandMapping = MissionControl.mappings.SignalCommandMapping;

  describe('MissionControl.SignalCommandMap', function () {

    describe("#map", function () {

      it("creates and returns a configured signal command mapping", function () {

        // SETUP
        var injector = function Injector() {},
            SignalClass = "Signal",
            signalCommandMap = new SignalCommandMap(injector);

        // ACTION
        var mapping = signalCommandMap.map(SignalClass);

        // VERIFY
        expect(mapping).to.be.an.instanceof(SignalCommandMapping);
        expect(mapping.getInjector()).to.equal(injector);

      });

    });

  });

}());