<template>

    <div class="team-list">
        <ul class="slide-bar">
            <li :style="isSelected ? { background: '#fff4ee',color:'rgb(255, 118, 38)'} : {}" :class="{ 'bg_color': !isSelected }"
                @click="shiftAllMember">全部成员</li>
            <li>
                <p>
                    我的团队
                    <el-icon @click="addTeam">
                        <CirclePlus />
                    </el-icon>
                </p>
                <ul class="my-team-list">
                    <li v-for="(obj, index) in myteams" :key="obj.id" @click="shiftMyTeam(index, obj.id)"
                        :class="{ ['bg_color']: current_index !== index }"
                        :style="current_index === index ? { background: '#fff4ee', color: '#ff7626' } : {}">
                        <small>
                            <el-icon>
                                <User />
                            </el-icon>
                        </small>
                        <small>{{ obj.content }}</small>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-content">
            <!-- 用于显示不同列表 -->
            <AllMembers v-show="showMain" />
            <MyTeam v-show="!showMain" />
        </div>
        <el-dialog v-model="centerDialogVisible" title="创建新团队" width="30%" center>
            <el-input v-model="newTeam" clearable />
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="centerDialogVisible = false">确认</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, provide } from 'vue'
import {
    CirclePlus,
    User,
} from '@element-plus/icons-vue'
import { Timer } from '@element-plus/icons-vue';
import AllMembers from "./AllMembers.vue";
import MyTeam from "./MyTeam.vue";
import { useRouter } from "vue-router";
const newTeam = ref("");
const centerDialogVisible = ref(false);
const current_index = ref(-1);
const isSelected = ref(true);
const myteams = reactive([{ id: 1, content: "团队一" }, { id: 2, content: "团队二" }, { id: 3, content: "团队三" }, { id: 4, content: "团队四" }]);
const router=useRouter();
//用于控制显示内容的切换
const showMain = ref(true);
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const addTeam = () => {
    centerDialogVisible.value = true;
}
const shiftMyTeam = (index: number, id: number) => {
    current_index.value = index;
    isSelected.value = false;
    showMain.value = false;
    router.push(`/teamlist?viewKey=${id}`);
}
const shiftAllMember = () => {
    current_index.value = -1;
    isSelected.value = true;
    showMain.value = true;
    router.push(`/teamlist?viewKey=all`);
}
</script>
<style lang="scss" scoped>
@mixin div-center() {
    display: flex;
    justify-content: center;
    align-items: center;
}

* {
    font-family: 'Microsoft yahei', Courier, monospace;
}

.team-list {
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 5fr;
    overflow-x: hidden;
}

.slide-bar {
    grid-column: 1/2;
    width: calc(1/6*100vw);
    display: flex;
    flex-direction: column;
    font-size: 18px;
    text-indent: 10px;
    cursor: pointer;
    position: fixed;
    top: 0;
    left: 0;

    >:first-child {
        height: 10vh;
        display: flex;
        align-items: center;
    }

    >:nth-child(2) {
        >p {
            height: 10vh;
            display: flex;
            align-items: center;
            justify-content: space-between;

            >:first-child {
                transform: translateX(-1vw);
            }
        }
    }

}

.list-content {
    grid-column: 2/7;
    padding-top: 1vw;
    border-top: 10px solid #F0F2F5;
    border-left: 10px solid #F0F2F5;
}

.my-team-list {
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-rows: 50px;

    >li {
        height: 50px;
        @include div-center();
    }
}

.bg_color {
    &:hover {
        background: #CDD0D6;
    }
}
</style>
