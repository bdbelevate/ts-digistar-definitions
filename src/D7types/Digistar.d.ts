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
}

/**
 * Digistar provides a print function that outputs to the console
 */
declare function print(message: string | number | Array<string | number>): void;

// Serial port communication
declare namespace Serial {}
