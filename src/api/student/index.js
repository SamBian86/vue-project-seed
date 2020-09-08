import request from '@/utils/request'
// 学生管理

// 保存
// POST
// /student
export function createStudent(data = {}) {
  return request({
    url: `/student`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /student
export function editStudent(data = {}) {
  return request({
    url: `/student`,
    method: 'put',
    data
  })
}

// 学生导入模板下载
// GET
// /student/export/{excelType}
export function exportStudent(params = {}) {
  const { excelType } = params
  return request({
    url: `/student/export/${excelType}`,
    method: 'get',
    responseType: 'blob',
    params
  })
}

// 批量导入学生信息
// POST
// /student/import
export function importStudent(data = {}) {
  return request({
    url: `/student/import`,
    method: 'post',
    dataType: 'uploadData',
    data
  })
}

// 分页
// GET
// /student/page
export function getStudentPageList(params = {}) {
  return request({
    url: `/student/page`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /student/{id}
export function getStudentById(params = {}) {
  const { id } = params
  return request({
    url: `/student/${id}`,
    method: 'get'
  })
}

// 删除
// DELETE
// /student/{id}
export function deleteStudent(params = {}) {
  const { id } = params
  return request({
    url: `/student/${id}`,
    method: 'delete',
    params
  })
}
