Package.describe({
  summary: 'Communication system for your application to keep it testable from earth.'
});

Package.on_use(function(api) {

  // on client and server
  api.use(['deps', 'mozart'], ['client', 'server']);

  // client only
  api.use('session', ['client']);

  api.add_files(
    [
      'source/mission_control/mappings/TemplateMediatorMapping.js',
      'source/mission_control/TemplateMediatorMap.js',
      'source/mission_control/mappings/SignalCommandMapping.js',
      'source/mission_control/SignalCommandMap.js',
      'source/mission_control/Signal.js',
      'source/mission_control/Mediator.js',
      'source/mission_control/services/CollectionService.js',
      'source/mission_control/services/SubscriptionService.js',
      'source/mission_control/configuration/main.js'
    ],
    ['client', 'server']
  );

  api.export('Injector');

});