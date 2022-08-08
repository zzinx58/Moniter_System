import {
  AppConfigState,
  DeviceType,
  ThemeMode,
  SideTheme,
} from "@/store/types";

export const projectName = "Random Just Fine";

export default {
  themeColor: "#409eff",
  theme: ThemeMode.LIGHT,
  sideTheme: SideTheme.WHITE,
  deviceType: DeviceType.PC,
  sideWidth: 210,
  actionBar: {
    isShowRefresh: true,
    isShowFullScreen: true,
  },
} as AppConfigState;
