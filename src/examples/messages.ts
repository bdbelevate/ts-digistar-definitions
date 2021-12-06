const MESSAGE_TEST = true;
while (MESSAGE_TEST) {
  if (Ds.GetMessage() == 'quit') break;

  print('waiting');

  Ds.Wait(1.0);
}
