export interface AppConfigState {
  projectName: string;
  theme: ThemeMode;
  sideTheme: SideTheme;
  themeColor: string;
  deviceType: DeviceType;
  sideWidth: number;
  isCollapse: boolean;
  actionBar: {
    isShowRefresh: boolean;
    isShowFullScreen: boolean;
  };
}
export enum ThemeMode {
  LIGHT = "light",
  DARK = "dark",
}

export enum SideTheme {
  DARK = "dark",
  WHITE = "white",
  BLUE = "blue",
  IMAGE = "image",
}

export enum DeviceType {
  PC = "pc",
  PAD = "pad",
  MOBILE = "mobile",
}
