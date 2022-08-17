export function getHTMLElement(elementName: string) {
  const element = document.querySelector(elementName) as HTMLElement;
  return element;
}
