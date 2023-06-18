export function getClosestValueInArray(array: number[], value: number) {
  return array.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );
}
