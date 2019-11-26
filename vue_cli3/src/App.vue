<template>
    <div id="app">
        <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view /> -->

        <!-- 布局1 flex -->
        <!-- <div class="masonry">
            <div class="colmun">
                <img
                    class="item"
                    :src="i.img"
                    :key="i.id"
                    v-for="i in data1"
                >
            </div>
            <div class="colmun">
                <img
                    class="item"
                    :src="i.img"
                    :key="i.id"
                    v-for="i in data2"
                >
            </div>
            <div class="colmun">
                <img
                    class="item"
                    :src="i.img"
                    :key="i.id"
                    v-for="i in data3"
                >
            </div>
        </div> -->

        <div class="masonry">
            <div
                class="item"
                :key="i.id"
                v-for="i in data"
            >
                <img :src="i.img">
                <span class="title">{{i.value}}</span>
            </div>
        </div>
    </div>
</template>
<script>
    import data from './assets/data.json';
    export default {
        data() {
            let data1 = [], //第一列
                data2 = [], //第二列
                data3 = [], //第三列
                i = 0;

            while (i < data.length) {
                data1.push(data[i++]);
                if (i < data.length) {
                    data2.push(data[i++]);
                }
                if (i < data.length) {
                    data3.push(data[i++]);
                }
            }
            return {
                data,
                data1,
                data2,
                data3
            };
        }
    };
</script>
<style>
/* flex */
/* .masonry {
    display: flex;
    flex-direction: row;
}
.masonry .colmun {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 0 2px;
}
.masonry .colmun .item {
    margin-bottom: 5px;
    width: 100%;
} */

.masonry {
    column-count: 3;
    column-gap: 10px;
    padding: 10px;
}
.masonry .item {
    /* break-inside: avoid; */
    border: 1px solid #999;
    margin-bottom: 10px;
}
.masonry .item img {
    width: 100%;
    vertical-align: middle;
}
.masonry .item .title {
    display: block;
    margin-left: 5px;
}
</style>
