
Class('MissionControl.CollectionService', {

  _collections: null,

  Constructor: function() {
    this._collections = {};
  },

  get: function (name) {
    return this._collections[name]
  },

  add: function (name, optionalCollectionInstance) {

    if(optionalCollectionInstance) {
      
      this._collections[name] = optionalCollectionInstance;

      return optionalCollectionInstance;
    } 
    else {
      return this._collections[name] = new Meteor.Collection(name);
    }

    
  }

});