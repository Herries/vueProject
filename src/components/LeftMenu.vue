<template>
  <div>
    <div class="sys-title">
      <img class="sy-icon" src="../assets/logo.png" alt="sysLogo" />
      <span class="sys-name" v-on:click="returnMain()">{{syName}}</span>
    </div>
    <div>
      <el-menu default-active="1-4-1" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
               active-text-color="#ffd04b" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">信息管理</span>
          </template>
          <el-menu-item-group>
            <!--<span slot="title">部门管理</span>-->
            <el-menu-item index="1-3" @click="go('/main/empList')">人员管理</el-menu-item>
            <el-menu-item index="1-1">部门管理</el-menu-item>
            <el-menu-item index="1-2">类别管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-document"></i>
          <span slot="title">考勤管理</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-tickets"></i>
          <span slot="title">合同管理</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">系统设置</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: 'left-menu',
  data () {
    return {
      syName: '税友职员管理系统',
      isCollapse: false
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    go (url) {
      this.$router.push(url)
    },
    returnMain () {
      this.$router.push('/main')
    }
  }
}
</script>

<style scoped lang="scss">
$sysHeight: 50px;
.sys-title {
  height: $sysHeight;
  width: 100%;
  background-color: rgba(204, 204, 204, 0.35);
}
.sy-icon {
  width: 20px;
  height: 20px;
  margin-top: 15px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  height: 100%;
  min-height: 618px;
}
.sys-name {
  position: relative;
  top: -5px;
  font-weight: bold;
  font-size: 16px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
</style>
