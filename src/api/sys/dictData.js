import request from '@/utils/request'
// 字典数据
// 保存
// POST
// /sys/dict/data
export function createDictData(data = {}) {
  return request({
    url: `/sys/dict/data`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /sys/dict/data
export function editDictData(data = {}) {
  return request({
    url: `/sys/dict/data`,
    method: 'put',
    data
  })
}

// 删除
// DELETE
// /sys/dict/data
export function deleteDictData(data = []) {
  return request({
    url: `/sys/dict/data`,
    method: 'delete',
    data
  })
}

// 字典数据分页列表
// GET
// /sys/dict/data/page
export function getDictDataList(params = {}) {
  return request({
    url: `/sys/dict/data/page`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /sys/dict/data/{id}
export function getDictDataById(params = {}) {
  const { id } = params
  return request({
    url: `/sys/dict/data/${id}`,
    method: 'get'
  })
}
