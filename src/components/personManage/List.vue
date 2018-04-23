<template>
  <div>
    <prompt-component msg="提示：双击单行进行编辑操作，暂未实现导入功能！"></prompt-component>
    <div class="list">
        <router-view @newEmp="saveEmp"></router-view>
      <el-row class="list-operator">
        <el-col :span="6">
          <el-button class="el-button--primary" @click="addEmp()">新增</el-button>
          <el-button class="el-button--success" disabled>导入</el-button>
         <!-- <file-import></file-import>-->
          <el-button class="el-button--danger" v-on:click="deleteSelected()" :disabled="delDisabled">删除</el-button>
        </el-col>
        <el-col :span="6" :offset="12">
          <search :searchList="allEmpListShow" :searchItem="searchItems" @searchEmps="searchEmp"></search>
        </el-col>
      </el-row>
      <el-table
        ref="empsTable"
        :data="currentListShow"
        tooltip-effect="dark"
        v-loading="loading2"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        stripe
        style="width: 100%;border: 1px solid #ddd;margin-top: 10px;min-height: 400px;"
        max-height="480"
        text-color="#fff"
        :default-sort = "{prop: 'date', order: 'descending'}"
        @row-dblclick="updateRow"
        @selection-change="handleSelectionChange"
        @cell-mouse-enter="showDetail"
        @cell-mouse-leave="hideDetail">
        <el-table-column
          type="selection"
          width="30">
        </el-table-column>
        <el-table-column
          prop="no"
          label="编号"
          fixed
          width="100">
        </el-table-column>
        <el-table-column
          label="姓名"
          fixed
          width="100">
          <template slot-scope="scope">
            <template v-if="scope.row.editFlag">
              <el-input v-model="scope.row.name" placeholder="请输入内容"></el-input>
            </template>
            <template v-else>
              <span>{{ scope.row.name }}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          label="入职日期"
          sortable
          :order="listOrder"
          width="210">
          <template slot-scope="scope">
            <template v-if="scope.row.editFlag">
              <el-date-picker
                v-model="scope.row.date"
                format="yyyy-MM-dd"
                style="width:70%;"
                type="date"
                placeholder="入职日期">
              </el-date-picker>
            </template>
            <template v-else>
              <span>{{ scope.row.date }}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          label="部门"
          width="150">
          <template slot-scope="scope">
            <template v-if="scope.row.editFlag">
              <el-select v-model="scope.row.department" placeholder="请选择所属部门">
                <el-option label="销售部门" value="地税事业部"></el-option>
                <el-option label="研发部门" value="大数据事业部"></el-option>
                <el-option label="人力资源部" value="人力资源部"></el-option>
                <el-option label="财务部" value="财务部"></el-option>
                <el-option label="总务部" value="总务部"></el-option>
                <el-option label="后勤部" value="后勤部"></el-option>
              </el-select>
            </template>
            <template v-else>
              <span>{{ scope.row.department }}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          label="岗位"
          width="150">
          <template slot-scope="scope">
            <template v-if="scope.row.editFlag">
              <el-select v-model="scope.row.post" placeholder="请选择所在岗位">
                <el-option label="软件工程师" value="软件工程师"></el-option>
                <el-option label="需求工程师" value="需求工程师"></el-option>
                <el-option label="产品经理" value="产品经理"></el-option>
                <el-option label="测试工程师" value="测试工程师"></el-option>
                <el-option label="人力资源" value="人力资源"></el-option>
                <el-option label="财务助理" value="财务助理"></el-option>
              </el-select>
            </template>
            <template v-else>
              <span>{{ scope.row.post }}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          prop="linkTel"
          label="联系电话"
          width="130">
          <template slot-scope="scope">
            <template v-if="scope.row.editFlag">
              <el-input v-model="scope.row.linkTel" placeholder="请输入联系电话"></el-input>
            </template>
            <template v-else>
              <span>{{ scope.row.linkTel }}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          :filters="[{ text: '在职', value: '在职' }, { text: '离职', value: '离职' }]"
          :filter-method="filterHandler"
          width="80">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <template v-if="scope.row.editFlag">
              <i class="el-icon-check edit-save-icon" @click="saveUpdate(scope.row)" title="保存"></i>
              <i class="el-icon-close edit-cancel-icon" @click="cancelUpdate(scope.row)" title="撤销"></i>
            </template>
            <template v-else>
              <el-tooltip placement="top" effect="light">
                <div slot="content">联系人地址：{{scope.row.address}}</div>
                <el-button type="text" size="small"><span>更多</span></el-button>
              </el-tooltip>
              <el-button type="text" size="small" @click="deleteOneEmp(scope.row)"><span>删除</span></el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPageDef"
        :page-sizes="[5, 10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        v-bind:total="totalNum">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import api from '../../API/api.js'
