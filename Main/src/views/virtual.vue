<template>
    <div class="list" @scroll="scrollHandle" ref="list">
        <div class="item" v-for="(item,index) in renderList" :key="index"  :style="`height:${itemHeight}px;line-height:${itemHeight}px;transform:translateY(${top}px)`">
          {{item}}
        </div>
    </div>
</template>
<script>
import throttle from '@/utils/throttle';
export default {
  name: 'App',
  data() {
    return {
      list:[],//完整列表
      itemHeight:60,//每一项的高度
      renderList:[],//需要渲染的列表
      start:0,//开始渲染的位置
      volume:0,//页面的容积:能装下多少个节点
      top:0,
      scroll,//用于初始化节流
    }
  },
  mounted() {
    this.initList();
    const cHeight=document.documentElement.clientHeight
    //计算页面能容纳下几个节点并且设置四个节点作为冗余
    this.volume=Math.ceil(cHeight/this.itemHeight)+4;
    //设置要渲染的列表 设置成能够容纳下的最大元素个数
    this.renderList=this.list.slice(0,this.volume);
    //初始化节流函数 最短50毫秒触发一次
    this.scroll=throttle(this.onScroll,50);
  },
  methods: {
    //初始化列表 ，循环渲染 500条
    initList(){
      for(let i=0;i<500;i++){
        this.list.push(i);
      }
    },
    scrollHandle(){
      this.scroll();
    },
    onScroll(){
      //scrollTop常量记录当前滚动的高度
      const scrollTop=this.$refs.list.scrollTop;

      const start=this.getCurStart(scrollTop);
      //对比上一次的开始节点 比较是否发生变化，发生变化后便重新渲染列表
      if(this.start!=start){
        //在这需要获得一个可以被itemHeight整除的数来作为item的偏移量
        const offsetY = scrollTop - (scrollTop % this.itemHeight);
        //使用slice拿到需要渲染的那一部分
        this.renderList=this.list.slice(start,this.start+this.volume);
        //这里的top用于设置translateY  transform:translateY(${top}px)
        this.top=offsetY;
      }
      this.start=start;
    },
    getCurStart(scrollTop){
      //卷去了多少个
      return Math.floor(scrollTop/(this.itemHeight));
    }
  },
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
.list{
  height: 100vh;
  overflow: scroll;
}
.item{
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid lightgray;
}
</style>
