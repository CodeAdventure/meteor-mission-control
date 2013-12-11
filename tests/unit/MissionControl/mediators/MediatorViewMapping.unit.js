"use strict";

var MediatorViewMapping = MissionControl.mediators.MediatorViewMapping;

describe('MissionControl.mediators.MediatorViewMapping:', function(){

  beforeEach(function() {
    this.view = {};
    this.mediatorViewMapping = new MediatorViewMapping(this.view);
  });

  describe('#getView', function() {

    it('returns the configured view', function() {
      expect(this.mediatorViewMapping.getView()).to.equal(this.view);
    });

  });

});