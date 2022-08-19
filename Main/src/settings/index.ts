import { AppConfigState, DeviceType, ThemeMode } from "@/store/types";

export const projectName = "Random Just Fine";

export default {
  themeColor: "#409eff",
  theme: ThemeMode.DARK,
  deviceType: DeviceType.PC,
  sideWidth: 210,
  actionBar: {
    isShowRefresh: true,
    isShowFullScreen: true,
    isShowDarkModeSwitch: false,
    isShowSettings: true,
  },
  isCollapse: false,
  isFixedHeader: false,
  isDrawerOpen: false,
  showDevOptions: false,
  devOptions: {
    showFPS: false,
  },
} as AppConfigState;
