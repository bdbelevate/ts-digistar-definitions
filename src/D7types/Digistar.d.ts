// Digistar declarations
declare namespace Ds {
  /**
   * Use this command to perform an operation under the Windows operating system.
   * It sends the command string as though it was typed on a Windows command line.
   * It does not wait for the command to complete before returning.
   * @param command
   */
  function SystemCommand(command: string): void;

  interface SystemMemoryUsage {
    MemoryLoad: number;
    TotalPhys: number;
    AvailPhys: number;
    TotalPageFile: number;
    AvailPageFile: number;
    TotalVirtual: number;
    AvailVirtual: number;
  }

  /**
   * Obtains information about system memory usage.
   */
  function SystemMemory(): SystemMemoryUsage;

  interface ProcessMemoryUsage {
    PageFaultCount: number;
    PeakWorkingSetSize: number;
    WorkingSetSize: number;
    QuotaPeakPagedPoolUsage: number;
    QuotaPagedPoolUsage: number;
    QuotaPeakNonPagedPoolUsage: number;
    QuotaNonPagedPoolUsage: number;
    PagefileUsage: number;
    PeakPagefileUsage: number;
  }

  /**
   * Obtains information about a process's memory. The returned value has 64-bit integer members:
   */
  function ProcessMemory(): ProcessMemoryUsage;

  interface Process {
    '.file': string;
    '.pid': number;
  }

  function GetProcesses(): Process[];

  type PopupType =
    | 'ABORTRETRYIGNORE'
    | 'CANCELTRYCONTINUE'
    | 'HELP'
    | 'OK'
    | 'OKCANCEL'
    | 'RETRYCANCEL'
    | 'YESNO'
    | 'YESNOCANCEL';

  type PopupIcon =
    | 'ICONEXCLAMATION'
    | 'ICONWARNING'
    | 'ICONINFORMATION'
    | 'ICONASTERISK'
    | 'ICONQUESTION'
    | 'ICONSTOP'
    | 'ICONERROR'
    | 'ICONHAND';

  enum PopupReturnValue {
    OK = 1,
    Cancel = 2,
    Abort = 3,
    Retry = 4,
    Ignore = 5,
    Yes = 6,
    No = 7,
    TryAgain = 10,
    Continue = 11,
  }

  /**
   * Use this command to display a pop-up message window and receive a reply.
   * @param text - Use this command to display a pop-up message window and receive a reply.
   * @param caption - is the pop-up window heading.
   * @param type - is the pop-up window type
   * @param icon - is the icon to display with the pop-up window
   * @param setting - is an optional numeric value to 'or' with the type and icon settings to provide more options. Note that this in an implementation of the Windows MessageBox function. Please refer to the Microsoft C-language runtime API documentation for more details.
   */
  function PopupMessage(
    text: string,
    caption: string,
    type: PopupType,
    icon?: PopupIcon,
    setting?: number
  ): PopupReturnValue;

  /**
   * Resolves a file or directory path containing $digistar, $content, or $gpcontent to the full path.
   * For example, “$content\\library” may (depending on the actual location of $content) resolve to \\dshost\\d7content\\library.
   */
  function ResolvePathName(path: string): string;

  /**
   * The text command string is sent to Digistar for processing.
   * Any valid Digistar script command can be specified.
   *
   * Example:
   *
   * ```js
   * Ds.SendStringCommand("system reset");
   * ```
   *
   * Note:
   * This method uses a non-real-time background thread for processing and may be
   * slowed by other higher-priority activities. Because of this limitation, care should
   * be used when choosing this command over a command that specifically access Digistar
   * object attributes and commands.
   *
   * The "system reset" command can be sent more efficiently like this:
   * Ds.ExecuteObjectCommand("system", "reset");
   * @param command
   */
  function SendStringCommand(command: string): void;

  /**
   * Sends a text buffer as a list of Digistar commands.
   *
   * commandBuffer is a text buffer where individual Digistar commands are separated with \r\n\t (return, new-line, and/or tab)
   * control characters. This text buffer is sent to Digistar to be processed as individual
   * command lines.
   * @param commandBuffer
   */
  function SendStringCommandBuffer(commandBuffer: string): void;

