(function () {
  "use strict";

  var Mediator = MissionControl.Mediator;

  describe('MissionControl.Mediator', function () {

    describe("#configure", function () {

      it("is defined as no-op hook method", function () {

        // SETUP
        var mediator = new Mediator();

        // ACTION
        function configureShouldBeDefined() {
          mediator.configure();
        }

        // VERIFY
        expect(configureShouldBeDefined).not.to.throw();

      });

    });

    describe("#destroy", function () {

      it('is defined on the base class', function() {

        // SETUP
        var mediator = new Mediator();

        // ACTION
        function destroyShouldBeDefined() {
          mediator.destroy();
        }

        // VERIFY
        expect(destroyShouldBeDefined).not.to.throw();

      });

      it("automatically sets all defined dependencies to null", function () {

        // SETUP
        var CustomMediator = Class('CustomMediator', {

          Extends: Mediator,

          Dependencies: {
            first: 'FirstDependency',
            second: {}
          }

        }, true);

        var mediator = new CustomMediator();
        mediator.first = CustomMediator.prototype.Dependencies.first;
        mediator.seocnd = CustomMediator.prototype.Dependencies.second;

        // ACTION
        mediator.destroy();

        // VERIFY
        expect(mediator.first).to.equal(null);
        expect(mediator.second).to.equal(null);

      });

      it('resets the view reference to null', function() {

        // SETUP
        var mediator = new Mediator();
        mediator.view = {};

        // ACTION
        mediator.destroy();

        // VERIFY
        expect(mediator.view).to.equal(null);

      });

    });

  });

}());