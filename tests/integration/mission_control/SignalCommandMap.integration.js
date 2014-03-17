(function () {
  "use strict";

  var SignalCommandMap = MissionControl.SignalCommandMap;
  var Injector = Dependance.Injector;

  describe('MissionControl.SignalCommandMap (Integration)', function () {

    describe("Use Case: mapping a signal to a command", function () {

      it("executes the command with correct data when the signal is dispatched", function () {

        // SETUP
        var injector = new Injector(),
            signalCommandMap = new SignalCommandMap(injector),
            SignalClass = "Signal",
            signalInstance = new signals.Signal(),
            CommandClass = "Command",
            commandInstance = {
              execute: Function
            },
            signalData = {};

        var commandMock = sinon.mock(commandInstance);

        injector.map(SignalClass).toValue(signalInstance);
        injector.map(CommandClass).toValue(commandInstance);

        signalCommandMap.map(SignalClass).toCommand(CommandClass);

        // EXPECTATIONS
        commandMock.expects('execute').once();

        // ACTION
        signalInstance.dispatch(signalData);

        // VERIFY
        commandMock.verify();
        expect(commandInstance.data).to.equal(signalData);

      });

    });

  });

}());