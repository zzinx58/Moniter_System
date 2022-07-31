import { defineComponent } from "vue";
import { useUserStore } from "@/store/User";
import request from "@/utils/axios";
//tsx需要引入Element组件使用，自动引入未生效
import { ElButton } from "element-plus/es";

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
        {/* element-plus样式冲突测试 */}
        <ElButton type="info">nihao</ElButton>
        {/* WindiCSS测试 */}
        <div class={"mb-10 bg-yellow-300"}>Hello world!</div>
        {/* pinia测试 */}
        <div>{userStore.name}</div>
        <button onClick={handleClick} class="bg-indigo-400 rounded-lg h-10 p-1">ChangeName</button>
        {/* vite-serve-proxy测试 */}
      </div>
    );
  },
});

// const Test = () => <ElButton type="warning">123456789</ElButton>;
// export default Test;
