export function hasPressedLeftKey(event: KeyboardEvent) {
  // * "Left" is used for older browser versions
  return ["ArrowLeft", "Left"].includes(event.key);
}

export function hasPressedRightKey(event: KeyboardEvent) {
  // * "Right" is used for older browser versions
  return ["ArrowRight", "Right"].includes(event.key);
}
