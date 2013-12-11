(function (globalNamespace) {
  "use strict";

  function defineInjectorModule(Class, InjectionMapping) {

    return Class('MissionControl.injection.Injector', {

      _mappingFactory: null,

      initialize: function(configuration) {

        if(configuration) {

          if(configuration.mappingFactory) {
            this._mappingFactory = configuration.mappingFactory;
          }

          if(configuration.mappings && this._mappingFactory) {
            this._mappingFactory.add(configuration.mappings);
          }

        }

      },

      map: function(type) {
        return this._mappingFactory.create(type);
      },
      
      injectInto: function(injectee) {
        this._injectInto(injectee, null);
      },

      getInstanceFor: function(type) {
        return this._getInstanceFor(type, null);
      },

      getMappingFor: function(type) {

        var mapping = this._mappingFactory.get(type);

        if(mapping === null) {
          throw new Error('No mapping for type ' + type + ' was found.');
        }

        return mapping;
      },

      _getInstanceFor: function(neededType, requestingType, skipInjection) {

        var mapping, isCircularDependency, instance = null;

        mapping = this.getMappingFor(neededType);

        instance = mapping.getInstance();
        isCircularDependency = this._typeIsDependentOn(neededType, requestingType) ? true : false;

        if(!skipInjection) {
          this._injectInto(instance, neededType, requestingType, isCircularDependency);
        }
        
        return instance;
         
      },

      _injectInto: function(injectee, injecteeType, requestingType, isCircularDependency) {

        if(injectee && injectee.Dependencies) {
          var propertyName, neededType, instance, dependencies = injectee.Dependencies;

          for(propertyName in dependencies) {

            if(dependencies.hasOwnProperty(propertyName)) {
              neededType = dependencies[propertyName];

              if(isCircularDependency && neededType === requestingType) {
                
                // this is a circular dependency situation -> get the instance without injecting
                // into the first instance again to avoid endless loops.
                
                instance = this._getInstanceFor(neededType, injecteeType, true);
              } 
              else {
                instance = this._getInstanceFor(neededType, injecteeType);
              }

              if(instance != null) {
                injectee[propertyName] = instance;
              } 
              else {
                throw new Error('Type ' + neededType + ' is required by ' + injectee + ' but was not mapped on the injector.');
              }
            }
          }

        }
      },

      _typeIsDependentOn: function(dependentType, searchedDependency) {
        var propertyName, dependencies = dependentType.prototype.Dependencies;

        if(typeof dependencies !== 'object' || searchedDependency === null) {
          return false;
        }

        for(propertyName in dependencies) {
          
          if(dependencies.hasOwnProperty(propertyName)) {

            if(dependencies[propertyName] === searchedDependency) {
              return true;
            }
          }
        }

        // searchedDependency was not found on dependentType
        return false;
      }

    });

  }

  var Class, InjectionMapping;

  // Return as AMD module or attach to head object
  if (typeof define !== "undefined") {
    define('MissionControl/injection/Injector', ['Class', 'InjectionMapping'], function (Class, InjectionMapping) {
      return defineInjectorModule(Class, InjectionMapping);
    });
  } 
  // expose on agnostic namespace (browser)
  else if (typeof window !== "undefined") {
    /** @expose */
    Class = globalNamespace['Class'],
    InjectionMapping = globalNamespace.MissionControl.injection.InjectionMapping;

    globalNamespace.MissionControl.injection.Injector = defineInjectorModule(Class, InjectionMapping);
  }
  // expose on agnostic namespace (node)
  else {
    Class = require('../../../src/Class')['Class'];
    InjectionMapping = require('../../../src/MissionControl/injection/InjectionMapping').InjectionMapping;

    globalNamespace.Injector = defineInjectorModule(Class, InjectionMapping);
  }
  
}(typeof define !== "undefined" || typeof window === "undefined" ? exports : window));