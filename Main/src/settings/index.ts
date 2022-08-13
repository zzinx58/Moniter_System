import { AppConfigState, DeviceType, ThemeMode } from "@/store/types";

export const projectName = "Random Just Fine";

export default {
  themeColor: "#409eff",
  theme: ThemeMode.LIGHT,
  deviceType: DeviceType.PC,
  sideWidth: 210,
  actionBar: {
    isShowRefresh: true,
    isShowFullScreen: true,
    isShowDarkModeSwitch: true,
    isShowSettings: true,
  },
  isCollapse: false,
} as AppConfigState;
