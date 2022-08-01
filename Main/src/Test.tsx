import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import { useUserStore } from "@/store/User";
import request from "@/utils/axios";
import Button from "./views/Button.vue";
export default defineComponent({
  setup() {
    const userStore = useUserStore();
    const handleClick = () => userStore.updateName("zzinx");
    const requestTest = async () => {
      let result = await request({
        url: "/api/",
        method: "get",
      });
    };
    return () => (
      <div>
        {/* WindiCSS测试 */}
        <div class={"mb-10 bg-yellow-300"}>Hello world!</div>
        {/* pinia测试 */}
        <div>{userStore.name}</div>
        <button onClick={handleClick}>ChangeName</button>
        <br />
        {/* <RouterView></RouterView> */}
        <Button />
      </div>
    );
  },
});