  /**
   * Sends a text buffer as a Digistar script.
   *
   * The text buffer is sent to Digistar to be processed as a (.ds) script.
   * Example:
   * ```js
   * const myScriptBuffer =
   * '\tsystem message \"Beginning 3D Constellation Flight\"\r\n'+
   * '\teye intensity 0 dur 2\r\n'+
   * '+2\tsystem reset\r\n'+
   * '+0.1\teye location here\r\n'+
   * '\tscene attitude 0 30 0\r\n'+
   * '\teye offset 0 0 -4 rearth\r\n'+
   * '\tstars on\r\n'+
   * '\tmilkyway on\r\n'+
   * '+1\tsun on\r\n'+
   * '\tmoon on\r\n'+
   * '\tearth on\r\n'+
   * '+6\tallStick on\r\n'+
   * '+4\tscene date rate 10.0 minutes duration 2\r\n'+
   * '+3\teye offset 0 0 -400 rearth duration 10 5 0.5\r\n'+
   * '+10\teye offset 0 0 -800 pc dur 60 5 0.1\r\n'+
   * '+70.0\teye offset 0 0 -400 rearth dur 30\r\n'+
   * '+30.1\teye offset 0 0 -4 rearth dur 15.0 0.1 14.0\r\n'+
   * '+30\tscene date rate 0 dur 10 1 1\r\n'+
   * '+10\tsystem message \"Constellation Flight Complete\"\r\n'+
   * '\tscript end';
   * Ds.SendScriptCommands('myScript', myScriptBuffer);
   * ```
   * Notes:
   * A '\' character is used before '"' characters to allow embedding within a string of characters.
   *
   * If offset is not specified, it will default to 0.0 seconds.
   * @param name - name is how the script will be identified to Digistar. It will be as though a script by the name has been played.
   * @param buffer - buffer is the text of the script. Lines are separated with \r\n\t (return, new-line, and tab) control characters. Each line may begin with an optional timecode preceding the \t character.
   * @param offset - offset is a floating point value indicating the time in seconds before the script is to be played.
   */
  function SendScriptCommands(
    name: string,
    buffer: string,
    offset?: number
  ): void;

  /**
   * Sending a message causes the text to be displayed at the Digistar output window
   * using MESGLEVEL_DEBUG
   * @param message
   */
  function SendMessageDebug(message: string): void;
  /**
   * Sending a message causes the text to be displayed at the Digistar output window
   * using MESGLEVEL_STATUS
   * @param message
   */
  function SendMessageStatus(message: string): void;
  /**
   * Sending a message causes the text to be displayed at the Digistar output window
   * using MESGLEVEL_SYSTEM_STATUS
   * @param message
   */
  function SendMessageSystemStatus(message: string): void;
  /**
   * Sending a message causes the text to be displayed at the Digistar output window
   * using MESGLEVEL_WARNING
   * @param message
   */
  function SendMessageWarning(message: string): void;
  /**
   * Sending a message causes the text to be displayed at the Digistar output window
   * using MESGLEVEL_ERROR
   * @param message
   */
  function SendMessageError(message: string): void;

  /**
   * Returns the latest message text that was sent for the JavaScript from Digistar.
   * After the call to Ds.GetMessage(), further calls will return a null string (“”)
   * until a new message is sent from Digistar.
   *
   * In the following example, the script
   * will loop indefinitely. It will check for messages from Digistar and will break out of the loop if it sees the "quit" message.
   *
   * Example:
   * ```js
   * while (true) {
   *  if (Ds.GetMessage() == "quit")
   *    break;
   *  print('waiting');
   *  Ds.Wait(1.0);
   * }
   * ```
   *
   * Notes:
   * See Sending a Message to a Script for more information about sending messages from Digistar to a JavaScript.
   */
  function GetMessage(): string;

  /**
   * Suspend processing of a JavaScript. Checks the wait time on callbacks from the Digistar real-time thread.
   *
   * Almost always, Ds.Wait() is preferred over Ds.WaitNRT() because NRT callbacks from Digistar can sometimes be missing or delayed. Ds.WaitNRT() was included for completeness but is rarely used.
   *
   * Note: Digistar processes with two main threads of execution - a real-time (RT) thread and a non-real-time (NRT) thread. The non-real-time thread handles activities that can tolerate delays. The real-time thread is reserved for processes that are essential in updating the system in a smooth and consistent manner.
   *
   * Example:
   * ```js
   * while (true) {
   *  Ds.Wait(1.0, "system");
   *  print('.');
   * }
   * ```
   *
   * @param timeInSeconds - is the time is seconds to wait.
   * @param clock - specifies which clock to use for waiting
   */
  function Wait(timeInSeconds: number, clock: 'cpu' | 'system' | 'show'): void;

