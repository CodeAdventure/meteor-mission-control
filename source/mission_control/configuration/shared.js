
Injector = new Dependance.Injector();

Injector.map('SignalCommandMap').toStaticValue(new MissionControl.SignalCommandMap(Injector));

Injector.map('Collections').toSingleton(MissionControl.CollectionService);
Injector.map('Subscriptions').toSingleton(MissionControl.SubscriptionService);

// map Meteor APIs for dependency injection
Injector.map('Meteor').toStaticValue(Meteor);

// map Meteor APIs for dependency injection
Injector.map('Deps').toStaticValue(Deps);