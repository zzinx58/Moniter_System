import { defineStore } from "pinia";
import defaultSetting from "@/settings";
import { DeviceType, ThemeMode } from "@/store/types";
const useAppConfigStore = defineStore("app-config", {
  state: () => {
    return {
      ...defaultSetting,
    };
  },
  actions: {
    changePrimarityColor(color: string) {
      this.themeColor = color;
      document.documentElement.style.setProperty("--my-theme-color", color);
    },
    changeSideWidth(sideWidth: number) {
      this.sideWidth = sideWidth;
      const root = document.querySelector(":root") as HTMLElement;
      root.style.setProperty("--menu-width", sideWidth + "px");
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
    toggleOpenSettingsDrawer(isDrawerOpen: boolean) {
      this.isDrawerOpen = isDrawerOpen;
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
