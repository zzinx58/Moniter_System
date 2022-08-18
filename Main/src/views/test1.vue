<template>
    <el-table-v2 :columns="columns" :data="list" :width="width" :height="height" fixed :sort-state="sortState"
        @column-sort="onSort"  scrollbar-always-on :row-height="100" :cache="4"/>
</template>

<script lang="tsx" setup>
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs'
import {
    ElButton,
    ElIcon,
    ElTag,
    ElTooltip,
    TableV2FixedDir,
} from 'element-plus'
import { Timer } from '@element-plus/icons-vue'
import { TableV2SortOrder } from 'element-plus'
import type { Column, SortBy, SortState } from 'element-plus'


const list = ref([]);
const width = ref(window.innerWidth);
const height = ref(window.innerHeight * 0.8);
onMounted(() => {
    list.value = JSON.parse(localStorage.getItem("data") as string);
})
const sortState = ref<SortState>({
    'time': TableV2SortOrder.ASC,
    'users': TableV2SortOrder.ASC,
    'total': TableV2SortOrder.ASC,
})
const onSort = ({ key, order }: SortBy) => {
    sortState.value[key] = order
    /*  list.value.sort((column1:any,column2:any):number=>{
         if(key==='time'){
             let time1=new Date(column1.time).getTime();
             let time2=new Date(column2.time).getTime();
             return time1-time2;
         }else if(key==='users'){
             return column1.users-column2.users;
         }else if(key==='total'){
             return column1.total-column2.total;
         }else{
             return 0;
         }
     }) */
    if (key === 'time') {
        list.value.sort((column1: any, column2: any): number => {
            let time1 = new Date(column1.time).getTime();
            let time2 = new Date(column2.time).getTime();
            return time1 - time2;
        })
    } else if (key === 'users') {
        list.value.sort((column1: any, column2: any): number => {
            return column1.users - column2.users;
        })
    } else if (key === 'total') {
        list.value.sort((column1: any, column2: any): number => {
            return column1.total - column2.total;
        })
    }
}

const columns: Column<any>[] = [
    {
        key: "checkbox",
        title: "checkbox",
        width: 170,
        align: 'center',
        cellRenderer: () => (
            <el-checkbox  />
        )
    },
    {
        key: "address",
        width: 170,
        align: 'center',
        dataKey: "address",
        cellRenderer: ({ cellData: address }) => (<span>{address}</span>)
    },
    {
        key: "errorType",
        width: 170,
        align: 'center',
        title: "错误类型",
        dataKey: "errorType",
        cellRenderer: ({ cellData: errorType }) => (<>{errorType}</>)
    },
    {
        key: "status",
        width: 170,
        align: 'center',
        title: "状态",
        dataKey: "status",
        cellRenderer: ({ cellData: status }) => (<>{status}</>)
    },
    {
        key: "time",
        width: 170,
        align: 'center',
        title: "时间",
        dataKey: "time",
        sortable: true,
        cellRenderer: ({ cellData: time }) => (<>{time}</>)
    },
    {
        key: "total",
        width: 170,
        align: 'center',
        title: "事件数",
        dataKey: "total",
        sortable: true,
        cellRenderer: ({ cellData: total }) => (<>{total}</>)
    },
    {
        key: "users",
        width: 170,
        align: 'center',
        title: "用户数",
        dataKey: "users",
        sortable: true,
        cellRenderer: ({ cellData: users }) => (<>{users}</>)
    },
    {
        key: "version",
        width: 170,
        align: 'center',
        title: "版本",
        dataKey: "version",
        cellRenderer: ({ cellData: version }) => (<>{version}</>)
    }
]

</script>
<style lang="scss" scoped>  
.error-list-head{
    height:300px;
    color:red;
}
</style>
