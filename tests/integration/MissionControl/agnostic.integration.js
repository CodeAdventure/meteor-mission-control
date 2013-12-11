"use strict";

describe('MissionControl', function(){

  describe('running in browser environment with AMD available', function() {

    beforeEach(function() {
      this.window = global.window = {}; // simulate browser
      this.defineSpy = global.define = sinon.spy(); // simulate AMD environment

      this.nodeModule = getMissionControlModule();
      
      delete global.define;
      delete global.window;
    });

    it('exposes itself as AMD module', function() {
      expect(this.defineSpy).to.have.been.called;
    });

    it('does not pollute global namespace', function() {
      expect(this.window.MissionControl).to.not.exist;
    });

    it('does not export itself as node module', function() {
      expect(this.nodeModule).to.be.empty; // exports are empty by default
    });

  });

  describe('running in browser environment without AMD available', function() {

    beforeEach(function() {
      global.window = {}; // simulate browser

      this.nodeModule = getMissionControlModule();

      this.window = global.window;
      delete global.window;
    });

    it('exposes itself as namespace on window', function() {
      expect(this.window.MissionControl).to.exist;
    });

    it('does not export itself as node module', function() {
      expect(this.nodeModule).to.be.empty; // exports are empty by default
    });

  });

  describe('running in node.js environment with AMD available', function() {

    beforeEach(function() {
      this.defineSpy = global.define = sinon.spy(); // simulate AMD environment

      this.nodeModule = getMissionControlModule();
      
      delete global.define;
    });

    it('exposes itself as AMD module', function() {
      expect(this.defineSpy).to.have.been.called;
    });

    it('does not export itself as node module', function() {
      expect(this.nodeModule).to.be.empty; // exports are empty by default
    });

  });

  describe('running in node.js environment without AMD available', function() {

    beforeEach(function() {
      this.nodeModule = getMissionControlModule();
    });

    it('exposes itself as node.js module', function() {
      expect(this.nodeModule).not.to.be.empty;
    });

  });

});
