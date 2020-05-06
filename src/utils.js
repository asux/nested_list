export function generateId() {
  return new Date().getTime();
}

export function compareByPosition(a, b) {
  if (a.position < b.position) {
    return -1;
  }
  if (a.position > b.position) {
    return 1;
  }
  return 0;
}
