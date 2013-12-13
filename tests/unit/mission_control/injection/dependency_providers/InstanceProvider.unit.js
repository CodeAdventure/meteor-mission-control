
(function(){
  "use strict";

  var DependencyProvider = MissionControl.injection.dependencyProviders.DependencyProvider;
  var InstanceProvider = MissionControl.injection.dependencyProviders.InstanceProvider;

  describe('MissionControl.injection.dependencyProviders.InstanceProvider:', function () {

    it('extends DependencyProvider', function() {
      expect(InstanceProvider.Super).not.to.equal(undefined);
      expect(InstanceProvider.Super).to.equal(DependencyProvider);
    });

    describe('#provideInstance', function () {

      it('returns the configured instance for each request', function() {

        // SETUP
        var testInstance = {};
        var instanceProvider = new InstanceProvider(testInstance);

        // ACTION
        var firstInstance = instanceProvider.provideInstance();
        var secondInstance = instanceProvider.provideInstance();

        // VERIFICATION
        expect(firstInstance).to.equal(testInstance);
        expect(secondInstance).to.equal(testInstance);

      });

    });

  });

}());


