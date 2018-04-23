<template>
  <el-row>
    <el-col :span="9">
      <el-select v-model="term" placeholder="请选择" size="small" clearable>
        <el-option
          v-for="item in searchItem"
          :key="Object.keys(item).join('')"
          :label="Object.values(item).join('')"
          :value="Object.keys(item).join('')">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="14" :offset="1">
      <el-input size="small" placeholder="请输入内容"  @keyup.enter.native="search" v-model="value">
        <i slot="suffix" class="el-input__icon el-icon-search" @click="search"></i>
      </el-input>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'search',
  props: {
    searchList: Array,
    searchItem: Array
  },
  data () {
    return {
      term: [],
      searchItems: [],
      value: '',
      selectedList: []
    }
  },
  created () {
    /* this.initSelected() */
  },
  methods: {
    initSelected: function () {
      let obj = this.searchList[0]
      this.searchItems = Object.keys(obj)
    },
    search: function () {
      this.selectedList = []
      let condition = this.term
      let array = this.searchList
      let value = this.value
      // 条件和值都存在，按条件查询； 条件不存在值存在，全部属性模糊查询； 条件存在值不存在，查询所有。
      if (condition && value) {
        this.searchByCondition(condition, array, value)
      } else if (value && (!condition || condition === '')) {
        this.fullMatch(array, value)
      } else {
        this.selectedList = array
      }
      this.notifyParent()
    },
    searchByCondition: function (condition, array, value) {
      var pattern = new RegExp(value)
      if (condition) {
        // 根据条件筛选元素
        for (let i = 0; i < array.length; i++) {
          let obj = array[i]
          if (pattern.test(obj[condition])) {
            this.selectedList.push(obj)
          }
        }
      } else {
      }
      /* this.notifyParent() */
      console.log(this.condition)
    },
    // 条件不存在值存在时，全匹配
    fullMatch: function (array, value) {
      var pattern = new RegExp(value)
      for (let i = 0; i < array.length; i++) {
        let obj = array[i]
        var str = Object.values(obj).join('-')
        console.log(str)
        if (pattern.test(str)) {
          this.selectedList.push(obj)
        } else {
        }
      }
    },
    notifyParent: function () {
      this.$emit('searchEmps', this.selectedList)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
