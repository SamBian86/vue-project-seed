import request from '@/utils/request'

// 维修人员信息表

// 保存
// POST
// /maintenance/worker
export function createMaintenanceWorker(data = {}) {
  return request({
    url: `/maintenance/worker`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /maintenance/worker
export function editMaintenanceWorker(data = {}) {
  return request({
    url: `/maintenance/worker`,
    method: 'put',
    data
  })
}

// 删除
// DELETE
// /maintenance/worker
export function deleteMaintenanceWorker(data = []) {
  return request({
    url: `/maintenance/worker`,
    method: 'delete',
    data
  })
}

// 分页
// GET
// /maintenance/worker/page
export function getMaintenanceWorkerPageList(params = {}) {
  return request({
    url: `/maintenance/worker/page`,
    method: 'get',
    params
  })
}

// 生成维修码
// GET
// /maintenance/worker/qrcode
export function getMaintenanceWorkerQRcode() {
  return request({
    url: `/maintenance/worker/qrcode`,
    method: 'get'
  })
}

// 信息
// GET
// /maintenance/worker/{id}
export function getMaintenanceWorkerById(params = {}) {
  const { id } = params
  return request({
    url: `/maintenance/worker/${id}`,
    method: 'get'
  })
}
