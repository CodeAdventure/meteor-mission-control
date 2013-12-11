Package.describe({
  summary: 'Keep your business logic testable while your app runs on meteor.'
});

Package.on_use(function(api) {

  api.add_files(
    [
      'src/MissionControl/Class',
      'src/MissionControl/Interface',
      'src/MissionControl/MissionControl',
      'src/MissionControl/injection/SingletonProvider',
      'src/MissionControl/injection/InjectionMapping',
      'src/MissionControl/injection/MappingFactory',
      'src/MissionControl/injection/Injector',
      'src/MissionControl/mediators/MediatorViewMapping',
      'src/MissionControl/mediators/MediatorViewMap'
    ],
    'client'
  );

  api.export('MissionControl', ['client']);

});

