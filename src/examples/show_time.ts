/*#################################################################
#    ShowTime.js -- display show time
#
# This script reads the show time attribute and updates
# text object "timecode" with the time.
#
#################################################################*/

// get reference to the show playStatus attribute

const showStatusRef = Ds.NewObjectAttrRef('show', 'playStatus');

// get index to the show "playing" enumeration

const playEnumIndex = Ds.GetEnumItemIndex('showStatusEnum', 'playing');

const stopEnumIndex = Ds.GetEnumItemIndex('showStatusEnum', 'stopped');

const SHOWTIME_TEST = true;
while (SHOWTIME_TEST) {
  // loop while the show is not playing

  print('waiting for show to begin');

  while (Ds.GetObjectAttrUsingRef(showStatusRef) != playEnumIndex) {
    const sControl = Ds.GetMessage();

    if (sControl != '' && sControl != 'fadestopreset') {
      break; // exit if message was received
    }

    Ds.Wait(0.5);
  }

  // If the timecode text object does not exist,then create it and add it to the scene.

  if (Ds.GetObjectID('timecode') < 0) {
    Ds.CreateObject('timecode', 'textClass');
  }

  if (Ds.GetObjectID('timecode') >= 0) {
    Ds.SetObjectAttr(
      'timecode',
      'origin',
      Ds.GetEnumItemIndex('textOriginEnum', 'center')
    );

    Ds.SetObjectAttr('timecode', 'position', {
      x: 0,
      y: (2.0 * Math.PI) / 180.0,
      z: 100,
      mode: 'sph',
    });

    Ds.SetObjectAttr('timecode', 'textScale', { x: 2, y: 2 });

    Ds.SceneAddObject(null, 'timecode');

    // If we are playing a dome video (the domeVideo object has been added to dome), then move

    // domeVideo before the eye so that the timecode object is drawn on top of the video.

    const domeChild = Ds.GetObjectChildNames('dome');

    let videoFound = false;

    for (let i = 0; i < domeChild.length; i += 1) {
      if (domeChild[i] == 'domeVideo') {
        videoFound = true;

        break;
      }
    }

    if (videoFound) {
      // add domeVideo to dome after the eye object

      Ds.AddObjectChildBefore('dome', 'domeVideo', 'eye');
    }

    let timPrev = 0.0;

    const showClockAttrRef = Ds.NewObjectAttrRef('show', 'time');

    const textDisplayAttrRef = Ds.NewObjectAttrRef('timeCode', 'text');

    print('Started show clock timecode display');

    while (Ds.GetObjectAttrUsingRef(showStatusRef) != stopEnumIndex) {
      const sControl = Ds.GetMessage();

      if (sControl != '' && sControl != 'fadestopreset') {
        break; // exit if message was received
      }

      const tim = Ds.GetObjectAttrUsingRef(showClockAttrRef);

      if (tim != timPrev) {
        // only process if time has changed since last check

        timPrev = tim;

        Ds.SetObjectAttrUsingRef(textDisplayAttrRef, Ds.TimeToStr(tim)); // set attribute
      }

      //print(Ds.TimeToStr(tim));

      Ds.Wait(0.5);
    }

    if (Ds.GetObjectID('timecode') >= 0) {
      Ds.SceneRemoveObject(null, 'timecode');
    }

    print('Stopped show clock display');
  } else {
    print('Failed to create timecode textClass object');
  }
}

print('exiting...');
