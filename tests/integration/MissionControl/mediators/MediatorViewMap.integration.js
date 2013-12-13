(function(){
  "use strict";

  var MediatorViewMap = MissionControl.mediators.MediatorViewMap;
  var MediatorViewMapping = MissionControl.mediators.MediatorViewMapping;

  describe('MissionControl.Injector (Integration):', function () {

    beforeEach(function () {
      this.injectorFake = {};
      this.mediatorViewMap = new MediatorViewMap(this.injectorFake);
    });

    describe('#initialize', function() {

      it('needs an injector instance for setting up mappings', function() {

        function createMapWithInjectorInstance() {
          var map = new MediatorViewMap({});
        }

        function createMapWithoutInjector() {
          var map = new MediatorViewMap();
        }

        expect(createMapWithInjectorInstance).not.to.throw(Error);
        expect(createMapWithoutInjector).to.throw(Error);

      });

    });

    describe('#map', function () {

      it('configures and returns a mediator-view mapping', function () {

        var view = {};

        var mapping = this.mediatorViewMap.map(view);

        expect(mapping).to.be.an.instanceof(MediatorViewMapping);
        expect(mapping.getView()).to.equal(view);

      });

    });

  });

}());