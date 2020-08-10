import request from '@/utils/request'
import { exportFile } from '@/utils'
// 学校楼栋信息表

// 保存
// POST
// /school/building
export function createSchoolBuilding(data = {}) {
  return request({
    url: `/school/building`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /school/building
export function editSchoolBuilding(data = {}) {
  return request({
    url: `/school/building`,
    method: 'put',
    data
  })
}

// 楼栋导入模板下载
// GET
// /school/building/export/{excelType}
export function exportSchoolBuilding(params = {}) {
  const { excelType } = params
  exportFile(`/school/building/export/${excelType}`, params)
}

// 批量导入楼栋信息
// POST
// /school/building/import
export function importSchoolBuilding(data = {}) {
  return request({
    url: `/school/building/import`,
    method: 'post',
    dataType: 'uploadData',
    data
  })
}

// 学校-楼栋列表
// GET
// /school/building/list
export function getSchoolBuildingList(params = {}) {
  return request({
    url: `/school/building/list`,
    method: 'get',
    params
  })
}

// 分页
// GET
// /school/building/page
export function getSchoolBuildingPageList(params = {}) {
  return request({
    url: `/school/building/page`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /school/building/{id}
export function getSchoolBuildingById(params = {}) {
  const { id } = params
  return request({
    url: `/school/building/${id}`,
    method: 'get'
  })
}

// 删除
// DELETE
// /school/building/{id}
export function deleteSchoolBuilding(params = {}) {
  const { id } = params
  return request({
    url: `/school/building/${id}`,
    method: 'delete',
    params
  })
}
