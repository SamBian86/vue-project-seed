import request from '@/utils/request'

// 宿管管理

// 保存
// POST
// /building/worker
export function createBuildingWorker(data = {}) {
  return request({
    url: `/building/worker`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /building/worker
export function editBuildingWorker(data = {}) {
  return request({
    url: `/building/worker`,
    method: 'put',
    data
  })
}

// 分页
// GET
// /building/worker/page
export function getBuildingWorkerPageList(params = {}) {
  return request({
    url: `/building/worker/page`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /building/worker/{id}
export function getBuildingWorkerById(params = {}) {
  const { id } = params
  return request({
    url: `/building/worker/${id}`,
    method: 'get'
  })
}

// 删除
// DELETE
// /building/worker/{id}
export function deleteBuildingWorker(params = {}) {
  const { id } = params
  return request({
    url: `/building/worker/${id}`,
    method: 'delete',
    params
  })
}
