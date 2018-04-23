<template>
  <el-upload
    class="upload-demo"
    action="https://jsonplaceholder.typicode.com/posts/"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    multiple
    :limit="3"
    :on-exceed="handleExceed"
    :file-list="fileList">
    <el-button size="small" type="primary" class="el-button--success">导入</el-button>
    <!--<div slot="tip" class="el-upload__tip">只能上传.txt文件，且不超过500kb</div>-->
  </el-upload>
</template>

<script>
export default {
  name: 'fileImport',
  components: {
  },
  methods: {
    handleExceed: function () {
    }
  }
}
</script>

<style>
</style>
<!--
根组件，所有的子组件都将在这里被引用 -->
