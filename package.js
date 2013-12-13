Package.describe({
  summary: 'Keep your business logic testable while your app runs on meteor.'
});

Package.on_use(function(api) {

  api.add_files(
    [
      'src/Class.js',
      'src/Interface.js',
      'src/MissionControl/injection/dependencyProviders/DependencyProvider.js',
      'src/MissionControl/injection/dependencyProviders/ClassProvider.js',
      'src/MissionControl/injection/SingletonProvider.js',
      'src/MissionControl/injection/InjectionMapping.js',
      'src/MissionControl/injection/MappingFactory.js',
      'src/MissionControl/injection/Injector.js',
      'src/MissionControl/mediators/MediatorViewMapping.js',
      'src/MissionControl/mediators/MediatorViewMap.js'
    ],
    'client'
  );

});