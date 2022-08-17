import { getHTMLElement } from "@/hooks/useHTMLUtils";

export function useSlideInDown(elementName: string, durationTime?: string) {
  const element = getHTMLElement(elementName);
  element?.classList.add("animate__animated", "animate__slideInDown");
  ~!!durationTime &&
    element?.style.setProperty("--animate-duration", durationTime!);
  return element;
}

export function useSlideOutDown(elementName: string, durationTime?: string) {
  const element = getHTMLElement(elementName);
  element?.classList.add("animate__animated", "animate__slideInDown");
  ~!!durationTime &&
    element?.style.setProperty("--animate-duration", durationTime!);
  return element;
}

export function useSlideInLeft(elementName: string, durationTime?: string) {
  const element = getHTMLElement(elementName);
  element?.classList.add("animate__animated", "animate__slideInLeft");
  ~!!durationTime &&
    element?.style.setProperty("--animate-duration", durationTime!);
  return element;
}

export function useSlideOutLeft(elementName: string, durationTime?: string) {
  const element = getHTMLElement(elementName);
  element?.classList.add("animate__animated", "animate__slideOutLeft");
  ~!!durationTime &&
    element?.style.setProperty("--animate-duration", durationTime!);
  return element;
}

export function useSlideInUp(elementName: string, durationTime?: string) {
  const element = getHTMLElement(elementName);
  element?.classList.add("animate__animated", "animate__slideInUp");
  ~!!durationTime &&
    element?.style.setProperty("--animate-duration", durationTime!);
  return element;
}

export function useZoomIn(elementName: string, durationTime?: string) {
  const element = getHTMLElement(elementName);
  element?.classList.add("animate__animated", "animate__zoomIn");
  ~!!durationTime &&
    element?.style.setProperty("--animate-duration", durationTime!);
  return element;
}
