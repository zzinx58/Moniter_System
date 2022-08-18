<template>
    <div>
        <el-table fit :data="list" style="width:100%;" :row-style="rowClass" height="85vh"
            :header-row-style="headerClass" @row-click="clickRow()" @selection-change="handlerSelectChange"
            :highlight-current-row="true" :header-cell-style="{ cursor: 'pointer', background: '#EBEDF0' }"
            ref="errorTableList" scrollbar-always-on>
            <el-table-column type="selection" :align="center" />
            <el-table-column width="400" :align="center">
                <template #header>
                    <el-input v-model="search" size="large" clearable :suffix-icon="Search" />
                </template>
                <template #default="scope">
                    {{ scope.row.address }}
                </template>
            </el-table-column>
            <el-table-column property="errorType" label="错误类型" :align="center" :filters="errorTypeFilter" />
            <el-table-column property="status" label="状态" :align="center" :filters="statusFilter" />
            <el-table-column label="时间" :align="center" :sort-method="sortByTime" :sortable="true">
                <template #default="scope">{{ scope.row.time }}</template>
            </el-table-column>
            <el-table-column property="total" label="事件数" :align="center" :sortable="true"
                :sort-method="sortByEvents" />
            <el-table-column property="users" label="用户数" :align="center" :sortable="true" :sort-method="sortByUsers" />
            <el-table-column property="version" label="版本" :align="center" :filters="versionFilter"
                :filter-method="filterVersion" />
        </el-table>
        <div class="load-btn" v-show="showLoad">
            <el-button link type="danger" v-on:click="getMoreData">加载更多</el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, CSSProperties, Ref, reactive, computed } from 'vue'
import { ElTable } from 'element-plus'
import { Search } from "@element-plus/icons-vue"
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import request from "@/utils/axios"
import axios from "axios"
interface myError {
    errorType: string;
    status: string;
    time: string;
    total: number;
    users: number;
    version: string;
    address: string;
    [key: string]: any;
}
const brr = ref<Array<myError>>([]);//所有数据
const list=ref<Array<myError>>([]);
const selected = ref<Array<boolean>>([]);//
const center = ref("center");
const search = ref("");

//错误类型过滤器
const errorTypeFilter = reactive([
    { text: "sb", value: "sb" },
    { text: "niuma", value: "niuma" }
]);
const statusFilter = reactive([
    { text: "hhh", value: "sbdsfsd" },
    { text: "sfsdf", value: "sdnfsd" }
])
const versionFilter = reactive([
    { text: "development", value: "development" },
    { text: "production", value: "production" }
])

//加载按钮是否显示
const showLoad = ref(false);
//table标签
const errorTableList = ref(null);
//虚拟列表相关
const virtual = reactive({
    itemHeight: 100,
    showNum: 10,
    start: 0,
    end: 10
})
const lazyLoading = (scrollTop: number, scrollHeight: number, clientHeight: number, dom: any) => {
    let start = Math.floor( scrollTop/ virtual.itemHeight) - 1;
    virtual.start = start < 0 ? 0 : start;
    virtual.end = virtual.start + virtual.showNum;
    dom.style.scrollTop = virtual.start * virtual.itemHeight + 'px';
}
onMounted(async () => {
    try {
        let { data } = await request({ method: "post", url: "https://www.fastmock.site/mock/321c19c8899dc6f3a3792b44f67a6fb3/api/errorList" });
        localStorage.setItem("data", JSON.stringify(data));
        brr.value = JSON.parse(localStorage.getItem("data") as string);
        selected.value = Array(brr.value.length).fill(false);
        for (let i = 0; i < brr.value.length; i++) {
            if (i % 2 === 0) {
                brr.value[i].version = "production";
                brr.value[i].status = "未解决"
            } else {
                brr.value[i].version = "development"
                brr.value[i].status = "已解决";
            }
        }
        list.value=brr.value.slice(0,8);
        //获取实际滚动的容器
        let ref = errorTableList.value as any;
        const dom = ref.$refs.bodyWrapper.getElementsByClassName('el-scrollbar__wrap')[0];
        dom.addEventListener("scroll", function (event: any) {
            let { scrollTop, scrollHeight, clientHeight } = dom;
            // lazyLoading(scrollTop, scrollHeight, clientHeight, dom);
            if (scrollHeight - scrollTop - clientHeight < 5) {
                showLoad.value = true;
            } else {
                showLoad.value = false;
            }
        })
        // 监听滚动方向
        dom.addEventListener("mousewheel", function (event: any) {
        })

    } catch (e) {

    }
})
//background:rgba(185, 221, 249, 0.75)
//表格的一些样式
function rowClass(data: { row: any, rowIndex: number }) {
    if (selected.value[data.rowIndex]) {
        return "height:100px;cursor:pointer;background:rgba(185, 221, 249, 0.75)" as any;
    } else {
        return "height:100px;cursor:pointer" as any;
    }
}
const headerClass = function () {
    return "height:110px;font-size:11pt;color:#6c6c72;" as any;
}
//加载更多数据
const getMoreData = async () => {
    for (let next = list.value.length, i = next; i < next + 8 && i < brr.value.length; i++) {
        list.value.push(brr.value[i]);
    }
    // ref.clearSort();
}
//给时间进行排序
const sortByTime = (a: myError, b: myError) => {
    let num1 = new Date(a.time).getTime();
    let num2 = new Date(b.time).getTime();
    return num1 - num2;
}
//给事件数排序
const sortByEvents = function (a: myError, b: myError) {
    return a.total - b.total;
}
//给用户数排序
const sortByUsers = function (a: myError, b: myError) {
    return a.users - b.users;
}
const handlerSelectChange = (rows: myError) => {
}
//点击某一行触发
const clickRow = () => {

}
const filterVersion = (value: string, row: myError, column: TableColumnCtx<myError>) => {
    const property = column['property'];
    return row[property] === value
}
</script>
<style lang="scss" scoped>
* {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Microsoft YaHei", Arial, sans-serif;
}

.list-head-cell {
    cursor: pointer;
}

.load-btn {
    width: 100%;
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fafafa;
    border: 1px solid #eee;
}
</style>