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

    describe("#configure", function () {

      it("gets called after the template reference was setup", function () {

        // SETUP
        var mediator = new Mediator(),
            templateStub = {};

        mediator.configure = sinon.spy();

        // ACTION
        mediator.setup(templateStub);

        // VERIFY
        expect(mediator.configure).to.have.been.calledOnce;

      });

    });

    describe("#setupTemplateProperties", function () {

      it("takes an array of properties that are registered as template helpers", function () {

        // SETUP
        var mediator = new Mediator(),
            meteorTemplateStub = { __component__: {} },
            firstValue = {},
            secondValue = {};

        mediator.setup(meteorTemplateStub);
        mediator.firstProperty = { get: sinon.stub() };
        mediator.secondProperty = { get: sinon.stub() };

        mediator.firstProperty.get.returns(firstValue);
        mediator.secondProperty.get.returns(secondValue);

        // ACTION
        mediator.setupTemplateProperties(['firstProperty', 'secondProperty']);

        // call the template helpers that should have been setup
        var firstReturnValue = meteorTemplateStub.__component__.firstProperty();
        var secondReturnValue = meteorTemplateStub.__component__.secondProperty();

        // VERIFY
        expect(mediator.firstProperty.get).to.have.been.calledOnce;
        expect(firstReturnValue).to.equal(firstValue);

        expect(mediator.secondProperty.get).to.have.been.calledOnce;
        expect(secondReturnValue).to.equal(secondValue);

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

    describe("#onSuccess and #onError", function () {

      it("binds the given method to the instance", function () {

        // SETUP
        var mediator = new Mediator(),
            successMethod = sinon.spy(),
            errorMethod = sinon.spy();

        // ACTION
        var boundSuccessMethod = mediator.onSuccess(successMethod);
        var boundErrorMethod = mediator.onError(errorMethod);

        // simulate a call to the bound methods
        boundSuccessMethod();
        boundErrorMethod();

        // VERIFY
        expect(successMethod).to.have.been.calledOn(mediator);
        expect(errorMethod).to.have.been.calledOn(mediator);

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
        expect(mediator.first).to.be.undefined;
        expect(mediator.second).to.be.undefined;

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