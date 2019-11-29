<template>
  <!--用于无限循环导航-->
  <!--引用自身来实现无限循环，所以样式不太可控-->
  <div v-if="item.child" class="sub-menu-box">
    <template v-if="item.child.length === 0">
      <el-menu-item :index="JSON.stringify(item)">{{item.menu_name}}</el-menu-item>
    </template>
    <el-submenu v-else :index="JSON.stringify(item)">
      <template slot="title" >{{item.menu_name}}</template>
      <template v-for="subChild in item.child">
        <sub-menu-item v-if="subChild.child && subChild.child.length > 0" :item="subChild" :key="subChild.menu_name + '_' + subChild.track_id"/>
        <el-menu-item v-else :key="subChild.menu_name + '_' + subChild.track_id" :index="JSON.stringify(subChild)">
          {{subChild.menu_name}}
        </el-menu-item>
      </template>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'sub-menu-item',
  props: {
    item: {
      type: Object,
      default: function () {
        return {}
      }
    }
  }
}
</script>
<style>
  .el-menu--popup{
    min-width: 160px;
  }
  .el-submenu .el-menu-item{
    min-width: 160px;
  }
</style>
<style scoped>
  .sub-menu-box >>> .el-submenu .el-submenu__title .el-submenu__icon-arrow{
    right: 0;
  }
</style>
