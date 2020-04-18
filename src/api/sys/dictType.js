import request from '@/utils/request'

// POST
// /sys/dict/type
// 保存
export function createDictType(data = {}) {
  return request({
    url: '/sys/dict/type',
    method: 'post',
    data
  })
}

// PUT
// /sys/dict/type
// 修改
export function editDictType(data = {}) {
  return request({
    url: '/sys/dict/type',
    method: 'put',
    data
  })
}

// DELETE
// /sys/dict/type
// 删除
export function deleteDictType(data = {}) {
  return request({
    url: '/sys/dict/type',
    method: 'delete',
    data
  })
}

// GET
// /sys/dict/type/{id}
// 信息
export function getDictTypeById(params = {}) {
  const { id } = params
  return request({
    url: `/sys/dict/type/${id}`,
    method: 'get',
    params
  })
}

// GET
// /sys/dict/type/all
// 所有字典数据
export function getDictTypeListAll(params = {}) {
  return request({
    url: `/sys/dict/type/all`,
    method: 'get',
    params
  })
}

// GET
// /sys/dict/type/page
// 字典类型
export function getDictTypeList(params = {}) {
  return request({
    url: `/sys/dict/type/page`,
    method: 'get',
    params
  })
}
