export enum ThemeMode {
  LIGHT = "light",
  Dark = "dark",
}
export enum DeviceType {
  PC = "pc",
  PAD = "pad",
  MOBILE = "mobile",
}

export interface UserState {
  userId: string;
  token: string;
  userName: string;
  nickName: string;
  avatar: string;
}

export interface AppConfigState {
  projectName: string;
  theme: ThemeMode;
  themeColor: string;
  deviceType: DeviceType;
  sideWidth: number;
  isCollapse: boolean;
  actionBar: {
    isShowRefresh: boolean;
    isShowFullScreen: boolean;
    isShowDarkModeSwitch: boolean;
    isShowSettings: boolean;
  };
}
