<template >
    <div class="members-list">
        <header>
            <h1>成员列表</h1>
            <div>
                <el-input v-model="search" placeholder="请输入成员姓名" clearable>
                    <template #append>
                        <el-button :icon="Search" @click="searchInput" />
                    </template>
                </el-input>
            </div>
        </header>
        <el-table :data="filterData" style="width: 100%" :row-style="{ cursor: 'pointer' }">
            <el-table-column :align="center" label="成员">
                <template #default="scope">
                    <el-popover effect="light" trigger="hover" placement="bottom" width="auto" :show-after="500">
                        <template #default>
                            <div> {{ scope.row.name }}</div>
                        </template>
                        <template #reference>
                            <span>{{ scope.row.name }}</span>
                        </template>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column :align="center" label="权限">
                <template #default="scope">
                    <span>{{ scope.row.auth }}</span>
                </template>
            </el-table-column>
            <el-table-column :align="center" label="邮箱">
                <template #default="scope">
                    <el-popover effect="light" trigger="hover" placement="bottom" width="auto" :show-after="500">
                        <template #default>
                            <div> {{ scope.row.email }}</div>
                        </template>
                        <template #reference>
                            <span>{{ scope.row.email }}</span>
                        </template>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column :align="center" label="加入时间">
                <template #default="scope">
                    <el-popover effect="light" trigger="hover" placement="bottom" width="auto" :draggable="500">
                        <template #default>
                            <div> {{ scope.row.createTime }}</div>
                        </template>
                        <template #reference>
                            <span>{{ scope.row.createTime }}</span>
                        </template>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column :align="center" label="操作">
                <template #default="scope">
                    <el-button link @click="handleDelete(scope.$index, scope.row)"
                        :style="{ color: 'rgb(255, 118, 38)' }">
                        {{ scope.row.operation
                        }}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="dialogVisible" title="删除提示" width="40%">
            <span>确定删除此成员吗?</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script lang="ts">
export default {
    name: "MemberList"
}
</script>
<script lang="ts" setup>
interface User {
    name: string
    email: string
    createTime: string
    auth: string
    operation: string
}
import { ref, reactive, watch, computed, toRaw } from "vue"
import { Search,Setting} from "@element-plus/icons-vue"
import { useRouter } from "vue-router"

const router = useRouter();
const center = ref("center");
//模态框
const dialogVisible = ref(false);
//用于备份
let data = reactive<Array<User>>([]);
const search = ref("");
//用于搜索数据
const searchData = computed(() => data.filter(
    (row) =>
        !search.value ||
        row.name.toLowerCase().includes(search.value.toLowerCase())
))
//用于呈现数据
const filterData = reactive<Array<User>>([]);
//点击搜索
const searchInput = () => {
    filterData.splice(0, filterData.length);
    searchData.value.forEach((per: User) => {
        filterData.push(toRaw(per));
    })
}
watch(router.currentRoute, function (newValue) {
    let { viewKey } = newValue.query;
    let arr: Array<User> = [
        {
            name: `hhh${viewKey}`,
            email: "130237@163.com",
            createTime: '2020-09-08 12:00:00',
            auth: '超级管理员',
            operation: '删除'
        },
    ]
    data.splice(0, data.length);
    filterData.splice(0, filterData.length);
    arr.forEach(person => {
        data.push(person)
        filterData.push(person);
    })
}, { deep: true, immediate: true })
const handleDelete = (index: number, row: any) => {
    dialogVisible.value = true;
}
</script>
<style lang="scss" scoped>
.members-list {
    margin-top: 2vh;
    width: 100%;
    display: flex;
    flex-direction: column;

    >header {
        display: flex;
        align-content: center;
        justify-content: space-between;

        >div {
            width: 30vw;
        }
    }
}
</style>