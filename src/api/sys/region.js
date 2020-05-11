import request from '@/utils/request'

// 行政区域

// 保存
// POST
// /sys/region
export function createRegion(data = {}) {
  return request({
    url: `/sys/region`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /sys/region
export function editRegion(data = {}) {
  return request({
    url: `/sys/region`,
    method: 'put',
    data
  })
}

// 列表
// GET
// /sys/region/list
export function getRegionList(params = {}) {
  return request({
    url: `/sys/region/list`,
    method: 'get',
    params
  })
}

// 地区列表
// GET
// /sys/region/region
export function getRegionByLevel(params = {}) {
  return request({
    url: `/sys/region/region`,
    method: 'get',
    params
  })
}

// 树形数据
// GET
// /sys/region/tree
export function getRegionTree(params = {}) {
  return request({
    url: `/sys/region/tree`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /sys/region/{id}
export function getRegionById(params = {}) {
  const { id } = params
  return request({
    url: `/sys/region/${id}`,
    method: 'get'
  })
}

// 删除
// DELETE
// /sys/region/{id}
export function deleteRegionById(params = {}) {
  const { id } = params
  return request({
    url: `/sys/region/${id}`,
    method: 'delete'
  })
}
