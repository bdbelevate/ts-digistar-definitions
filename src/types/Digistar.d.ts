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
   * @param text Use this command to display a pop-up message window and receive a reply.
   * @param caption is the pop-up window heading.
   * @param type is the pop-up window type
   * @param icon is the icon to display with the pop-up window
   * @param setting is an optional numeric value to 'or' with the type and icon settings to provide more options. Note that this in an implementation of the Windows MessageBox function. Please refer to the Microsoft C-language runtime API documentation for more details.
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
   * @param name name is how the script will be identified to Digistar. It will be as though a script by the name has been played.
   * @param buffer buffer is the text of the script. Lines are separated with \r\n\t (return, new-line, and tab) control characters. Each line may begin with an optional timecode preceding the \t character.
   * @param offset offset is a floating point value indicating the time in seconds before the script is to be played.
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
   * @param timeInSeconds is the time is seconds to wait.
   * @param clock specifies which clock to use for waiting
   */
  function Wait(timeInSeconds: number, clock: 'cpu' | 'system' | 'show'): void;

  /**
   * Suspend processing of a JavaScript. Checks the wait time on callbacks from the Digistar non-real-time thread.
   *
   * Almost always, Ds.Wait() is preferred over Ds.WaitNRT() because NRT callbacks from Digistar can sometimes be missing or delayed. Ds.WaitNRT() was included for completeness but is rarely used.
   *
   * Note: Digistar processes with two main threads of execution - a real-time (RT) thread and a non-real-time (NRT) thread. The non-real-time thread handles activities that can tolerate delays. The real-time thread is reserved for processes that are essential in updating the system in a smooth and consistent manner.
   * @param timeInSeconds is the time is seconds to wait.
   * @param clock specifies which clock to use for waiting
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
   * @param type if not specified, the type will be the default object type for the given class. If not specified for a class, the type will default to "temporary".
   */
  function CreateObject(
    name: string,
    className: string,
    type?: ObjectType
  ): number;

  /**
   * Clones a Digistar object.
   *
   * @param newName is the name of the Digistar object to create
   * @param nameToClone is the name of an existing object to clone
   * @param type if not specified, the type will be the default object type for the given class. If not specified for a class, the type will default to "temporary".
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
   * @param name is the name of a Digistar object that has already been created
   * @param attributeName is the name of an attribute of the object
   * @param count is the number of array elements to allocate
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
   * @param name is the name of a Digistar object that has already been created
   * @param attributeName is the name of an attribute of the object
   * @param count is the number of array elements for the reallocation
   */
  function ResizeObjectArray(
    name: string,
    attributeName: string,
    count: number
  ): number;

  /**
   * Deletes a Digistar object
   *
   * @param name is the name of the Digistar object to delete.
   */
  function DeleteObject(name: string): void;

  /**
   * Returns an object's ID
   *
   * Note:
   * Some objects defined by the system are not created until used and calling Ds.GetObjectID(object) will return -1 whereas Ds.GetObjectID(object,false) will return the pre-assigned object ID.
   *
   * Example:
   * ```js
   * // Create the ball (if needed)
   * if (Ds.GetObjectID("ball") < 0) {
   *   Ds.CreateObject("ball", "dotClass");
   * }
   * ballPositionReference = Ds.NewObjectAttrRef("ball", "position");
   * ```
   *
   * @param name is the name of the Digistar object
   * @param checkCreated an optional boolean (true/false) parameter indicating whether to check that a system object has been created. If omitted, the default is true and the returned value will be -1 if the object has not been created.
   *
   * @returns the ID number of the object if it exists or -1 if it does not exist (or not yet created in the case of pre-defined system objects). This command is useful in determining if an object needs to be created.
   */
  function GetObjectId(name: string, checkCreated?: boolean): number;

  /**
   * Returns a class ID
   *
   * @param className is the name of the Digistar class
   * @param checkCreated an optional boolean (true/false) parameter indicating whether to check that a system object has been created. If omitted, the default is true and the returned value will be -1 if the object has not been created.
   *
   * @returns the ID number of the class used to create the object or -1 if it does not exist.
   */
  function GetObjectClassId(className: string, checkCreated?: boolean): number;

  /**
   * Used to get an object name from an object ID. If the object ID is not valid, null will be returned.
   *
   * @param objectID is the ID number of the object.
   */
  function GetObjectName(objectID: number): string | null;

  /**
   * Returns the number of array elements for an object attribute.
   *
   * @param objectID is the ID number of the object.
   */
  function GetObjectArraySize(objectID: number): number;

  /**
   * Returns the number of parents of object.
   *
   * @param objectID is the ID number of the object.
   */
  function GetObjectNumParents(objectID: number): number;

  /**
   * Returns an array of names of parents of object.
   *
   * @param objectID is the ID number of the object.
   */
  function GetObjectParentNames(objectID: number): string[];

  /**
   * Returns a single parent name of object referenced by the index.
   *
   * @param objectID is the ID number of the object.
   * @param index the index in the array
   */
  function GetObjectParentNameUsingIndex(
    objectID: number,
    index: number
  ): string;

  /**
   * Returns the number of children of object.
   *
   * @param objectID is the ID number of the object.
   */
  function GetObjectNumChildren(objectID: number): number;

  /**
   * Returns an array of names of children of object.
   *
   * @param objectID is the ID number of the object.
   */
  function GetObjectChildNames(objectID: number): string[];

  /**
   * Returns a single child name of object referenced by the index.
   *
   * @param objectID is the ID number of the object.
   * @param index the index in the array
   */
  function GetObjectChildNameUsingIndex(
    objectID: number,
    index: number
  ): string;

  /**
   * Adds a child object to a parent.
   *
   * @param parentName is the name of the parent object
   * @param childName is the name of the child object to add under the parent hierarchy
   */
  function AddObjectChild(parentName: string, childName: string): void;

  /**
   * Adds a child object to a parent
   *
   * @param parentName is the name of the parent object
   * @param childName is the name of the child object to add under the parent hierarchy
   * @param beforeObjName is the name of the object to place the child after
   */
  function AddObjectChildBefore(
    parentName: string,
    childName: string,
    beforeObjName: string
  ): void;

  /**
   * Adds a child object to a parent.
   *
   * @param parentName is the name of the parent object
   * @param childName is the name of the child object to add under the parent hierarchy
   * @param beforeObjName is the name of the object to place the child before.
   */
  function AddObjectChildAfter(
    parentName: string,
    childName: string,
    afterObjName: string
  ): void;

  /**
   * Removes a child from a parent.
   * @param parentName is the name of the parent object
   * @param childName is the name of the child object to be removed from the parent hierarchy.
   */
  function RemoveObjectChild(parentName: string, childName: string): void;

  /**
   * Get the ID number of a class.
   * @param className classID is the ID number of the class if it exists or -1 if it does not exist
   */
  function GetClassID(className: string): number;

  /**
   * Get the name of a class from an ID number. The return value is null if the class ID is invalid.
   * @param classID the classID to find the name for
   */
  function GetClassName(classID: number): string | null;

  /**
   * Get the index number of an attribute.
   * @param className the name of the class
   * @param attrName the attribute name
   */
  function GetClassAttrIndex(className: string, attrName: string): number;

  /**
   * Get the index number of a command.
   * @param className the name of the class
   * @param commandName the command name
   */
  function GetClassCommandIndex(className: string, commandName: string): number;

  /**
   * Get the number of attributes defined by a class.
   * @param className the name of the class
   */
  function GetClassNumAttrs(className: string): number;

  /**
   * Get an array containing all attribute names.
   * @param className the name of the class
   */
  function GetClassAttrNames(className: string): string[];

  /**
   * Get an attribute name by index.
   * @param className the name of the class
   * @param index the array index
   */
  function GetClassAttrNameUsingIndex(className: string, index: number): string;

  /**
   * Get an array containing all attribute type names. A type name is something like
   * (BOOL, VIDEO_PATHNAME, INT32, POSITION, or COLOR). If the attribute is an array,
   * then the type name will be preceded by "ARRAY_OF_". For example, the type name
   * of an array attribute of type INT32, would be ARRAY_OF_INT32.
   * @param className the name of the class
   */
  function GetClassAttrTypeNames(className: string): string[];

  /**
   * Get an attribute type name by index.
   * @param className the name of the class
   * @param index the array index
   */
  function GetClassAttrTypeNameUsingIndex(
    className: string,
    index: number
  ): string;

  /**
   * Get the name of an enum attribute.
   * @param className the name of the class
   * @param attrIndex the attribute index number
   */
  function GetClassAttrEnumName(className: string, attrIndex: number): string;

  /**
   * Get the number of commands defined by the class.
   * @param className the name of the class
   */
  function GetClassNumCommands(className: string): number;

  /**
   * Get an array of command names defined by the class,
   * @param className the name of the class
   */
  function GetClassCommandNames(className: string): string[];

  /**
   * Get an command name by index.
   * @param className the name of the class
   * @param index the array index
   */
  function GetClassCommandNameUsingIndex(
    className: string,
    index: number
  ): string;

  /**
   * Returns the number of objects with the specified class name
   * @param className the name of the class
   */
  function GetClassNumObjects(className: string): number;

  /**
   * Returns the names of the of objects with the specified class name
   * @param className the name of the class
   */
  function GetClassObjectNames(className: string): string[];

  /**
   * Returns a single name at a specified index of objects with the specified class name
   * @param className the name of the class
   * * @param index the array index
   */
  function GetClassObjectNameUsingIndex(
    className: string,
    index: number
  ): string;

  interface SceneClass {
    tbd: string;
  }

  enum DrawMode {
    Distant = 'distant',
    Normal = 'normal',
    Fixed = 'fixed',
    Landscape = 'landscape',
    Near = 'near',
  }

  /**
   * Add an object to the scene.
   *
   * @param sceneObject is an object of type SceneClass. If not specified, the standard scene object will be used. Note that making this an optional parameter can lead to confusion. In new scripts, please specify either 'scene' or null if the standard scene object is to be used.
   * @param objectName is the name of the Digistar object to add to the scene
   * @param drawMode is the draw mode and is one of "distant", "normal", "fixed", "landscape", or "near"
   */
  function SceneAddObject(
    sceneObject: SceneClass | null,
    objectName: string,
    drawMode: DrawMode
  );

  /**
   * Add an object to the scene before another object.
   *
   * @param sceneObject is an object of type SceneClass. If not specified, the standard scene object will be used. Note that making this an optional parameter can lead to confusion. In new scripts, please specify either 'scene' or null if the standard scene object is to be used.
   * @param objectName is the name of the Digistar object to add to the scene
   * @param beforeName is the name of the object to add object before. If beforeName is "all" then object is added before all other objects.
   * @param drawMode is the draw mode and is one of "distant", "normal", "fixed", "landscape", or "near"
   */
  function SceneAddObjectBefore(
    sceneObject: SceneClass | null,
    objectName: string,
    beforeName: string | 'all',
    drawMode: DrawMode
  );

  /**
   * Add an object to the scene after another object.
   *
   * @param sceneObject is an object of type SceneClass. If not specified, the standard scene object will be used. Note that making this an optional parameter can lead to confusion. In new scripts, please specify either 'scene' or null if the standard scene object is to be used.
   * @param objectName is the name of the Digistar object to add to the scene
   * @param afterName is the name of the object to add object after. If afterName is "all" then object is added before all other objects.
   * @param drawMode is the draw mode and is one of "distant", "normal", "fixed", "landscape", or "near"
   */
  function SceneAddObjectAfter(
    sceneObject: SceneClass | null,
    objectName: string,
    afterName: string | 'all',
    drawMode: DrawMode
  );

  /**
   * Removes an object from the scene.
   * @param sceneObject  is an object of type SceneClass. If not specified, the standard scene object will be used. Note that making this an optional parameter can lead to confusion. In new scripts, please specify either 'scene' or null if the standard scene object is to be used.
   * @param objectName is the name of the Digistar object to remove from the scene
   */
  function SceneRemoveObject(
    sceneObject: SceneClass | null,
    objectName: string
  ): void;

  /**
   * Sets the scene date to the current date and time.
   *
   * @param sceneObject is an object of type SceneClass. If not specified, the standard scene object will be used. Note that making this an optional parameter can lead to confusion. In new scripts, please specify either 'scene' or null if the standard scene object is to be used.
   * @param controller is an optional controller to use with the command.
   */
  function SceneDateNow(
    sceneObject: SceneClass | null,
    controller?: string | number
  ): void;

  /**
   * Sets the scene date to the current date and time.
   *
   * @param sceneObject is an object of type SceneClass. If not specified, the standard scene object will be used. Note that making this an optional parameter can lead to confusion. In new scripts, please specify either 'scene' or null if the standard scene object is to be used.
   * @param controller is an optional controller to use with the command.
   */
  function SceneDateNow(
    sceneObject: SceneClass | null,
    controller?: string | number
  ): void;

  /**
   * Sets the date to a specified date offset from today
   *
   * @param sceneObject is an object of type SceneClass. If not specified, the standard scene object will be used. Note that making this an optional parameter can lead to confusion. In new scripts, please specify either 'scene' or null if the standard scene object is to be used.
   * @param hourOffset is an integral number to offset the date value.
   * @param dayOffset in an integral number of days to offset the date value.
   * @param controller is an optional controller to use with the command.
   */
  function SceneDateToday(
    sceneObject: SceneClass | null,
    hourOffset?: number,
    dayOffset?: number,
    controller?: string | number
  ): void;

  /**
   * Sets the date to a specified date offset from today's sunrise time
   *
   * @param sceneObject is an object of type SceneClass. If not specified, the standard scene object will be used. Note that making this an optional parameter can lead to confusion. In new scripts, please specify either 'scene' or null if the standard scene object is to be used.
   * @param offset is an integral number to offset the date value.
   * @param offsetType is either 'hours' or 'degrees' to specify whether the offset is to be applied as hours or degrees.
   * @param dayOffset in an integral number of days to offset the date value.
   * @param controller is an optional controller to use with the command.
   */
  function SceneDateTodaySunrise(
    sceneObject: SceneClass | null,
    offset?: number,
    offsetType?: 'hours' | 'degrees',
    dayOffset?: number,
    controller?: string | number
  ): void;

  /**
   * Sets the date to a specified date offset from today's sunset
   *
   * @param sceneObject is an object of type SceneClass. If not specified, the standard scene object will be used. Note that making this an optional parameter can lead to confusion. In new scripts, please specify either 'scene' or null if the standard scene object is to be used.
   * @param offset is an integral number to offset the date value.
   * @param offsetType is either 'hours' or 'degrees' to specify whether the offset is to be applied as hours or degrees.
   * @param dayOffset in an integral number of days to offset the date value.
   * @param controller is an optional controller to use with the command.
   */
  function SceneDateTodaySunset(
    sceneObject: SceneClass | null,
    offset?: number,
    offsetType?: 'hours' | 'degrees',
    dayOffset?: number,
    controller?: string | number
  ): void;

  /**
   * Sets the date to a specified date offset from today's transit
   *
   * @param sceneObject is an object of type SceneClass. If not specified, the standard scene object will be used. Note that making this an optional parameter can lead to confusion. In new scripts, please specify either 'scene' or null if the standard scene object is to be used.
   * @param offset is an integral number to offset the date value.
   * @param offsetType is either 'hours' or 'degrees' to specify whether the offset is to be applied as hours or degrees.
   * @param dayOffset in an integral number of days to offset the date value.
   * @param controller is an optional controller to use with the command.
   */
  function SceneDateTodayTransit(
    sceneObject: SceneClass | null,
    offset?: number,
    offsetType?: 'hours' | 'degrees',
    dayOffset?: number,
    controller?: string | number
  ): void;

  /**
   * Sets the date to a specific date and time
   *
   * @param sceneObject is an object of type SceneClass. If not specified, the standard scene object will be used. Note that making this an optional parameter can lead to confusion. In new scripts, please specify either 'scene' or null if the standard scene object is to be used.
   * @param year specify the year
   * @param month specify the month
   * @param day specify the year
   * @param hour specify the year
   * @param minute specify the year
   * @param second specify the year
   * @param local is true for local time or false for UT.
   * @param controller is an optional controller to use with the command.
   */
  function SceneDate(
    sceneObject: SceneClass | null,
    year: number,
    month: number,
    day: number,
    hour: number,
    minute: number,
    second: number,
    local: boolean,
    controller?: string | number
  ): void;

  /**
   * Sets the date to an offset from a specified date's sunrise time
   *
   * @param sceneObject is an object of type SceneClass. If not specified, the standard scene object will be used. Note that making this an optional parameter can lead to confusion. In new scripts, please specify either 'scene' or null if the standard scene object is to be used.
   * @param year specify the year
   * @param month specify the month
   * @param day specify the year
   * @param offset is an integral number to offset the date value.
   * @param offsetType is either 'hours' or 'degrees' to specify whether the offset is to be applied as hours or degrees.
   * @param controller is an optional controller to use with the command.
   */
  function SceneDateSunrise(
    sceneObject: SceneClass | null,
    year: number,
    month: number,
    day: number,
    offset?: number,
    offsetType?: 'hours' | 'degrees',
    controller?: string | number
  ): void;

  /**
   * Sets the date to an offset from a specified date's sunset time
   *
   * @param sceneObject is an object of type SceneClass. If not specified, the standard scene object will be used. Note that making this an optional parameter can lead to confusion. In new scripts, please specify either 'scene' or null if the standard scene object is to be used.
   * @param year specify the year
   * @param month specify the month
   * @param day specify the year
   * @param offset is an integral number to offset the date value.
   * @param offsetType is either 'hours' or 'degrees' to specify whether the offset is to be applied as hours or degrees.
   * @param controller is an optional controller to use with the command.
   */
  function SceneDateSunset(
    sceneObject: SceneClass | null,
    year: number,
    month: number,
    day: number,
    offset?: number,
    offsetType?: 'hours' | 'degrees',
    controller?: string | number
  ): void;

  /**
   * Sets the date to an offset from a specified date's transit time
   *
   * @param sceneObject is an object of type SceneClass. If not specified, the standard scene object will be used. Note that making this an optional parameter can lead to confusion. In new scripts, please specify either 'scene' or null if the standard scene object is to be used.
   * @param year specify the year
   * @param month specify the month
   * @param day specify the year
   * @param offset is an integral number to offset the date value.
   * @param offsetType is either 'hours' or 'degrees' to specify whether the offset is to be applied as hours or degrees.
   * @param controller is an optional controller to use with the command.
   */
  function SceneDateTransit(
    sceneObject: SceneClass | null,
    year: number,
    month: number,
    day: number,
    offset?: number,
    offsetType?: 'hours' | 'degrees',
    controller?: string | number
  ): void;

  /**
   * Set the scene date rate
   *
   * @param sceneObject is an object of type SceneClass. If not specified, the standard scene object will be used. Note that making this an optional parameter can lead to confusion. In new scripts, please specify either 'scene' or null if the standard scene object is to be used.
   * @param value is the date rate, step, or relative value with units specified by unit.
   * @param unit is one of seconds, minutes, hours, sdays (sidereal days), days, smonths (sidereal months), cmonths (calendar months), months, syears (sidereal years), cyears (calendar years), or years.
   * @param relative is true if the date rate is to be set relative to the current rate.
   * @param controller is an optional controller to use with the command.
   */
  function SceneDateRate(
    sceneObject: SceneClass | null,
    value: number,
    unit:
      | 'seconds'
      | 'minutes'
      | 'sdays'
      | 'days'
      | 'smonths'
      | 'cmonths'
      | 'months'
      | 'syears'
      | 'cyears'
      | 'years',
    relative?: boolean,
    controller?: string | number
  );

  /**
   * Set the scene date rate step
   *
   * @param sceneObject is an object of type SceneClass. If not specified, the standard scene object will be used. Note that making this an optional parameter can lead to confusion. In new scripts, please specify either 'scene' or null if the standard scene object is to be used.
   * @param value is the date rate, step, or relative value with units specified by unit.
   * @param unit is one of seconds, minutes, hours, sdays (sidereal days), days, smonths (sidereal months), cmonths (calendar months), months, syears (sidereal years), cyears (calendar years), or years.
   * @param controller is an optional controller to use with the command.
   */
  function SceneDateRateStep(
    sceneObject: SceneClass | null,
    value: number,
    unit:
      | 'seconds'
      | 'minutes'
      | 'sdays'
      | 'days'
      | 'smonths'
      | 'cmonths'
      | 'months'
      | 'syears'
      | 'cyears'
      | 'years',
    controller?: string | number
  );

  /**
   * Set the scene date rate relative
   *
   * @param sceneObject is an object of type SceneClass. If not specified, the standard scene object will be used. Note that making this an optional parameter can lead to confusion. In new scripts, please specify either 'scene' or null if the standard scene object is to be used.
   * @param value is the date rate, step, or relative value with units specified by unit.
   * @param unit is one of seconds, minutes, hours, sdays (sidereal days), days, smonths (sidereal months), cmonths (calendar months), months, syears (sidereal years), cyears (calendar years), or years.
   * @param controller is an optional controller to use with the command.
   */
  function SceneDateRateRelative(
    sceneObject: SceneClass | null,
    value: number,
    unit:
      | 'seconds'
      | 'minutes'
      | 'sdays'
      | 'days'
      | 'smonths'
      | 'cmonths'
      | 'months'
      | 'syears'
      | 'cyears'
      | 'years',
    controller?: string | number
  );
}

/**
 * Digistar provides a print function that outputs to the console
 */
declare function print(message: string | number | Array<string | number>): void;

// Serial port communication
declare namespace Serial {}
