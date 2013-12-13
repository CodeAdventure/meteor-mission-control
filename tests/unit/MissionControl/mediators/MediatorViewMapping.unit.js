(function () {
  "use strict";

  var MediatorViewMapping = MissionControl.mediators.MediatorViewMapping;

  describe('MissionControl.mediators.MediatorViewMapping:', function () {

    beforeEach(function () {
      this.view = {};

      this.injectorInstance = {
        getInstanceFor: Function
      };

      this.injectorMock = sinon.mock(this.injectorInstance);

      this.Mediator = Class('Mediator', { destroy: sinon.spy() }, true);
      this.mediatorViewMapping = new MediatorViewMapping(this.view, this.injectorInstance);
    });

    describe('#initialize', function() {

      it('throws an error if no injector is passed', function() {

        function createMappingWithoutInjector() {
          var mapping = new MediatorViewMapping({});
        }

        expect(createMappingWithoutInjector).to.throw(Error);

      });

    });

    describe('#getView', function () {

      it('returns the configured view', function () {
        expect(this.mediatorViewMapping.getView()).to.equal(this.view);
      });

    });

    describe('#toMediator', function () {

      beforeEach(function() {

        this.injectorMock.expects('getInstanceFor').atLeast(1)
                         .withExactArgs(this.Mediator)
                         .returns(new this.Mediator());

        this.mediatorViewMapping.toMediator(this.Mediator);
      });

      it('asks the injector for an instance of the given mediator class', function() {
        this.view.rendered.call(this.view);

        this.injectorMock.verify();
      });

      it('wires mediator to created view', function () {

        this.view.rendered.call(this.view);

        expect(this.view.mediator).to.be.instanceof(this.Mediator);
      });

      it('wires mediator so that it gets destroyed with the view', function () {

        this.view.rendered.call(this.view);
        this.view.destroyed.call(this.view);

        expect(this.Mediator.prototype.destroy).to.have.been.calledOnce;
        expect(this.view.mediator).to.equal(null);
      });

      it('ensures that for each rendered view a mediator is created', function () {

        this.injectorMock.expects('getInstanceFor').twice()
                         .withExactArgs(this.Mediator)
                         .returns(new this.Mediator());

        this.view.rendered.call(this.view);
        var firstMediator = this.view.mediator;

        this.view.destroyed.call(this.view);

        this.view.rendered.call(this.view);
        var secondMediator = this.view.mediator;

        expect(firstMediator).not.to.equal(secondMediator);
      });

      it('checks if the mediator is still around before destroying it', function () {

        this.view.rendered.call(this.view);
        var firstMediator = this.view.mediator;

        var view = this.view;

        function callDestroyTwice() {
          view.destroyed.call(view);
          view.destroyed.call(view);
        }

        expect(callDestroyTwice).not.to.throw(Error);
      });

    });

  });

}());


