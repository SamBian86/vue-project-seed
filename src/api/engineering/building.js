import request from '@/utils/request'

// 楼栋管理

// 保存
// POST
// /engineering/building
export function createEngineeringBuilding(data = {}) {
  return request({
    url: `/engineering/building`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /engineering/building
export function editEngineeringBuilding(data = {}) {
  return request({
    url: `/engineering/building`,
    method: 'put',
    data
  })
}

// 删除
// DELETE
// /engineering/building
export function deleteEngineeringBuilding(data = []) {
  return request({
    url: `/engineering/building`,
    method: 'delete',
    data
  })
}

// 列表，子部门权限过滤
// GET
// /engineering/building/list
export function getEngineeringBuildingListAll(params = {}) {
  return request({
    url: `/engineering/building/list`,
    method: 'get',
    params
  })
}

// 分页，子部门权限过滤
// GET
// /engineering/building/page
export function getEngineeringBuildingPageList(params = {}) {
  return request({
    url: `/engineering/building/page`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /engineering/building/{id}
export function getEngineeringBuildingById(params = {}) {
  const { id } = params
  return request({
    url: `/engineering/building/${id}`,
    method: 'get'
  })
}
