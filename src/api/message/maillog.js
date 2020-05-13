import request from '@/utils/request'

// 邮件发送记录

// 删除
// DELETE
// /message/maillog
export function deleteMessageMaillog(data = []) {
  return request({
    url: `/message/maillog`,
    method: 'delete',
    data
  })
}

// 分页
// GET
// /message/maillog/page
export function getMessageMaillogList(params = {}) {
  return request({
    url: `/message/maillog/page`,
    method: 'get',
    params
  })
}
