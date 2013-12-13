
(function(){
  "use strict";

  var DependencyProvider = MissionControl.injection.dependencyProviders.DependencyProvider;
  var ClassProvider = MissionControl.injection.dependencyProviders.ClassProvider;

  describe('MissionControl.injection.dependencyProviders.ClassProvider:', function () {

    it('extends DependencyProvider', function() {
      expect(ClassProvider.Super).not.to.equal(undefined);
      expect(ClassProvider.Super).to.equal(DependencyProvider);
    });

    beforeEach(function () {

      this.injectorInstance = { instantiateUnmapped: Function };
      this.injectorMock = sinon.mock(this.injectorInstance);

      this.TestClass = Class('TestClass', {}, true);
      this.testInstance = {};

      this.classProvider = new ClassProvider(this.TestClass);
    });

    describe('#provideInstance', function () {

      it('uses the given injector to instantiate the class instance', function() {

        // EXPECTATIONS
        this.injectorMock.expects('instantiateUnmapped').once()
                         .withExactArgs(this.TestClass)
                         .returns(this.testInstance);

        // ACTION
        var createdInstance = this.classProvider.provideInstance(this.injectorInstance);

        // VERIFICATION
        this.injectorMock.verify();
        expect(createdInstance).to.equal(this.testInstance);

      });

    });

  });

}());


