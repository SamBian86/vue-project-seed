import request from '@/utils/request'
import { exportFile } from '@/utils'

// 施工图预算

// 修改预算主题
// PUT
// /engineering/draw/subject
export function editEngineeringDrawSubject(data = {}) {
  return request({
    url: `/engineering/draw/subject`,
    method: 'put',
    data
  })
}

// 修改预算
// PUT
// /engineering/draw/subject/detail
export function editEngineeringDrawSubjectDetail(data = {}) {
  return request({
    url: `/engineering/draw/subject/detail`,
    method: 'put',
    data
  })
}
// 施工图预算明细导出
// GET
// /engineering/draw/subject/detail/export/{id}/{excelType}
export function exportEngineeringDrawSubjectDetail(params = {}) {
  const { id } = params
  const excelType = 2
  exportFile(`/engineering/draw/subject/detail/export/${id}/${excelType}`, params)
}

// 成本表差异导出
// GET
// /engineering/draw/subject/difference/export/{id}/{excelType}
export function exportEngineeringDrawSubjectDifference(params = {}) {
  const { id } = params
  const excelType = 2
  exportFile(`/engineering/draw/subject/difference/export/${id}/${excelType}`, params)
}

// 施工图预算明细导入
// POST
// /engineering/draw/subject/import/{id}
export function importEngineeringDrawSubject(data = {}) {
  const { id } = data
  return request({
    url: `/engineering/draw/subject/import/${id}`,
    method: 'post',
    dataType: 'formData',
    data
  })
}

// 预算主题分页列表
// GET
// /engineering/draw/subject/page
export function getEngineeringDrawSubjectPageList(params = {}) {
  return request({
    url: `/engineering/draw/subject/page`,
    method: 'get',
    params
  })
}

// 获取预算主题信息（含预算明细）
// GET
// /engineering/draw/subject/{id}
export function getEngineeringDrawSubjectById(params = {}) {
  const { id } = params
  return request({
    url: `/engineering/draw/subject/${id}`,
    method: 'get'
  })
}
