import request from '@/utils/request'

// 学校管理

// 分页
// GET
// /school/page
export function getSchoolPageList(params = {}) {
  return request({
    url: `/school/page`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /school/{id}
export function getSchoolById(params = {}) {
  const { id } = params
  return request({
    url: `/school/${id}`,
    method: 'get'
  })
}

// 保存
// POST
// /school
export function createSchool(data = {}) {
  return request({
    url: `/school`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /school
export function editSchool(data = {}) {
  return request({
    url: `/school`,
    method: 'put',
    data
  })
}

// 上下架
// PUT
// /school/{id}/{display}
export function setSchoolDisplay(params = {}) {
  const { id, display } = params
  return request({
    url: `/school/${id}/${display}`,
    method: 'put',
    params
  })
}
