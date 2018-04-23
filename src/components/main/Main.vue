<template>
  <div id="main">
    <el-container>
      <el-aside class="left-menu">
        <LeftMenu></LeftMenu>
      </el-aside>
      <el-container>
        <el-header class="head-nav">
          <HeaderNav></HeaderNav>
        </el-header>
        <el-main class="main-table">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HeaderNav from '@/components/HeaderNav'
import LeftMenu from '@/components/LeftMenu'
export default {
  name: 'Main',
  components: {
    HeaderNav,
    LeftMenu
  }
}
</script>

<style lang="scss">
$left: 216px;
$height: 50px;

.left-menu {
  width: $left !important;
}
.head-nav {
  padding: 0px;
  height: $height !important;
}
.main-table {
  overflow: hidden;
}
</style>
