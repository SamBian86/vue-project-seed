import request from '@/utils/request'

// 短信日志

// 删除
// DELETE
// /message/smslog
export function deleteMessageSmslog(data = []) {
  return request({
    url: `/message/smslog`,
    method: 'delete',
    data
  })
}

// 分页
// GET
// /message/smslog/page
export function getMessageSmslogPageList(params = {}) {
  return request({
    url: `/message/smslog/page`,
    method: 'get',
    params
  })
}
