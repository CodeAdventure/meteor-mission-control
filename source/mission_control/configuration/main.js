
Injector = new Dependance.Injector();

Injector.map('TemplateViewMap').toInstance(new MissionControl.TemplateViewMap(Injector));
Injector.map('SignalCommandMap').toInstance(new MissionControl.SignalCommandMap(Injector));

Injector.map('Collections').toSingleton(MissionControl.CollectionService);
Injector.map('Subscriptions').toSingleton(MissionControl.SubscriptionService);

// map Meteor APIs for dependency injection
Injector.map('Deps').toInstance(Deps);

if(Meteor.isClient) {
  // sessions only exist on the client
  Injector.map('Session').toInstance(Session);
}