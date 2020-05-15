/**
 * URL地址
 * @param {*} s
 */
export function isURL(s) {
  return /^http[s]?:\/\/.*/.test(s)
}

// 检查是否有值
export function validateEmptyList(list) {
  let empty = true
  const obj = list.length !== 0 ? list[0] : []
  list.map(item => {
    Object.keys(obj).map(ite => {
      if (item[ite] === '' || item[ite] === null) {
        empty = false
      }
    })
  })
  return empty
}

// 检查手机号
export function validateMobileNumber(mobile) {
  return /^1[0-9]{10}$/.test(mobile)
}

// 检查邮箱
export function validateEmailAddress(email) {
  return /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(email)
}
