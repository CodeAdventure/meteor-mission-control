(function () {
  "use strict";

  var Injector = MissionControl.injection.Injector;

  describe('MissionControl.Injector', function () {

    beforeEach(function () {

      this.mapping = {};

      this.mappingFactoryInstance = {
        add: function () {},
        create: function () {},
        get: function () {}
      };

      this.mappingFactoryMock = sinon.mock(this.mappingFactoryInstance);

    });

    describe('#constructor', function () {

      it('hands the mappings configuration over to the mapping factory', function () {

        this.mappingFactoryMock.expects('add').once().withExactArgs(this.mapping);

        new Injector({
          mappings: this.mapping,
          mappingFactory: this.mappingFactoryInstance
        });

        this.mappingFactoryMock.verify();

      });

    });

    describe('#getMappingFor:', function () {

      beforeEach(function () {

        this.injector = new Injector({
          mappingFactory: this.mappingFactoryInstance
        });

        this.searchedType = 'TestType';

      });

      it('asks the mapping factory for the searched type and returns it', function () {

        // expectations
        this.mappingFactoryMock.expects('get').once()
          .withExactArgs(this.searchedType)
          .returns(this.mapping);

        // exercise SUT
        var result = this.injector.getMappingFor(this.searchedType);

        // verify
        this.mappingFactoryMock.verify();
        expect(result).to.equal(this.mapping);

      });

      it('throws an exception if no mapping is found for the searched type', function () {

        // expectations
        this.mappingFactoryMock.expects('get').once().returns(null);

        // exercise SUT
        var injector = this.injector;

        function getMappingForUnknownType() {
          injector.getMappingFor();
        }

        // verify
        expect(getMappingForUnknownType).to.throw(Error);
        this.mappingFactoryMock.verify();

      });

    });

    describe('#map:', function () {

      beforeEach(function () {

        this.mappingFactoryInstance = {
          create: function () {}
        };

        this.mappingFactoryMock = sinon.mock(this.mappingFactoryInstance);

        this.defaultInjector = new Injector({
          mappingFactory: this.mappingFactoryInstance
        });

      });

      it('tells the mapping factory to create a mapping for given type and returns it', function () {

        var type = 'TestType';

        this.mappingFactoryMock.expects('create').once()
          .withExactArgs(type)
          .returns(this.mappingFactoryInstance);

        var result = this.defaultInjector.map(type);

        this.mappingFactoryMock.verify();

        expect(result).to.equal(this.mappingFactoryInstance);

      });

    });

    describe("#instantiateUnmapped", function () {

      it("creates an instance of given class and returns it", function () {

        // SETUP
        var injector = new Injector(),
            TestClass = Class('TestClass', {}, true);

        // ACTION
        var instance = injector.instantiateUnmapped(TestClass);

        // VERIFY
        expect(instance).to.be.an.instanceof(TestClass);

      });

    });

  });

}());