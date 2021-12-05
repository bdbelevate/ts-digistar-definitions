const posModeCar = {
  x: 123.0,
  y: 456.0,
  z: 789.0,
  mode: 'Cartesian',
  units: 'Meters',
};

Ds.SetObjectAttrUsingRef({ tbd: '123' }, posModeCar);

const posSph = {
  x: 0.0,
  y: (10.0 * Math.PI) / 180.0,
  z: 1.0,
  mode: 'Spherical',
  units: 'REarth',
};

Ds.SetObjectAttrUsingRef({ tbd: '123' }, posSph);
