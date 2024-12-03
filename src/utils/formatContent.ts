export function formatContent(content: string): string[] {
  return content
    .split(".")
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}
