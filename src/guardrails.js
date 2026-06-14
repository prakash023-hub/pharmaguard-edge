const PII_PATTERNS = [
  /\b\d{3}-\d{2}-\d{4}\b/,
  /\b\d{16}\b/,
  /\b(?:ssn|social security|credit card|password)\b/i,
];

export function localPiiCheck(text) {
  for (const pattern of PII_PATTERNS) {
    if (pattern.test(text)) {
      return "PII or sensitive credential pattern detected";
    }
  }
  return null;
}
