<template >
    <div class="project-list">
        <el-table :data="data" style="width: 100%" :row-style="{ cursor: 'pointer' }">
            <el-table-column :align="center" label="项目">
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
            <el-table-column :align="center" label="项目ID">
                <template #default="scope">
                    <el-popover effect="light" trigger="hover" placement="bottom" width="auto" :show-after="500">
                        <template #default>
                            <div> {{ scope.row.id }}</div>
                        </template>
                        <template #reference>
                            <span>{{ scope.row.id }}</span>
                        </template>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column :align="center" label="状态">
                <template #default="scope">
                    <el-tag class="ml-2" type="success" :style="{ cursor: 'default' }">{{ scope.row.status }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column :align="center" label="查看者">
                <template #default="scope">
                    <el-popover effect="light" trigger="hover" placement="bottom" width="auto" :draggable="500">
                        <template #default>
                            <div> {{ scope.row.viewer.join("、") }}</div>
                        </template>
                        <template #reference>
                            <span>{{ scope.row.viewer.join("、") }}</span>
                        </template>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="创建时间">
                <template #default="scope">
                    <el-popover effect="light" trigger="hover" placement="bottom" width="auto" :show-after="500">
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
                        :style="{ color: 'rgb(255, 118, 38)' }" v-for="operation in scope.row.operations" :key="operation">
                        {{operation}}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script lang="ts">
export default {
    name: "MemberList"
}
</script>
<script lang="ts" setup>
interface projectlist {
    name: string
    id: string
    status: string
    viewer: string[]
    createTime: string
    operations: string[]
}
import { ref, reactive, watch } from "vue"
import { useRouter } from "vue-router";
const center = ref("center");
const router = useRouter();
const data = reactive<projectlist[]>([])
watch(router.currentRoute, (newValue) => {
    let { viewKey } = newValue.query;
    let arr = [
        {
            name: `hhh${viewKey}`,
            id: viewKey as string,
            status: "正常",
            viewer: ['kkk', 'lll'],
            createTime: '2020-09-08 12:00:00',
            operations: ['禁用', '迁移']
        },
    ]
    data.splice(0, data.length);
    arr.forEach(project => { data.push(project) });
}, { deep: true, immediate: true });
const handleDelete = (index: number, rowObj: Object) => {

}
</script>
<style lang="scss" scoped>
.project-list {}
</style>