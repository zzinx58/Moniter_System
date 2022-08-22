<template >
    <div class="all-member">
        <header>
            <h2>成员列表({{ filterData.length }}名成员)</h2>
            <el-select v-model="statusValue" clearable placeholder="账号状态" @change="changeStatus">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-input v-model="searchMember" placeholder="请输入成员名字" :style="{ cursor: 'pointer' }" clearable>
                <template #append>
                    <el-button @click="searchInput" :icon="Search" />
                </template>
            </el-input>
        </header>
        <table>
            <el-table :data="filterData" :row-style="{ height: '10vh' }" :align="center" fit :height="tableHeight"
                @cell-mouse-enter="showSetting">
                <el-table-column label="成员">
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
                <el-table-column label="邮箱" :align="center">
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
                <el-table-column label="账号状态" :align="center">
                    <template #default="scope">
                        {{ scope.row.status }}
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" :align="center">
                    <template #default="scope">
                        <el-popover effect="light" trigger="hover" placement="bottom" width="auto" :show-after="500">
                            <template #default>
                                <div> {{ scope.row.createTime }}</div>
                            </template>
                            <template #reference>
                                <div>
                                    <el-icon>
                                        <timer />
                                    </el-icon>
                                    <span style="margin-left:10px;">{{ scope.row.createTime }}</span>
                                </div>
                            </template>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label="权限" :align="center">
                    <template #default="scope">
                        <span>{{ scope.row.auth }}</span>
                        <span :style="{ position: 'fixed', transform: 'translateX(1vw)' }"
                            v-show="scope.row.email === displaySetting">
                            <el-icon>
                                <Setting
                                    @click="() => { authVisible = true; scope.row.auth === '超级管理员' ? isSuper = true : isSuper = false }" />
                            </el-icon>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" :align="center">
                    <template #default="scope">
                        <el-button link :style="{ color: 'rgb(255, 118, 38)' }"
                            @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </table>
        <div class="pagination">
            <el-pagination background layout="prev, pager, next" :total="8" />
        </div>
        <!-- 删除提示框 -->
        <el-dialog v-model="deleteVisible" title="删除提示" width="40%">
            <span>确定删除此成员吗?</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="deleteVisible = false">取消</el-button>
                    <el-button type="primary" @click="deleteVisible = false">确定</el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 管理员权限模态框 -->
        <el-dialog v-model="authVisible" title="管理成员权限" width="40%">
            <!-- 超级管理员下拉菜单 -->
            <div v-show="isSuper" class="is-super-select">
                <span>移交超级管理员权限</span>
                <el-select v-model="options2Value" placeholder="请选择">
                    <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <span> 移交权限后，你的个人权限将变成成员，被指定成员将成为超级管理员</span>
            </div>
            <!--  普通成员下拉菜单-->
            <div v-show="!isSuper" class="not-super-select">
                <span>成员权限</span>
                <el-select v-model="options2Value" placeholder="请选择">
                    <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="authVisible = false">取消</el-button>
                    <el-button type="primary" @click="authVisible = false">确定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script lang="ts" >
export default {
    name: "AllMembers"
}
</script>
<script lang="ts" setup>
import { ref, onMounted, reactive, computed, toRaw } from "vue"
import { Search, Timer, Setting } from "@element-plus/icons-vue"
import request from "@/utils/axios"
import { ElMessageBox } from 'element-plus'


interface User {
    name: string
    email: string
    status: string
    createTime: string
    auth: string

}
const center = ref('center')
const tableHeight = ref(1000);
const statusValue = ref("");
const searchMember = ref("");
const deleteVisible = ref(false);
const authVisible = ref(false);
//用于存储表格中每一行的唯一标识，此处我使用邮件用于做唯一标识
const displaySetting = ref("");
//用于判断当前行是否为超级管理员
const isSuper = ref(false);
const options = [
    {
        value: '全部',
        label: '全部',
    },
    {
        value: '正常',
        label: '正常',
    },
    {
        value: '未激活',
        label: '未激活',
    },
]
//用于备份的数据
const tableData: User[] = reactive([
    {
        name: 'hhh1',
        email: "130237@163.com",
        status: "正常",
        createTime: '2020-09-08 12:00:00',
        auth: '超级管理员',
    },
])
//用于展示的表格数据
const filterData = reactive<Array<User>>([]);
//模态框中的下拉菜单的值
const options1Value = ref("");
const options1 = reactive<Array<{ value: string, label: string }>>([]);
const options2Value = ref("");
const options2 = [{ value: '管理员', label: "管理员" }, { value: "成员", label: "成员" }]
//根据搜索框内容计算
const searchData = computed(() => tableData.filter(
    (data) =>
        !searchMember.value ||
        data.name.toLowerCase().includes(searchMember.value.toLowerCase())
))
//点击搜索
const searchInput = () => {
    //将下拉选择框置为初始值
    statusValue.value = '全部'
    filterData.splice(0, filterData.length);
    searchData.value.forEach((person: User) => {
        filterData.push(toRaw(person))
    })
}
//下拉选择器 
const changeStatus = (value: string) => {
    //清空搜索框
    searchMember.value = '';
    filterData.splice(0, filterData.length);
    tableData.filter((per: User) => {
        if (value === '全部' || value === '') {
            return true;
        } else {
            return per.status === value;
        }
    }).forEach((per: User) => {
        filterData.push(toRaw(per));
    })
}
//当hover表中某个单元格时触发
const showSetting = (row: User) => {
    displaySetting.value = row.email;
}
onMounted(async () => {
    let { data } = await request({ method: 'post', url: 'https://www.fastmock.site/mock/321c19c8899dc6f3a3792b44f67a6fb3/api/teamlist' })
    filterData.push(toRaw(tableData[0]));
    for (let i = 0; i < 6; i++) {
        let obj = {
            ...data[i],
            status: i % 2 === 0 ? '正常' : '未激活',
            auth: "成员"
        }
        options1.push({ value: obj.name, label: obj.name });
        filterData.push(obj);
        tableData.push(obj);
    }
    let height = window.innerHeight / 10;
    tableHeight.value = (tableData.length + 1) * height - (height / 3);
})
const handleEdit = (index: number, row: User) => {
    console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
    console.log(index, row);
    deleteVisible.value = true;

}
</script>
<style lang="scss" scoped>
.all-member {
    >header {
        display: flex;
        justify-content: space-around;

        >:last-child {
            width: 20vw;
        }
    }

    >table {
        margin-top: 2vh;
        cursor: pointer;
        width: 100%;
    }

}

.pagination {
    display: flex;
    align-items: center;
    height: 10vh;
    flex-direction: row-reverse;

    >:first-child {
        transform: translateX(-3vw);
    }
}
.is-super-select{
    display:flex;
    flex-direction: column;
    height:15vh;
    justify-content: space-between;
}
.not-super-select {
    display: flex;
    flex-direction: column;
    height: 10vh;
    justify-content: space-between;
}
</style>