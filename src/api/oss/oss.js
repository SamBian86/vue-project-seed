import request from '@/utils/request'

// 文件上传

// 保存云存储配置信息
// POST
// /oss/file
export function saveOssFileConfig(data = {}) {
  return request({
    url: `/oss/file`,
    method: 'post',
    data
  })
}

// 删除
// DELETE
// /oss/file
export function deleteOssFile(data = []) {
  return request({
    url: `/oss/file`,
    method: 'delete',
    data
  })
}

// 云存储配置信息
// GET
// /oss/file/info
export function getOssFileInfo() {
  return request({
    url: `/oss/file/info`,
    method: 'get'
  })
}

// 分页
// GET
// /oss/file/page
export function getOssFilePage(params = {}) {
  return request({
    url: `/oss/file/page`,
    method: 'get',
    params
  })
}

// 上传文件
// POST
// /oss/file/upload
export function uploadOssFile(data = {}) {
  return request({
    url: `/oss/file/upload`,
    method: 'post',
    data
  })
}
