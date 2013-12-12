(function (globalNamespace) {
  "use strict";

    /**
     * @constructor
     */
    var ImplementationMissingError = function (message) {
      this.name = "ImplementationMissingError";
      this.message = (message || "");
    };
    
    ImplementationMissingError.prototype = Error.prototype;

    function createExceptionThrower(interfaceName, methodName, expectedType) {
      return function() {
        var message = 'Missing implementation for <' + this + '::' + methodName + '> defined by interface ' + interfaceName;

        throw new ImplementationMissingError(message);
      };
    }

    var Interface = function(path, definition, local) {

      if(typeof path !== 'string') {
        throw new Error('Please give your interface a name. Pass "true" as last parameter to avoid global namespace pollution');
      }

      var interfaceName = path.substr(path.lastIndexOf('.') + 1),
          methodName,
          property;

      /*jslint evil: true */
      var InterfaceConstructor = new Function('return function ' + interfaceName + '() {}')();

      for(methodName in definition) {

        if(definition.hasOwnProperty(methodName)) {
          
          property = definition[methodName];

          InterfaceConstructor.prototype[methodName] = createExceptionThrower(path, methodName, property);
        }
      }

      if(!local) {
        Class.namespace(path, InterfaceConstructor);
      }

      InterfaceConstructor.toString = function () { return interfaceName; };

      return InterfaceConstructor;
    };

  Interface.ImplementationMissingError = ImplementationMissingError;

  // Return as AMD module or attach to head object
  if (typeof define !== "undefined") {
    define('Interface', [], function () { return Interface; });
  }
  // expose on global namespace like window (browser) or exports (node)
  else if (globalNamespace) {
    /** @expose */
    globalNamespace.Interface = Interface;
  }

}(typeof define !== "undefined" || typeof window === "undefined" ? exports : window));