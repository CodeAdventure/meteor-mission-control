(function () {
  "use strict";

  var Mediator = MissionControl.Mediator;

  describe('MissionControl.Mediator', function () {

    describe("#setup", function () {

      it("saves reference to template", function () {

        // SETUP
        var mediator = new Mediator(),
            template = {};

        // ACTION
        mediator.setup(template);

        // VERIFY
        expect(mediator.template).to.equal(template);

      });

    });

    describe("#templateDidRender", function () {

      it("is defined as no-op", function () {

        // SETUP
        var mediator = new Mediator();

        // ACTION
        function callingTemplateDidRender() {
          mediator.templateDidRender();
        }

        // VERIFY
        expect(callingTemplateDidRender).not.to.throw();

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

      it('resets the template reference to null', function() {

        // SETUP
        var mediator = new Mediator();
        mediator.template = {};

        // ACTION
        mediator.destroy();

        // VERIFY
        expect(mediator.template).to.equal(null);

      });

    });

  });

}());