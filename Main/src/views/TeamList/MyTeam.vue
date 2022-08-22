<template >
    <div class="my-team">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="成员列表" name="memberlist">
                <div class="member-list">
                    <MemberList />
                </div>
            </el-tab-pane>
            <el-tab-pane label="项目列表" name="projectlist">
                <div class="project-list">
                    <header>
                        <h1>项目列表(只有团队成员才能够看到团队下的项目)</h1>
                    </header>
                    <ProjectList />
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script lang="ts">
export default {
    name: "MyTeam"
}
</script>
<script lang="ts" setup>
import type { TabsPaneContext } from 'element-plus'
import { ref, reactive, onMounted, watch } from "vue"
import { useRouter } from "vue-router"
import { Search } from '@element-plus/icons-vue'
import MemberList from './MemberList.vue';
import ProjectList from './ProjectList.vue';
const router = useRouter();
const activeName = ref('memberlist')
const search = ref("");
const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}
</script>
<style lang="scss" scoped>
.member-list {
    margin-top: 5vh;

}

.project-list {
    margin-top: 8vh;
}


.demo-tabs {
    padding: 0 30px;
}

::v-deep .el-tabs__content {
    overflow: visible;
}

::v-deep .el-tabs__item {
    font-size: 22px;

    &:hover {
        color: rgb(255, 118, 38);
    }
}

::v-deep .el-tabs__item.is-active {
    color: rgb(255, 118, 38);
}

::v-deep .el-tabs__nav-wrap::after {
    height: 1px;
}

//tab的滑块样式
::v-deep .el-tabs__active-bar {
    background-color: rgb(255, 118, 38);
}
</style>