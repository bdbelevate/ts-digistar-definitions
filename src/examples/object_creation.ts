if (Ds.GetObjectID('timecode') < 0) {
  Ds.CreateObject('timecode', 'textClass');

  Ds.SetObjectAttr(
    'timecode',
    'origin',

    Ds.GetEnumItemIndex('textOriginEnum', 'center')
  );

  Ds.SetObjectAttr('timecode', 'position', {
    x: 0,
    y: 10,
    z: 100,

    mode: 'sph',
  });

  Ds.SetObjectAttr('timecode', 'textScale', { x: 4, y: 4 });

  Ds.SceneAddObject(null, 'timecode');
}

export {};
