//@ts-ignore
import TOPOLOGY from "vanta/dist/vanta.topology.min";
/**  elementName with CSS selector */
export default function useTOPOLOGY(elementName: string) {
  TOPOLOGY({
    // el: `.${elementName}`,
    el: elementName,
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 1.0,
    color: 0x628fe8,
  });
}
