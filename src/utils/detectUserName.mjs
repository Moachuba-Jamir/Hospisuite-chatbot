export function isOnlyEmoji(userName) {
  // Remove any whitespace from the string
  userName = userName.trim();
  // Regex pattern for emoji ranges
  const emojiPattern =
    /^[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0FF}\u{1F100}-\u{1F64F}\u{1F680}-\u{1F6FF}]+$/u;

  return emojiPattern.test(userName);
}

export function isOnlySpecialChars(str) {
  // Remove whitespace
  str = str.trim();

  // Regex: ^ start of string, $ end of string
  // This means the ENTIRE string must match special characters
  const specialOnlyPattern = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]+$/;

  return specialOnlyPattern.test(str);
}