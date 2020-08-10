import request from '@/utils/request'
import { exportFile } from '@/utils'
// 楼栋楼层信息表

// 保存
// POST
// /school/floor
export function createSchoolFloor(data = {}) {
  return request({
    url: `/school/floor`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /school/floor
export function editSchoolFloor(data = {}) {
  return request({
    url: `/school/floor`,
    method: 'put',
    data
  })
}

// 楼层导入模板下载
// GET
// /school/floor/export/{excelType}
export function exportSchoolFloor(params = {}) {
  const { excelType } = params
  exportFile(`/school/floor/export/${excelType}`, params)
}

// 批量导入楼层信息
// POST
// /school/floor/import
export function importSchoolFloor(data = {}) {
  return request({
    url: `/school/floor/import`,
    method: 'post',
    dataType: 'uploadData',
    data
  })
}

// 分页
// GET
// /school/floor/page
export function getSchoolFloorPageList(params = {}) {
  return request({
    url: `/school/floor/page`,
    method: 'get',
    params
  })
}

// 楼栋-楼层列表
// GET
// /school/floor/{buildingId}/list
export function getSchoolFloorListByBuildingId(params = {}) {
  const { buildingId } = params
  return request({
    url: `/school/floor/${buildingId}/list`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /school/floor/{id}
export function getSchoolFloorById(params = {}) {
  const { id } = params
  return request({
    url: `/school/floor/${id}`,
    method: 'get'
  })
}

// 删除
// DELETE
// /school/floor/{id}
export function deleteSchoolFloor(params = {}) {
  const { id } = params
  return request({
    url: `/school/floor/${id}`,
    method: 'delete',
    params
  })
}
