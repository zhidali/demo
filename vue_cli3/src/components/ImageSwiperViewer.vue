<template>
<!--
    url：图片url
    urlList：预览图片数组
    ids：当前图片索引值
-->
<div class="img-wrap">
  <el-image ref="imageCnt" class="image-main" @click.stop="previewing" :src="url" :preview-src-list="curUrlList" :z-index="30000"></el-image>
</div>
</template>
<script>
  export default {
    name: 'ImageSwiperViewer',
    props: ['url', 'urlList', 'ids'],
    data() {
      return {
        body:''
      }
    },
    mounted(){
      this.body = document.getElementsByTagName('body')[0] || doucumnet.body 
    },
    computed: {
      curUrlList() {
        let arr = []
        let lenIds = this.urlList.length
        this.urlList.forEach((val,ids)=>{
          let _ids = ids - Number(this.ids) < 0 ? lenIds + ids - Number(this.ids):ids - Number(this.ids)
          arr[_ids] = val
        })
        return arr
      }
    },
    methods: {
      previewing(){
        this.body.style.overflow='hidden'
        this.$refs.imageCnt.closeViewer = this.newCloseEvent
      },
      newCloseEvent(){
        this.body.style.overflow='auto'
        this.$refs.imageCnt.showViewer = false
      }
    }
  }
</script>
<style scoped>
.img-wrap{
  width: 100%;
}
.image-main{
  width: 100%
}
.image-main >>> .el-icon-circle-close{
  color:#fff;
}
</style>