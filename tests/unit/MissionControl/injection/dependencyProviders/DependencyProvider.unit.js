
(function(){
  "use strict";

  var DependencyProvider = MissionControl.injection.dependencyProviders.DependencyProvider;

  describe('MissionControl.injection.dependencyProviders.DependencyProvider:', function () {

    beforeEach(function () {
      this.TestClass = Class('TestClass', {}, true);
      this.dependencyProvider = new DependencyProvider(this.TestClass);
    });

    describe('#getType', function () {

      it('returns the correct type when asked', function () {
        expect(this.dependencyProvider.getType()).to.equal(this.TestClass);
      });

    });

  });

}());


