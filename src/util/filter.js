// 格式化时间：2018-03-22
export function formate (date) {
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  month = month < 10 ? '0' + month : month
  let day = date.getDate()
  day = day < 10 ? '0' + day : day
  let dateString = year + '-' + month + '-' + day
  return dateString
}

// 深克隆对象
export function deepClone (obj) {
  var o = obj instanceof Array ? [] : {}
  for (let k in obj) {
    o[k] = typeof obj[k] === Object ? deepClone(obj[k]) : obj[k]
  }
  return o
}

export default {
  Formate_DATE (date) {
    return formate(date)
  },
  Clone_Obj (obj) {
    return deepClone(obj)
  }
}
