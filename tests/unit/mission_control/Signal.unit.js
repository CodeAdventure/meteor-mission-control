(function () {
  "use strict";

  var Signal = MissionControl.Signal;

  describe('MissionControl.Signal', function () {

    describe("#getNumberOfListeners", function () {

      it("adds a listener to the internal collection", function () {

        // SETUP
        var signal = new Signal(),
            listener = function listener(){};

        // ACTION
        signal.add(listener);

        // VERIFY
        expect(signal.getNumberOfListeners()).to.equal(1);

      });

    });

  });

}());