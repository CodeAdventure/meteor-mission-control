
Class('MissionControl.SubscriptionService', {

  get: function () {
    return Meteor.subscribe.apply(null, arguments);
  }

});