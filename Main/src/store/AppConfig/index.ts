import { defineStore } from "pinia";
import defaultSetting from "@/settings";
import { DeviceType, SideTheme, ThemeMode } from "@/store/types";
const useAppConfigStore = defineStore("app-config", {
  state: () => {
    return defaultSetting;
  },
  actions: {
    changePrimarityColor(color: string) {
      this.themeColor = color;
    },
    changeDevice(deviceType: DeviceType) {
      this.deviceType = deviceType;
    },
    changeSideBarTheme(sideTheme: SideTheme) {
      this.sideTheme = sideTheme;
    },
    changeTheme(theme: ThemeMode) {
      this.theme = theme;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "app-config",
        storage: localStorage,
      },
    ],
  },
});

export default useAppConfigStore;
