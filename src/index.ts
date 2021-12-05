const result = Ds.PopupMessage(
  'An error has occurred. Continue processing?',
  'Alert',
  'YESNO'
);

if (result == Ds.PopupReturnValue.No) print('hello');
