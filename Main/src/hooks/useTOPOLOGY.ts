import { ThemeMode } from "@/store/types";
//@ts-ignore
import TOPOLOGY from "vanta/dist/vanta.topology.min";
// import TOPOLOGY from "vanta/src/vanta.topology";
import { onMounted, onBeforeUnmount } from "vue";
/**  elementName with CSS selector */
export default function useTOPOLOGY(elementName: string, mode?: ThemeMode) {
  onMounted(() => {
    loadTOPOLOGY(elementName);
    document.addEventListener("fullscreenchange", (document) => {
      loadTOPOLOGY(elementName);
    });
  });
  onBeforeUnmount(() => {
    document.removeEventListener("fullscreenchange", () => {});
  });
  function loadTOPOLOGY(elementName: string) {
    TOPOLOGY({
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
}
