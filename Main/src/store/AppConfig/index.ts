import { defineStore } from "pinia";
import defaultSetting from "@/settings";
import { DeviceType, ThemeMode } from "@/store/types";
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
    changeTheme(theme: ThemeMode) {
      this.theme = theme;
    },
    toggleCollapse(isCollapse: boolean) {
      this.isCollapse = isCollapse;
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
