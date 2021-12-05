/**
 * A socket object is implemented to do TCP or UDP socket I/O.
 */
declare function Socket(url: string): DigistarSocket;

/**
 * A socket object is implemented to do TCP or UDP socket I/O.
 */
declare interface DigistarSocket {
  /**
   * Opens the Socket for communication as a TCP client (connects to a remote TCP server)
   */
  openClientTCP(): void;

  /**
   * Opens the Socket for communication as a TCP server (waits for remote client connections)
   */
  openServerTCP(): void;

  /**
   * Opens the Socket for communication as a UDP client (communicates with a remote UDP server)
   */
  openClientUDP(): void;

  /**
   * Opens the Socket for communication as a UDP server (communicates with a remote UDP client)
   */
  openServerUDP(): void;

  /**
   * Returns true if the socket is currently open
   */
  isOpen(): boolean;

  /**
   * Closes the socket
   */
  close(): void;

  /**
   * Returns the number of data bytes received and waiting to be read
   */
  avail(): number;

  /**
   * Returns the receive socket address (UDP server only) of the next unread UDP data (call after avail() and before read() or readArray())
   */
  getRecvAddr(): number;

  /**
   * Reads the received data to a string variable
   */
  read(): string;

  /**
   * Reads the received data to a numeric array
   */
  readArray(): number[];

  /**
   * Sends data from a string variable (optional socket is used only when writing to a UDP server when there are multiple UDP clients to determine which client to send the data - see getRecvAddr())
   * With a UDP server, socket can also be a text string with a UDP IP and port such as '192.168.2.221:12345' to specify a destination IP address
   *
   * @param data
   * @param socket
   */
  write(data: string, socket?: number | string): void;

  /**
   *  Sends data from a numeric array (optional socket is used only when writing to a UDP server when there are multiple UDP clients to determine which client to send the data - see getRecvAddr())
   * With a UDP server, socket can also be a text string with a UDP IP and port such as '192.168.2.221:12345' to specify a destination IP address
   * @param data
   * @param socket
   */
  writeArray(data: number[], socket?: number | string): void;

  /**
   * Purges any received data waiting to be read
   */
  purge(): void;

  /**
   * Pauses the script until data has been received or the optional timeout in seconds has expired. The default timeout is infinite. If your script uses Ds.WaitForEvent(), consider setting up a NotificationRef object that references the Socket object for event notification. See NotificationRef Object for Events for more details.
   * @param timeoutInSeconds
   */
  waitForData(timeoutInSeconds?: number): void;
}
