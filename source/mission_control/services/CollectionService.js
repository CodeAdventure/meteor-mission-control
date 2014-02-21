
Class('MissionControl.CollectionService', {

  _collections: null,

  Constructor: function() {
    this._collections = {};
  },

  get: function (name) {
    return this._collections[name]
  },

  add: function (name) {
    return this._collections[name] = new Meteor.Collection(name);
  }

});