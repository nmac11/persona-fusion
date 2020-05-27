export function exactMatchRegExp(str) {
  const escapedStr = escapeSpecialChars(str);
  return RegExp(`^${escapedStr}$`, 'i');
}

export function partialMatchRegExp(str) {
  const escapedStr = escapeSpecialChars(str);
  return RegExp(escapedStr, 'i');
}

function escapeSpecialChars(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