  /**
   * Suspend processing of a JavaScript. Checks the wait time on callbacks from the Digistar non-real-time thread.
   *
   * Almost always, Ds.Wait() is preferred over Ds.WaitNRT() because NRT callbacks from Digistar can sometimes be missing or delayed. Ds.WaitNRT() was included for completeness but is rarely used.
   *
   * Note: Digistar processes with two main threads of execution - a real-time (RT) thread and a non-real-time (NRT) thread. The non-real-time thread handles activities that can tolerate delays. The real-time thread is reserved for processes that are essential in updating the system in a smooth and consistent manner.
   * @param timeInSeconds - is the time is seconds to wait.
   * @param clock - specifies which clock to use for waiting
   */
  function WaitNRT(
    timeInSeconds: number,
    clock: 'cpu' | 'system' | 'show'
  ): void;

  /**
   * Causes the JavaScript to sleep or pause.
   *
   * Note: Ds.Sleep() differs from Ds.Wait() in that it does not wait on the Digistar frame update and can therefore be less than a Digistar frame.
   * @param timeInSeconds
   */
  function Sleep(timeInSeconds: number): void;

  /**
   * A Digistar class, object, or enumeration item.
   */
  interface Entity {
    /**
     * A value less than 0 indicates that the entity is not a class.
     */
    classID: number;
    /**
     * A value less than 0 indicates that the entity was not found in the Digistar name table.
     */
    entityID: number;
    entityType: 'enumeration' | 'class' | 'object' | 'undefined';
    objectClassID: number;
    objectExists: boolean;
    objectType: 'system' | 'constellationArt' | 'undefined';
  }

  /**
   * Use this command to get information about an entry in the Digistar name table.
   *
   * The Digistar name table is used to access class, object, and enumeration items.
   * @param entityName
   */
  function GetNameInfo(entityName: string): Entity;

  enum ObjectType {
    /**
     * Object will exist until the system is initialized.
     */
    Permanent = 'permanent',
    Perm = 'perm',
    /**
     * Object will exist until a "system resetAll" command executes.
     */
    Persistent = 'persistent',
    Pers = 'pers',
    /**
     * Object will exist until a "system reset" or "system resetNoAV" command executes.
     */
    Temporary = 'temporary',
    Temp = 'temp',
  }
  /**
   * Creates a Digistar object.
   *
   * Most objects referenced by a Digistar JavaScript already exist and can be accessed by name.
   * However, sometimes it is necessary to create new objects with the Ds.CreateObject() command.
   * When an object is no longer needed, it can be deleted with the Ds.DeleteObject() command.
   *
   * @param object
   * @param objectClass
   * @param type - if not specified, the type will be the default object type for the given class. If not specified for a class, the type will default to "temporary".
   */
  function CreateObject(
    name: string,
    className: string,
    type?: ObjectType
  ): number;

  /**
   * Clones a Digistar object.
   *
   * @param newName - is the name of the Digistar object to create
   * @param nameToClone - is the name of an existing object to clone
   * @param type - if not specified, the type will be the default object type for the given class. If not specified for a class, the type will default to "temporary".
   */
  function CloneObject(
    newName: string,
    nameToClone: string,
    type?: ObjectType
  ): number;

  /**
   * Allocates Digistar object array elements.
   *
   * Some Digistar object attributes can have array elements.
   * To allocate an array, call Ds.AllocObjectArray() with the Digistar object name,
   * the attribute name, and the maximum size of the array.
   *
   * @param name - is the name of a Digistar object that has already been created
   * @param attributeName - is the name of an attribute of the object
   * @param count - is the number of array elements to allocate
   */
  function AllocObjectArray(
    name: string,
    attributeName: string,
    count: number
  ): number;

  /**
   * Reallocates Digistar object array elements.
   *
   * Some Digistar object attributes can have array elements.
   * To change the number of array elements already allocated in an array,
   * call Ds.ResizeObjectArray() with the Digistar object name, the attribute name,
   * and the new maximum size of the array.
   *
   * @param name - is the name of a Digistar object that has already been created
   * @param attributeName - is the name of an attribute of the object
   * @param count - is the number of array elements for the reallocation
   */
  function ResizeObjectArray(
    name: string,
    attributeName: string,
    count: number
  ): number;

  /**
   * Deletes a Digistar object
   *
   * @param name - is the name of the Digistar object to delete.
   */
  function DeleteObject(name: string): void;
}

/**
 * Digistar provides a print function that outputs to the console
 */
declare function print(message: string | number | Array<string | number>): void;

// Serial port communication
declare namespace Serial {}
