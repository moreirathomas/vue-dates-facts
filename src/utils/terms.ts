function splitInput(input: string): string[] {
  return input.split(',').map((string) => string.trim());
}

function checkValidity(input: string): boolean {
  const dateExp = /^([1-9]|0[1-9]|1[012])\/([1-9]$|0[1-9]|[12][0-9]|3[01])$/; // mm/dd or m/dd or mm/d or m/d
  return dateExp.test(input);
}

export function computeTerms(input: string): string[] {
  // split and check validity of inputs
  let inputsArray = splitInput(input).filter((input) => checkValidity(input));
  // return an array with no duplicate
  return Array.from(new Set(inputsArray));
}
