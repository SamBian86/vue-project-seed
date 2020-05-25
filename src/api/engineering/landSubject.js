import request from '@/utils/request'
import { exportFile } from '@/utils'

// 拿地预算

// 新增预算主题
// POST
// /engineering/land/subject
export function createEngineeringLandSubject(data = {}) {
  return request({
    url: `/engineering/land/subject`,
    method: 'post',
    data
  })
}

// 修改预算主题
// PUT
// /engineering/land/subject
export function editEngineeringLandSubject(data = {}) {
  return request({
    url: `/engineering/land/subject`,
    method: 'put',
    data
  })
}

// 新增预算明细
// POST
// /engineering/land/subject/detail
export function createEngineeringLandSubjectDetail(data = {}) {
  return request({
    url: `/engineering/land/subject/detail`,
    method: 'post',
    data
  })
}

// 修改预算明细
// PUT
// /engineering/land/subject/detail
export function editEngineeringLandSubjectDetail(data = {}) {
  return request({
    url: `/engineering/land/subject/detail`,
    method: 'put',
    data
  })
}

// 拿地预算明细导出
// GET
// /engineering/land/subject/detail/export/{id}/{excelType}
export function exportEngineeringLandSubjectDetail(params = {}) {
  const { id } = params
  const excelType = 2
  exportFile(`/engineering/land/subject/detail/export/${id}/${excelType}`, params)
}

// 预算明细导入模板下载
// GET
// /engineering/land/subject/export/{excelType}
export function downloadEngineeringLandSubject(params = {}) {
  const { excelType } = params
  exportFile(`/engineering/land/subject/export/${excelType}`, params)
}

// 预算明细导入
// POST
// /engineering/land/subject/import/{id}
export function importEngineeringLandSubject(data = {}) {
  const { id } = data
  return request({
    url: `/engineering/land/subject/import/${id}`,
    method: 'post',
    dataType: 'formData',
    data
  })
}

// 预算主题分页列表
// GET
// /engineering/land/subject/page
export function getEngineeringLandSubjectPageList(params = {}) {
  return request({
    url: `/engineering/land/subject/page`,
    method: 'get',
    params
  })
}

// 获取预算主题信息
// GET
// /engineering/land/subject/{id}
export function getEngineeringLandSubjectById(params = {}) {
  const { id } = params
  return request({
    url: `/engineering/land/subject/${id}`,
    method: 'get'
  })
}

// 删除预算主题
// DELETE
// /engineering/land/subject/{id}
export function deleteEngineeringLandSubject(data = {}) {
  const { id } = data
  return request({
    url: `/engineering/land/subject/${id}`,
    method: 'delete'
  })
}

// 获取预算明细信息
// GET
// /engineering/land/subject/{id}/detail/tree
export function getEngineeringLandSubjectDetailTree(params = {}) {
  const { id } = params
  return request({
    url: `/engineering/land/subject/${id}/detail/tree`,
    method: 'get'
  })
}

// 删除预算明细
// DELETE
// /engineering/land/subject/{id}/detail/{detailsId}
export function deleteEngineeringLandSubjectDetail(data = {}) {
  const { id, detailsId } = data
  return request({
    url: `/engineering/land/subject/${id}/detail/${detailsId}`,
    method: 'delete'
  })
}
