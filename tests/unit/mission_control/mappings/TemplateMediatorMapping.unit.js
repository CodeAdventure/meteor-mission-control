(function () {
  "use strict";

  var TemplateMediatorMapping = MissionControl.mappings.TemplateMediatorMapping;

  describe('MissionControl.mappings.TemplateMediatorMapping:', function () {

    beforeEach(function () {

      this.template = {};

      this.Mediator = Class('Mediator', {
        setup: sinon.spy(),
        templateDidRender: sinon.spy(),
        destroy: sinon.spy()
      }, true);

      this.injectorInstance = {
        get: Function,
        hasMappingFor: Function
      };

      this.injectorMock = sinon.mock(this.injectorInstance);

      this.templateMediatorMapping = new TemplateMediatorMapping(this.template, this.injectorInstance);
    });

    describe('#initialize', function() {

      it('throws an error if no injector is passed', function() {

        function createMappingWithoutInjector() {
          var mapping = new TemplateMediatorMapping({});
        }

        expect(createMappingWithoutInjector).to.throw(Error);

      });

    });

    describe('#toMediator', function () {

      beforeEach(function() {

        this.mediatorInstance = new this.Mediator();

        this.injectorMock.expects('get').atLeast(1)
                         .withExactArgs(this.Mediator)
                         .returns(this.mediatorInstance);

        this.templateMediatorMapping.toMediator(this.Mediator);
      });

      it('asks the injector for an instance of the given mediator class', function() {

        this.template.created.call(this.template);

        this.injectorMock.verify();

      });

      it('wires mediator to created template', function () {

        this.template.created.call(this.template);

        expect(this.template.mediator).to.be.instanceof(this.Mediator);
      });

      it('provides the mediator with the template instance', function() {

        this.template.created.call(this.template);

        expect(this.Mediator.prototype.setup).to.have.been.calledWithExactly(this.template);

      });

      it('tells the mediator to setup itself', function() {

        this.template.created.call(this.template);

        expect(this.Mediator.prototype.setup).to.have.been.calledOnce;
      });

      it('wires mediator so that it gets destroyed with the view', function () {

        this.template.created.call(this.template);
        this.template.destroyed.call(this.template);

        expect(this.Mediator.prototype.destroy).to.have.been.calledOnce;
        expect(this.template.mediator).to.equal(undefined);
      });

      it('ensures that for each created view a mediator is created', function () {

        this.injectorMock.expects('get').twice()
                         .withExactArgs(this.Mediator)
                         .returns(new this.Mediator());

        this.template.created.call(this.template);
        var firstMediator = this.template.mediator;

        this.template.destroyed.call(this.template);

        this.template.created.call(this.template);
        var secondMediator = this.template.mediator;

        expect(firstMediator).not.to.equal(secondMediator);
      });

      it('checks if the mediator is still around before destroying it', function () {

        var template = this.template;

        function callDestroyTwice() {
          template.destroyed.call(template);
        }

        expect(callDestroyTwice).not.to.throw(Error);
      });

    });

  });

}());


