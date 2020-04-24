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
