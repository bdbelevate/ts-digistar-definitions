const test = true;
while (test) {
  if (Ds.GetMessage() == 'quit') break;

  print('waiting');

  Ds.Wait(1.0);
}

export {};
