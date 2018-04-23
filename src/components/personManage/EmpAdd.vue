<template>
  <el-dialog title="新增人员信息" :visible.sync="dialogFormVisible" :show-close="showClose">
    <el-form :model="empForm" :rules="rules" ref="empForm" class="demo-ruleForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="员工编号" prop="no">
            <el-input v-model="empForm.no" clearable style="width: 68%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="员工姓名" prop="name">
            <el-input v-model="empForm.name" clearable style="width: 68%"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="所属部门" prop="department">
            <el-select v-model="empForm.department" placeholder="请选择所属部门">
              <el-option label="惠税事业部" value="惠税事业部"></el-option>
              <el-option label="地税事业部" value="地税事业部"></el-option>
              <el-option label="大数据事业部" value="大数据事业部"></el-option>
              <el-option label="人力资源部" value="人力资源部"></el-option>
              <el-option label="财务部" value="财务部"></el-option>
              <el-option label="总务部" value="总务部"></el-option>
              <el-option label="后勤部" value="后勤部"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所在岗位" prop="post">
            <el-select v-model="empForm.post" placeholder="请选择所属部门">
              <el-option label="软件工程师" value="软件工程师"></el-option>
              <el-option label="需求工程师" value="需求工程师"></el-option>
              <el-option label="产品经理" value="产品经理"></el-option>
              <el-option label="项目经理" value="项目经理"></el-option>
              <el-option label="人力资源" value="人力资源"></el-option>
              <el-option label="财务助理" value="财务助理"></el-option>
              <el-option label="运营专员" value="运营专员"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="入职日期" prop="date" style="width: 98%">
            <el-date-picker
              v-model="empForm.date"
              format="yyyy-MM-dd"
              style="width:70%;"
              type="date"
              placeholder="入职日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="员工状态" prop="status" style="width: 85%">
            <el-radio-group v-model="empForm.status">
              <el-radio label="在职"></el-radio>
              <el-radio label="离职"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="联系电话" prop="linkTel">
        <el-input v-model="empForm.linkTel" clearable style="width: 85%"></el-input>
      </el-form-item>
      <el-form-item label="联系地址" prop="address">
        <el-input v-model="empForm.address" clearable style="width: 85%"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('empForm')">保 存</el-button>
        <el-button @click="resetForm('empForm')">取 消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'emp-Add',
  props: [],
  data () {
    return {
      empForm: {
        no: '',
        name: '',
        department: '',
        post: '',
        linkTel: '',
        address: '',
        delState: '',
        status: '在职',
        date: new Date()
      },
      dialogFormVisible: true,
      showClose: false,
      rules: {
        no: [
          {required: true, message: '请输入编号', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
          {min: 2, max: 50, message: '姓名过长', trigger: 'blur'}
        ],
        date: [
          {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
        ],
        linkTel: [
          {required: true, message: '请输入号码', trigger: 'change'},
          {pattern: /^1[3|4|5|7|8|9][0-9]\d{8}$/, message: '号码格式不正确', trigger: 'change'}
        ],
        department: [
          {required: true, message: '请选择部门', trigger: 'change'}
        ],
        post: [
          {required: true, message: '请选择岗位', trigger: 'change'}
        ],
        address: [
          {required: true, message: '请填写联系地址', trigger: 'change'},
          {max: 200, message: '地址过长', trigger: 'change'}
        ],
        status: [
          {required: true, message: '请选择状态', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 通知父组件保存新增的人员信息
          this.$emit('newEmp', this.empForm)
          this.closeDialog()
          this.toRoute('/main/empList')
        } else {
          this.$message({
            message: '请先完善人员信息！',
            type: 'error'
          })
          return false
        }
      })
    },
    resetForm: function (formName) {
      this.$refs[formName].resetFields()
      this.closeDialog()
      this.$message({
        message: '已取消新增！'
      })
      this.toRoute('/main/empList')
    },
    closeDialog: function () {
      this.dialogFormVisible = false
    },
    toRoute: function (url) {
      this.$router.push(url)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
