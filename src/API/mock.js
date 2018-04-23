// 引入mockjs
const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random
// mock一组数据
const produceNewsData = function () {
  let employees = []
  let telsArr = ['18321415211', '18321415211', '18345141211', '18323415214', '18321445211', '18321575211', '18321145211', '18321415286', '18321415287', '18321415288']
  let depsArr = ['销售部门', '研发部门', '人力资源部', '财务部', '总务部', '后勤部']
  let postArr = ['软件工程师', '需求工程师', '产品经理', '测试工程师', '人力资源', '财务助理']
  let statusArr = ['在职', '离职']
  for (let i = 0; i < 70; i++) {
    let newEmpObject = {
      no: Random.string('number', 4),
      department: Random.pick(depsArr),
      name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      linkTel: Random.pick(telsArr),
      status: Random.pick(statusArr),
      delState: '',
      address: Random.county(true),
      // code: Random.zip(), 生成邮编
      post: Random.pick(postArr),
      editFlag: false,
      // thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      /* date: Random.date() + ' ' + Random.time() */
      date: Random.date() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    }
    employees.push(newEmpObject)
  }

  return {
    employees: employees
  }
}

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/news/index', 'post', produceNewsData)
