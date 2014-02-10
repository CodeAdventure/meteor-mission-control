Package.describe({
  summary: 'Communication system for your application to keep it testable from earth.'
});

Package.on_use(function(api) {

  api.use('mozart', ['client', 'server']);

  api.add_files(
    [
      'source/mission_control/mappings/MediatorViewMapping.js',
      'source/mission_control/MediatorViewMap.js',
      'source/mission_control/mappings/SignalCommandMapping.js',
      'source/mission_control/SignalCommandMap.js',
      'source/mission_control/Signal.js',
      'source/mission_control/Mediator.js'
    ],
    ['client', 'server']
  );

});