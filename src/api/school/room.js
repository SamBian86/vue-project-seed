import request from '@/utils/request'
import { exportFile } from '@/utils'
// 学校房间信息表

// 保存
// POST
// /school/room
export function createSchoolRoom(data = {}) {
  return request({
    url: `/school/room`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /school/room
export function editSchoolRoom(data = {}) {
  return request({
    url: `/school/room`,
    method: 'put',
    data
  })
}

// 房间导入模板下载
// GET
// /school/room/export/{excelType}
export function exportSchoolRoom(params = {}) {
  const { excelType } = params
  exportFile(`/school/room/export/${excelType}`, params)
}

// 批量导入房间信息
// POST
// /school/room/import
export function importSchoolRoom(data = {}) {
  return request({
    url: `/school/room/import`,
    method: 'post',
    dataType: 'uploadData',
    data
  })
}

// 分页
// GET
// /school/room/page
export function getSchoolRoomPageList(params = {}) {
  return request({
    url: `/school/room/page`,
    method: 'get',
    params
  })
}

// 楼层-宿舍列表
// GET
// /school/room/{floorId}/list
export function getSchoolRoomListByFloorId(params = {}) {
  const { floorId } = params
  return request({
    url: `/school/room/${floorId}/list`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /school/room/{id}
export function getSchoolRoomById(params = {}) {
  const { id } = params
  return request({
    url: `/school/room/${id}`,
    method: 'get'
  })
}

// 删除
// DELETE
// /school/room/{id}
export function deleteSchoolRoom(params = {}) {
  const { id } = params
  return request({
    url: `/school/room/${id}`,
    method: 'delete',
    params
  })
}
