// Set object attr event to trigger when the scene date changes

Ds.AddObjectAttrEvent('scene', 'date');

// Set a command event to trigger when myObject is reset

Ds.AddObjectCommandEvent('myObject', 'reset');

// Set a timer event to trigger every 1.0 seconds on the system clock

Ds.SetTimerEvent(1.0, 'system');

// Set a message trigger

Ds.SetMessageEvent();

let exitScript = false;

for (; !exitScript; ) {
  const evtObject = Ds.WaitForEvent();

  for (let i = 0; i < evtObject.length; i++) {
    // Respond based on the type of event

    switch (Ds.GetEventObjectType(evtObject[i])) {
      case 'DsObjectAttrRef': {
        // Digistar object attribute callback event
        // evtObject is the object attribute reference

        const objID = Ds.GetAttrRefObjectID(evtObject[i]);

        const attrIndex = Ds.GetAttrRefIndex(evtObject[i]);

        const objName = Ds.GetAttrRefObjectName(evtObject[i]);

        const attrName = Ds.GetAttrRefAttrName(evtObject[i]);

        print('responding to ' + objName + ' ' + attrName);

        break;
      }
      case 'DsObjectCommandRef': {
        // Digistar object command callback event
        // evtObject[i] is the Digistar object command reference

        const objID = Ds.GetCommandRefObjectID(evtObject[i]);

        const cmdIndex = Ds.GetCommandRefIndex(evtObject[i]);

        const objName = Ds.GetCommandRefObjectName(evtObject[i]);

        const cmdName = Ds.GetCommandRefCommandName(evtObject[i]);

        print('responding to ' + objName + ' ' + cmdName);

        break;
      }
      case 'number':
        // evtObject[i] is a number that is the interval of the timer

        print('responding to timer ' + evtObject[i]);

        break;

      case 'string':
        // evtObject[i] is the message string from Digistar

        print('responding to message from Digistar: ' + evtObject[i]);

        if (String(evtObject[i]) == 'exit') exitScript = true;

        break;
    }
  }
}
