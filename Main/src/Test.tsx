import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import { useUserStore } from "@/store/User";
// import request from "@/utils/axios";
import { getSelector, getLastEvent, } from '@/utils/catchError';
import { getPerformanceTiming } from "@/utils/performance";
import { handleJs, handlePromise } from "./__tests__";

export default defineComponent({
    setup() {
        // const userStore = useUserStore();
        // const handleClick = () => userStore.updateName("zzinx");
        // const requestTest = async () => {
        //     let result = await request({
        //         url: "/api/",
        //         method: "get",
        //     });
        // };

        // 监控js错误
        window.addEventListener('error', (event) => {
            handleJs(event);
        }, true)

        // 监控promise错误
        window.addEventListener('unhandledrejection', (event) => {
            handlePromise(event);
        }, true)


        const getPerform = function () {
            getPerformanceTiming();
        }

        const getClickInform = function () {

        }

        const bugjs = function () {
            window.someVar.error = 'error'
        }

        const bugPromise = function () {
            new Promise(function (resolve, reject) {
                window.someVar.error = 'error';
            })
        }

        const bugAsset = function () {

        }
        const bugConsole = function () {

        }
        const bugCors = function () {

        }
        return () => (
            <div class='whole'>
                <div class="left">
                    <h1>异常数据</h1>

                    <h2>前端异常</h2>
                    <input class='hello' type="button" onClick={bugjs} value='JS 代码执行异常' /><br />
                    <input class='world' type="button" onClick={bugPromise} value='Promise 异常' /><br />
                    <input type="button" onClick={bugAsset} value='静态资源加载异常' /><br />
                    {/*<img src="http://localhost:8888/nottrue.jpg"/>*/}
                    <input type="button" onClick={bugConsole} value='console.error 异常' /><br />
                    <input type="button" onClick={bugCors} value='跨域异常' /><br />
                    <br />
                    <h2>接口异常</h2>
                    <button>未响应/超时响应异常</button><br />
                    <button>4xx 请求异常</button><br />
                    <button>5xx 服务器异常</button><br />
                    <button>权限不足</button><br />
                </div>


                <div class="right">
                    <h1>行为数据</h1>
                    <input type="button" onClick={getPerform} value='获取性能数据' /><br />
                    <input type="button" onClick={getClickInform} value='点击事件' /><br />
                    <a href=""></a>
                    <a href=""></a>
                </div>
            </div>
        );
    },
});
