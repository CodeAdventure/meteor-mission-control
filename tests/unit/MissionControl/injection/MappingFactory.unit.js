(function(){
  "use strict";

  describe('MissionControl.injection.MappingFactory:', function () {

    var MappingFactory = MissionControl.injection.MappingFactory;
    var InjectionMapping = MissionControl.injection.InjectionMapping;

    beforeEach(function () {

      this.mappingFactory = new MappingFactory();
      this.TestInterface = Interface('TestInterface', {}, true);
      this.TestClass = Class('TestClass', {}, true);

    });

    describe('#create', function () {

      it('creates and returns a new injection mapping for given type', function () {

        var mapping = this.mappingFactory.create(this.TestInterface);

        expect(mapping).to.be.an.instanceof(InjectionMapping);
        expect(mapping.getRequestType()).to.equal(this.TestInterface);
      });

      it('saves the created mapping for later access', function () {

        var createdMapping = this.mappingFactory.create(this.TestInterface);
        var savedMapping = this.mappingFactory.get(this.TestInterface);

        expect(createdMapping).to.equal(savedMapping);

      });

      it('throws an error if a mapping for this type already exists', function () {

        var mappingFactory = this.mappingFactory;

        function createTwoMappingsForSameType() {
          mappingFactory.create('same');
          mappingFactory.create('same');
        }

        expect(createTwoMappingsForSameType).to.throw(Error);

      });

    });

    describe('#add', function () {

      it('adds the given mapping to the register', function () {

        var mapping = new InjectionMapping(this.TestInterface);

        this.mappingFactory.add(mapping);

        var addedMapping = this.mappingFactory.get(this.TestInterface);

        expect(addedMapping).to.equal(mapping);
      });

      it('throws an error if a mapping for this type already exists', function () {

        var mapping = new InjectionMapping(this.TestInterface);
        var mappingFactory = this.mappingFactory;

        function addTwoMappingsForSameType() {
          mappingFactory.add(mapping);
          mappingFactory.add(mapping);
        }

        expect(addTwoMappingsForSameType).to.throw(Error);
      });

    });

  });

}());