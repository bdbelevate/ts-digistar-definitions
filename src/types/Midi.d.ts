/**
 * A MIDI object is implemented to do MIDI (Musical Instrument Digital Interface) I/O. A description of MIDI can be found at this link.
 *
 * https://en.wikipedia.org/wiki/MIDI#Messages
 *
 * The current implementation is limited to short MIDI messages (no System Exclusive message can be used).
 *
 * A MIDI object can be created with:
 *
 * m = new MIDI(device)
 *
 * A MIDI object is created with the string device containing the MIDI device name.
 *
 * Note:
 * MIDI.getDeviceNames() is called without first creating an instance of the MIDI class.
 *
 * var deviceName = MIDI.getDeviceNames();
 *
 * deviceName will be an array of device names.
 *
 * The other MIDI functions are called with an instance variable.
 *
 * var m = new MIDI('myDeviceName');
 *
 * m.openRead(m);
 *
 * @param deviceName
 */
declare class MIDI {
  constructor(deviceName): MIDI;
  /**
   * Returns an array of MIDI device names
   */
  getDeviceNames(): string[];

  /**
   * Opens the MIDI device for reading
   */
  openRead(): void;

  /**
   * Opens the MIDI device for writing
   */
  openWrite(): void;

  /**
   * Closes the MIDI device communication
   */
  close(): void;

  /**
   * Write a 4 byte array of values to the MIDI device
   * (the array size can be smaller and will automatically be padded to 4 bytes).
   * @param values
   */
  writeArray(values: number[]): void;

  /**
   * Read a 4 byte array of values from the MIDI device
   */
  readArray(): number[];

  /**
   * Returns the number of 4-byte sets of MIDI values available for reading
   */
  avail(): number;

  /**
   * Waits for MIDI data to arrive for reading. Sleeps the script until data is ready or the timeout in seconds has expired.
   * The default timeout is infinite. Returns the number of 4-byte sets of MIDI values available for reading. If your script uses Ds.WaitForEvent(), consider setting up a NotificationRef object that references the MIDI object for event notification. See NotificationRef Object for Events for more details.
   * @param timeoutInSeconds
   */
  waitForData(timeoutInSeconds?: number): number;
}
