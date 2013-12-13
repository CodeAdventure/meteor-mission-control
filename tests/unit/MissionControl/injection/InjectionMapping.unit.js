(function(){
  "use strict";

  describe('MissionControl.injection.InjectionMapping:', function () {

    var InjectionMapping = MissionControl.injection.InjectionMapping;
    var ClassProvider = MissionControl.injection.dependencyProviders.ClassProvider;
    var SingletonProvider = MissionControl.injection.SingletonProvider;

    describe('#initialize', function() {

      it('uses class provider as default dependency provider', function() {

        // ACTION
        var injectionMapping = new InjectionMapping('Test');

        // VERIFY
        expect(injectionMapping.getProvider()).to.be.an.instanceof(ClassProvider);

      });

      it('uses dependency provider given as parameter otherwise', function() {

        // SETUP
        var requestType = 'Bla';
        var dependencyProviderFake = {};

        // ACTION
        var injectionMapping = new InjectionMapping(requestType, dependencyProviderFake);

        // VERIFY
        expect(injectionMapping.getProvider()).to.equal(dependencyProviderFake);

      });

    });

    describe('#getInstance', function() {

      // SETUP
      beforeEach(function() {

        this.dependencyProviderInstance = {
          provideInstance: Function
        };

        this.dependencyProviderMock = sinon.mock(this.dependencyProviderInstance);
        this.injectorFake = {};
        this.classInstanceFake = {};

      });

      it('asks its configured dependency provider for an instance and returns it', function() {

        // SETUP
        var requestType = 'Bla';
        var injectionMapping = new InjectionMapping(requestType, this.dependencyProviderInstance);

        // EXPECTATIONS
        this.dependencyProviderMock.expects('provideInstance').once()
                                   .withExactArgs(this.injectorFake)
                                   .returns(this.classInstanceFake);

        // ACTION
        var returnedInstance = injectionMapping.getInstance(this.injectorFake);

        // VERIFY
        this.dependencyProviderMock.verify();
        expect(returnedInstance).to.equal(this.classInstanceFake);

      });

    });

    describe('using singleton providers', function() {

      beforeEach(function () {

        this.TestInterface = Interface('TestInterface', {}, true);
        this.TestClass = Class('TestClass', {}, true);

        this.injectionMapping = new InjectionMapping(this.TestInterface);
      });

      describe('#toSingleton', function () {

        it('configures response type correctly', function () {

          // ACTION
          this.injectionMapping.toSingleton(this.TestClass);

          // VERIFY
          expect(this.injectionMapping.getResponseType()).to.equal(this.TestClass);

        });

        it('configures and uses a singleton provider', function() {

          // ACTION
          this.injectionMapping.toSingleton(this.TestClass);

          // VERIFY
          var configuredDependencyProvider = this.injectionMapping.getProvider();

          expect(configuredDependencyProvider).to.be.instanceof(SingletonProvider);
          expect(configuredDependencyProvider.getType()).to.equal(this.TestClass);
        });

      });

      describe('#asSingleton', function () {

        it('sets up singleton provider using the request type', function () {

          // SETUP
          var injectionMapping = new InjectionMapping(this.TestClass);
          var toSingletonSpy = sinon.spy(injectionMapping, 'toSingleton');

          // ACTION
          injectionMapping.asSingleton();

          // VERIFY
          expect(toSingletonSpy).to.have.been.calledWithExactly(this.TestClass);

        });

      });

    });

  });

}());