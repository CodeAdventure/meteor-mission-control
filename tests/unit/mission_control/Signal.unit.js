(function () {
  "use strict";

  var Signal = MissionControl.Signal;

  describe('MissionControl.Signal', function () {

    it("extends the signal js-signals class", function() {

      var signal = new Signal();

      expect(signal).to.be.an.instanceof(signals.Signal);

    });

    describe("#getNumberOfListeners", function () {

      it("returns the number of registered listeners", function () {

        // SETUP
        var signal = new Signal(),
            listener = function listener(){};

        // ACTION
        signal.add(listener);

        // VERIFY
        expect(signal.getNumberOfListeners()).to.equal(1);

      });

    });

    describe("#dispatch", function () {

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