import { defineStore } from "pinia";
export const useUserStore = defineStore({
  id: "user", //id项必填，且需要唯一
  state: () => {
    return {
      name: "zzx",
    };
  },
  actions: {
    updateName(name: string) {
      this.name = name;
    },
  },
});
