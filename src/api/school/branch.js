import request from '@/utils/request'
import { exportFile } from '@/utils'
// 学院管理

// 列表
// GET
// /school/branch/list
export function getSchoolBranchList(params = {}) {
  return request({
    url: `/school/branch/list`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /school/branch/{id}
export function getSchoolBranchById(params = {}) {
  const { id } = params
  return request({
    url: `/school/branch/${id}`,
    method: 'get'
  })
}

// 保存
// POST
// /school/branch
export function createSchoolBranch(data = {}) {
  return request({
    url: `/school/branch`,
    method: 'post',
    data
  })
}

// 上下架
// PUT
// /school/branch/{id}/{display}
export function setSchoolBranchDisplay(params = {}) {
  const { id, display } = params
  return request({
    url: `/school/branch/${id}/${display}`,
    method: 'put',
    params
  })
}

// 修改
// PUT
// /school/branch
export function editSchoolBranch(data = {}) {
  return request({
    url: `/school/branch`,
    method: 'put',
    data
  })
}

// 学院导入模板下载
// GET
// /school/branch/export/{excelType}
export function exportSchoolBranch(params = {}) {
  const { excelType } = params
  exportFile(`/school/branch/export/${excelType}`, params)
}

// 批量导入楼栋信息
// POST
// /school/branch/import
export function importSchoolBranch(data = {}) {
  return request({
    url: `/school/branch/import`,
    method: 'post',
    dataType: 'uploadData',
    data
  })
}
