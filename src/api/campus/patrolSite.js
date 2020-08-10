import request from '@/utils/request'

// 巡更站点管理

// 保存
// POST
// /campus/patrol/site
export function createCampusPatrolSite(data = {}) {
  return request({
    url: `/campus/patrol/site`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /campus/patrol/site
export function editCampusPatrolSite(data = {}) {
  return request({
    url: `/campus/patrol/site`,
    method: 'put',
    data
  })
}

// 分页
// GET
// /campus/patrol/site/page
export function getCampusPatrolSitePageList(params = {}) {
  return request({
    url: `/campus/patrol/site/page`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /campus/patrol/site/{id}
export function getCampusPatrolSiteById(params = {}) {
  const { id } = params
  return request({
    url: `/campus/patrol/site/${id}`,
    method: 'get'
  })
}

// 删除
// DELETE
// /campus/patrol/site/{id}
export function deleteCampusPatrolSite(params = {}) {
  const { id } = params
  return request({
    url: `/campus/patrol/site/${id}`,
    method: 'delete',
    params
  })
}
