// The following example will display a pop-up message and receive the resulting status reply. If the result is 'No' then the function returns.

const result = Ds.PopupMessage(
  'An error has occurred. Continue processing?',
  'Alert',
  'YESNO'
);

if (result == 7) console.log('result', result);

export {};
