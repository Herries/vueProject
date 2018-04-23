<template>
  <el-carousel :interval="4000" type="card" height="350px">
    <el-carousel-item v-for="item in carValues" :key="item">
      <img :src="item" class="car-img" alt="活动图片" />
      <!--<h3>{{ item }}</h3>-->
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: 'carousel',
  components: {
  },
  data () {
    return {
      carValues: ['../static/image/001.jpg', '../static/image/002.jpg', '../static/image/003.jpg', '../static/image/004.jpg'],
      imgList: []
    }
  },
  mounted () {
    this.onload()
  },
  methods: {
    onload () {
      /* this.imgList = [{url: require（'.assert/1.jpg')}, {url:'./assets/2.jpg'}] */
    }
  }
}
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  .car-img {
    width: 100%;
    height: 100%;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
