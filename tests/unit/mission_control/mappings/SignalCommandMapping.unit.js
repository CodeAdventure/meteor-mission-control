(function () {
  "use strict";

  var SignalCommandMapping = MissionControl.mappings.SignalCommandMapping;

  describe('MissionControl.mappings.SignalCommandMapping:', function () {

    describe("#toCommand", function () {

      it("wires up the command to be executed when the signal is dispatched", function () {

        // SETUP
        var SignalClass = "Signal",
            signalInstance = { add: Function },
            signalMock = sinon.mock(signalInstance),
            injectorInstance = {
              get: Function,
              hasMappingFor: Function
            },
            injectorMock = sinon.mock(injectorInstance);

        var mapping = new SignalCommandMapping(SignalClass, injectorInstance);

        // EXPECTATIONS
        injectorMock.expects('get').once().withExactArgs(SignalClass).returns(signalInstance);
        signalMock.expects('add').once().withExactArgs(mapping.executeCommand, mapping);

        // ACTION
        mapping.toCommand("Command");

        // VERIFY
        injectorMock.verify();
        signalMock.verify();

      });

    });

    describe("#executeCommand", function () {

      it("executes the configured command with given data", function () {

        // SETUP
        var injectorInstance = { get: Function },
            injectorMock = sinon.mock(injectorInstance),
            CommandClass = "Command",
            commandInstance = { execute: Function },
            commandMock = sinon.mock(commandInstance),
            signalData = {};

        var mapping = new SignalCommandMapping("Signal", injectorInstance);

        // EXPECTATIONS
        injectorMock.expects('get').once().withExactArgs(CommandClass).returns(commandInstance);
        commandMock.expects('execute').once();

        // ACTION
        mapping.setCommand(CommandClass);
        mapping.executeCommand(signalData);

        // VERIFY
        injectorMock.verify();
        commandMock.verify();

        expect(commandInstance.data).to.equal(signalData);

      });

    });

    describe("#getInjector", function () {

      it("returns the configured injector for the mapping", function () {

        // SETUP
        var injector = {},
            mapping = new SignalCommandMapping("Signal", injector);

        // ACTION
        var result = mapping.getInjector();

        // VERIFY
        expect(result).to.equal(injector);

      });

    });

  });

}());


