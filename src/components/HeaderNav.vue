<template>
  <div class="head-lab">
    <!--<el-col :span="3">
      <span>{{department}}</span>
    </el-col>
    <el-col :span="21">
      <div>
      </div>
    </el-col>-->
    <div class="dep-name">
      <span>{{department}}</span>
    </div>
    <div class="login-emp">
      <img src="../assets/loginEmp.png"/>
      <span>{{loginEmp}}<!--<i class="el-icon-caret-bottom"></i>--></span>
      <el-dropdown>
        <span class="el-dropdown-link"><i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>修改密码</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'headerNav',
  data () {
    return {
      department: '惠税事业部',
      loginEmp: '张三'
    }
  }
}
</script>

<style scoped lang="scss">
.head-lab {
  $width: 100%;
  $height: 100%;
  width: $width;
  height: $height;
  border-bottom: solid 1px #e6e6e6;
  }
.dep-name {
  float: left;
  span {
    font-size: 16px;
    display: inline-block;
    margin: 13px 11px;
  }
  }
.login-emp {
  float: right;
  margin-right: 10px;
  img {
    width: 20px;
    height: 20px;
    margin-top: 15px;
  }
  span {
    position: relative;
    top: -5px;
    font-size: 16px;
  }
}
</style>
