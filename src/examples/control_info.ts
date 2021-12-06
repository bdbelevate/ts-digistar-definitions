function Loc() {
  const locObject = Ds.GetControlInfoObject('eye', 'position'); // get the controller info object

  const loc = Ds.GetObjectAttr(locObject, 'location'); // get the controller location

  const locStr =
    'latitude=' + loc.x + ',longitude=' + loc.y + ',elevation=' + loc.z;

  print(locStr);
}

Loc();
