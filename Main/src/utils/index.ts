export function toHump(str: string): string {
  if (!str) return str;
  return str
    .replace(/\-(\w)/g, function (all, letter) {
      return letter.toUpperCase();
    })
    .replace(/(\s|^)[a-z]/g, function (char) {
      return char.toUpperCase();
    });
}
