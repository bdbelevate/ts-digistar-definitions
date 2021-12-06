// This is the callback example

function a(object: Ds.DSObjectIdentifier, attribute: string, element?: number) {
  print(
    'a: object ' +
      object +
      ', attribute ' +
      attribute +
      ', element ' +
      element?.toString()
  );

  return;
}

function b(object: Ds.DSObjectIdentifier, attribute: string, element?: number) {
  print(
    'b: object ' +
      object +
      ', attribute ' +
      attribute +
      ', element ' +
      element?.toString()
  );

  Ds.CancelCallback();

  return;
}

function c(object: Ds.DSObjectIdentifier, command: string) {
  print('c: object ' + object + ', command ' + command);

  return;
}

Ds.AddObjectAttrCallback('eye', 'position', a);

Ds.AddObjectAttrCallback('eye', 'attitude', b);

Ds.AddObjectCommandCallback('stars', 'on', c);

Ds.WaitForCallback();

export {};