import filter from '../../util/filter.js'
import search from '../Search.vue'
import FileImport from '../FileImport.vue'
export default {
  name: 'list',
  data () {
    return {
      currentPageDef: 1, // 当前页数
      loading2: true, // 异步遮罩框：加载中
      allEmpListShow: [], // 所有人员的数组，除了删除和新增，其他操作不能更改该数组
      newsListShow: [], // 所有待展示人员的数组
      currentListShow: [], // 当前页展示人员的数组
      /* searchListShow: [], // 满足搜索条件的人员数组 */
      pageSize: 5, // 每页展示的条数
      totalNum: 0, // 人员总数
      dialogFormVisible: false,
      listOrder: 'descending',
      delDisabled: true, // 是否禁用批量删除的按钮
      searchItems: [{no: '编号'}, {name: '姓名'}, {date: '入职日期'}, {department: '部门'}, {post: '岗位'}, {linkTel: '联系电话'}, {status: '状态'}, {address: '地址'}],
      multipleSelection: [], // 被选中人员的数组
      currentEmp: {}, // 保存当前编辑对象
      isEdit: true
    }
  },
  components: {
    search,
    FileImport,
    'prompt-component': {
      template: '<h1 class="prompt-title">{{msg}}</h1>',
      props: {
        msg: String
      },
      date: function () {
        return {
        }
      }
    }
  },
  // 先导航和渲染组件，然后在组件的 created 钩子中获取数据
  // 组件创建完后获取数据，
  created () {
    this.getData()
  },
  // 挂载完毕
  mounted () {
    this.prompt()
  },
  methods: {
    getData: function () {
      api.GET_Employees('/news/index', 'type=top&key=123456')
        .then(res => {
          this.allEmpListShow = res.employees
          this.newsListShow = res.employees
          console.log(this.allEmpListShow)
          console.log(this.newsListShow)
          this.getShowDate()
          this.totalNum = this.newsListShow.length
          this.loading2 = false
        })
    },
    getShowDate: function () {
      let arr = this.newsListShow
      let startIndex = this.pageSize * (this.currentPageDef - 1)
      let endIndex = this.pageSize * this.currentPageDef
      this.currentListShow = arr.slice(startIndex, endIndex)
    },
    searchEmp: function (data) {
      this.refreshTable(data)
    },
    addEmp: function () {
      this.$router.push('empList/add')
    },
    saveEmp: function (emp) {
      // 格式化时间
      emp.date = filter.Formate_DATE(emp.date)
      // 展示添加的数据
      this.totalNum = this.allEmpListShow.unshift(emp)
      this.refreshTable(this.allEmpListShow)
      // 调用接口保存新人员信息
      this.successPrompt('恭喜您，人员新增成功！')
      this.dialogFormVisible = false
    },
    deleteSelected: function () {
      var selectedEmps = this.multipleSelection
      if (selectedEmps.length > 0 && selectedEmps) {
        this.deleteEmployee(this.allEmpListShow, selectedEmps)
      }
    },
    deleteOneEmp: function (row) {
      if (row) {
        let rowArr = [row]
        console.log(rowArr)
        this.deleteEmployee(this.allEmpListShow, rowArr)
      }
    },
    deleteEmployee: function (allEmpList, emps) {
      this.$confirm('此操作将永久删除人员, 不可恢复，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        allEmpList = this.deleteOperate(allEmpList, emps)
        this.allEmpListShow = allEmpList
        console.log(allEmpList)
        this.refreshTable(allEmpList)
        this.successPrompt('删除成功！')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 把选择被删除的人从数组中删除
    deleteOperate: function (empList, delList) {
      if (empList.length === delList.length) {
        empList.length = 0
      } else {
        // 给要删除的人员添加删除标志
        for (let i = 0; i < delList.length; i++) {
          delList[i].delState = '删除'
        }
        // 删除标志的对象
        var residue = []
        for (let i = 0; i < empList.length; i++) {
          if (empList[i].delState !== '删除') {
            residue.push(empList[i])
          } else {
          }
        }
        empList = residue
      }
      return empList
    },
    // 双击编辑当前行
    updateRow: function (row) {
      if (this.isEdit) {
        this.currentEmp = filter.Clone_Obj(row)
        row.editFlag = true
        this.isEdit = false
      }
    },
    // 保存编辑
    saveUpdate: function (row) {
      // 验证编辑的信息
      if (this.validInfo(row)) {
        // 格式化时间
        if (row.date instanceof Date) {
          row.date = filter.Formate_DATE(row.date)
        }
        // 保存编辑的结果
        row.editFlag = false
        this.isEdit = true
        this.successPrompt('保存成功！')
      } else {
      }
      console.log(this.allEmpListShow)
    },
    validInfo: function (empInfo) {
      var telReg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (empInfo.name && empInfo.date && empInfo.department && empInfo.post && empInfo.linkTel) {
        if (!telReg.test(empInfo.linkTel)) {
          this.errorPrompt('联系电话格式错误，请修改后重新提交！')
          return false
        } else {
          return true
        }
      } else {
        this.errorPrompt('信息填写不完整，请完善后重新提交！')
        return false
      }
    },
    errorPrompt: function (msg) {
      this.$message.error(msg)
    },
    successPrompt: function (msg) {
      this.$message({
        type: 'success',
        message: msg
      })
    },
    // 取消编辑
    cancelUpdate: function (row) {
      let saveEmp = this.currentEmp
      // 循环数组，撤销操作(待改进)
      let list = this.allEmpListShow
      for (let i = 0; i < list.length; i++) {
        if (list[i].no === row.no) {
          for (let item in list[i]) {
            row[item] = saveEmp[item]
          }
          break
        }
      }
      this.isEdit = true
      row.editFlag = false
      this.$message({
        type: 'info',
        message: '已取消编辑！'
      })
      console.log(this.allEmpListShow)
    },
    refreshTable: function (refreshList) {
      this.totalNum = refreshList.length
      this.newsListShow = refreshList
      this.currentPageDef = 1
      this.getShowDate()
      console.log(this.newsListShow)
    },
    handleSelectionChange (val) {
      console.log(val)
      this.multipleSelection = val
      if (val.length > 0) {
        this.delDisabled = false
      } else {
        this.delDisabled = true
      }
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.getShowDate()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPageDef = val
      this.getShowDate()
    },
    filterHandler: function (value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    prompt: function () {
      this.$message({
        showClose: true,
        message: '双击单行编辑，一次只能编辑一行；先选择删除人员才能进行批量删除操作！',
        duration: 5000
      })
    },
    showDetail: function () {
    },
    hideDetail: function () {
    }
  },
  computed: {
  }
}
</script>

<!--scoped表示当前样式只作用于当前组件的节点-->
<style scoped lang="scss">
button {
  span{
    color: rgb(65,183,131);
  }
}
.list-operator {
  button {
    font-size: 18px;
  }
}
.edit-icon {
  font-size: 26px;
}
.edit-cancel-icon{
  color: #f56c6c;
  @extend .edit-icon;
}
.edit-save-icon {
  color: #67c23a;
  position: relative;
  left: -11px;
  @extend .edit-icon;
}
.prompt-title {
  font-weight: 300;
  font-size: 12px;
  color: #f78989;
}
</style>
