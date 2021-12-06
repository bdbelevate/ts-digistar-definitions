Ds.AddObjectActionEvent('parent', 'AddChild');

Ds.AddObjectActionEvent('parent', 'RemoveChild');

Ds.SetMessageEvent();

print('start...');

for (let bExit = false; !bExit; ) {
  const evt = Ds.WaitForEvent();

  for (let i = 0; i < evt.length; i++) {
    print('Event ' + Ds.GetEventObjectType(evt[i]));

    switch (Ds.GetEventObjectType(evt[i])) {
      case 'string':
        bExit = true;

        break;

      case 'DsObjectRef':
        print(
          Ds.GetObjectRefActionObjectID(evt[i]) +
            ' ' +
            Ds.GetObjectRefAction(evt[i]) +
            ' ' +
            Ds.GetObjectRefChildID(evt[i])
        );

        break;

      default:
        break;
    }
  }
}

print('exit...');
