global.sinon = require("sinon");
global.should = require("chai").should();
global.expect = require("chai").expect;
global.AssertionError = require("chai").AssertionError;

global.chai = require("chai");
var sinonChai = require("sinon-chai");
global.chai.use(sinonChai);

global.swallow = function (thrower) {
    try {
        thrower();
    } catch (e) { }
};

global.invalidateRequireCacheForMissionControlModule = function(filePath) {
  delete require.cache[require.resolve('../src/MissionControl/MissionControl')]; // invalidate require cache
};

global.getMissionControlModule = function() {
	global.invalidateRequireCacheForMissionControlModule();
	return require('../src/MissionControl/MissionControl');
};

global.Class = require('../src/Class').Class;
global.Interface = require('../src/Interface').Interface;

global.MissionControl = {

	injection: {
		SingletonProvider: require('../src/MissionControl/injection/SingletonProvider').SingletonProvider,
		InjectionMapping: require('../src/MissionControl/injection/InjectionMapping').InjectionMapping,
		Injector: require('../src/MissionControl/injection/Injector').Injector,
    MappingFactory: require('../src/MissionControl/injection/MappingFactory').MappingFactory
	}

};

var sinonChai = require("sinon-chai");
chai.use(sinonChai);