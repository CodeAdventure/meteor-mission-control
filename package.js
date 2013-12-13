Package.describe({
  summary: 'Keep your business logic testable while your app runs on meteor.'
});

Package.on_use(function(api) {

  api.add_files(
    [
      'src/Class.js',
      'src/Interface.js',
      'src/mission_control/injection/dependency_providers/DependencyProvider.js',
      'src/mission_control/injection/dependency_providers/ClassProvider.js',
      'src/mission_control/injection/dependency_providers/SingletonProvider.js',
      'src/mission_control/injection/InjectionMapping.js',
      'src/mission_control/injection/MappingFactory.js',
      'src/mission_control/Injector.js',
      'src/mission_control/mappings/MediatorViewMapping.js',
      'src/mission_control/MediatorViewMap.js'
    ],
    'client'
  );

});