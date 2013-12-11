"use strict";

var SingletonProvider = MissionControl.injection.SingletonProvider;

describe('MissionControl.injection.SingletonProvider:', function(){

  beforeEach(function() {
    this.TestClass = Class('TestClass', {}, true);
    this.singletonProvider = new SingletonProvider(this.TestClass);
  });

  describe('#getType', function() {

    it('returns the correct type when asked', function() {
      expect(this.singletonProvider.getType()).to.equal(this.TestClass);
    });

  });

  describe('#provideInstance', function() {

    it('provides instance of the configured class type', function() {
      var instance = this.singletonProvider.provideInstance();

      expect(instance).to.be.instanceof(this.TestClass);
    });

    it('provides a single instance of the class type for each request', function() {
      var firstInstance = this.singletonProvider.provideInstance();
      var secondInstance = this.singletonProvider.provideInstance();

      expect(firstInstance).to.equal(secondInstance);
    });

  });

});