<template>
    <div class="map-container">
        <div id="cutout-map"></div>
        <div class="ceng">
            {{zoom}}
        </div>
    </div>
</template>
<script>
    /* eslint-disable */
    export default {
        name: 'cutout-bmap',
        data() {
            return {
                // 地图实例
                map: null,
                zoom: 13
            };
        },
        created() {},
        mounted() {
            this.map = new BMap.Map('cutout-map', {
                minZoom: 9,
                maxZoom: 18,
                enableMapClick: false
            });
            this.init();
        },
        methods: {
            // 初始化显示地图
            init() {
                this.map.centerAndZoom('北京', this.zoom);
                this.map.enableScrollWheelZoom();
                // 加入滚动监听
                this.map.addEventListener('zoomend', () => {
                    this.zoom = this.map.getZoom();
                });
            },
            exportBmap() {}
        }
    };
</script>

<style lang="less" scoped>
.map-container,
#cutout-map {
    width: 100%;
    height: 100%;
}
.map-container {
    .ceng {
        position: fixed;
        z-index: 99;
        width: 50px;
        height: 50px;
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        text-align: center;
        line-height: 50px;
        left: 50px;
        bottom: 30px;
        font-weight: 600;
        font-size: 20px;
    }
}
</style>