<template>
    <div class="list-wrap" ref="list" @scroll="scrollEvent($event)">
        <div class="list-height" :style="{'height': listHeight + 'px'}"></div>
        <div class="list-item-wrap" :style="{'transform': getTransform}">
            <!-- <div class="list-item">每一项</div> -->
            <!-- visibleData -->
            <div
                v-for="items in visibleData"
                :key="items.id"
                :style="{'height': itemSize + 'px'}"
                class="list-item"
            >{{items.value}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'home',
        data() {
            return {
                // 列表数据
                listData: [],
                // 列表每行高度
                itemSize: 200,
                // 可视区域高度
                screenHeight: 0,
                //偏移量
                startOffset: 0,
                //起始索引
                start: 0,
                //结束索引
                end: 0
            };
        },
        methods: {
            scrollEvent() {
                //当前滚动位置
                let scrollTop = this.$refs.list.scrollTop;
                //此时的开始索引
                this.start = Math.floor(scrollTop / this.itemSize);
                //此时的结束索引
                this.end = this.start + this.visibleCount;
                //此时的偏移量
                this.startOffset = scrollTop - (scrollTop % this.itemSize);
            }
        },
        created() {
            const total = 10000;
            let now = Date.now();
            for (let i = 0; i < total; i++) {
                let obj = {
                    id: i,
                    value: `这是第${i + 1}个数据`
                };
                this.listData.push(obj);
            }
            setTimeout(() => {
                console.log('总运行时间：', Date.now() - now);
            }, 0);
        },
        mounted() {
            this.screenHeight = window.innerHeight;
            console.log('可视区域高度：' + this.screenHeight);
            this.start = 0;
            this.end = this.start + this.visibleCount;
        },
        computed: {
            // 列表的总高度
            listHeight() {
                return this.listData.length * this.itemSize;
            },
            // 可是区域列表数
            visibleCount() {
                return Math.ceil(this.screenHeight / this.itemSize);
            },
            // 偏移相对的style
            getTransform() {
                return `translate3d(0,${this.startOffset}px,0)`;
            },
            //获取真实显示列表数据
            visibleData() {
                console.log(`
                    截取开始索引${this.start},
                    截取结束索引${this.end},
                `)
                return this.listData.slice(
                    this.start,
                    Math.min(this.end, this.listData.length)
                );
            }
        }
    };
</script>

<style>
.list-item {
    padding: 10px 0;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
}
.list-wrap{
    position: relative;
    height: 100vh;
    overflow: auto;
}
.list-item-wrap{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
}
</style>
