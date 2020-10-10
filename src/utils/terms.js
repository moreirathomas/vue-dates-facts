function splitInputs(inputs) {
  return inputs.split(',').map((string) => string.trim());
}

function checkValidity(string) {
  const dateExp = /^([1-9]|0[1-9]|1[012])\/([1-9]$|0[1-9]|[12][0-9]|3[01])$/; // mm/dd or m/dd or mm/d or m/d
  return dateExp.test(string);
}

export function computeTerms(inputs) {
  // split and check validity of inputs
  let inputsArray = splitInputs(inputs).filter((input) => checkValidity(input));
  // return an array with no duplicate
  return [...new Set(inputsArray)];
}
