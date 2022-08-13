import { defineStore } from "pinia";
import defaultAvatar from "@/assets/zzinx58.png";
export const useUserStore = defineStore({
  id: "user-info", //id项必填，且需要唯一
  state: () => {
    return {
      userId: "",
      token: "",
      userName: "",
      nickName: "zzinx",
      avatar: defaultAvatar,
    };
  },
  actions: {
    updateName(name: string) {
      this.nickName = name;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "user-info",
        storage: localStorage,
      },
    ],
  },
});
