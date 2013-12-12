(function(){
  "use strict";

  var MediatorViewMap = MissionControl.mediators.MediatorViewMap;
  var MediatorViewMapping = MissionControl.mediators.MediatorViewMapping;

  describe('MissionControl.Injector (Integration):', function () {

    beforeEach(function () {
      this.mediatorViewMap = new MediatorViewMap();
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