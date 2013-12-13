
(function(){
  "use strict";

  var DependencyProvider = MissionControl.injection.dependencyProviders.DependencyProvider;
  var SingletonProvider = MissionControl.injection.SingletonProvider;

  describe('MissionControl.injection.SingletonProvider:', function () {

    it('extends DependencyProvider', function() {
      expect(SingletonProvider.Super).not.to.equal(undefined);
      expect(SingletonProvider.Super).to.equal(DependencyProvider);
    });

    beforeEach(function () {

      this.injectorInstance = { instantiateUnmapped: Function };
      this.injectorMock = sinon.mock(this.injectorInstance);

      this.TestClass = Class('TestClass', {}, true);
      this.testInstance = {};

      this.singletonProvider = new SingletonProvider(this.TestClass);
    });

    describe('#provideInstance', function () {

      it('uses the given injector to instantiate the class instance', function() {

        // EXPECTATIONS
        this.injectorMock.expects('instantiateUnmapped').once()
                         .withExactArgs(this.TestClass)
                         .returns(this.testInstance);

        // ACTION
        var createdInstance = this.singletonProvider.provideInstance(this.injectorInstance);

        // VERIFICATION
        this.injectorMock.verify();
        expect(createdInstance).to.equal(this.testInstance);

      });

      it('caches the created instance and returns it for all further calls', function() {

        // EXPECTATIONS
        this.injectorMock.expects('instantiateUnmapped').once().returns(this.testInstance);

        // ACTION
        var firstInstance = this.singletonProvider.provideInstance(this.injectorInstance);
        var secondInstance = this.singletonProvider.provideInstance(this.injectorInstance);

        // VERIFICATION
        this.injectorMock.verify();
        expect(firstInstance).to.equal(secondInstance);

      });

    });

  });

}());


