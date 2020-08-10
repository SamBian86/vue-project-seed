import request from '@/utils/request'

// 短信服务

// 保存配置短信
// POST
// /message/sms
export function saveMessageSmsConfig(data = {}) {
  return request({
    url: `/message/sms`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /message/sms
export function updateMessageSmsConfig(data = {}) {
  return request({
    url: `/message/sms`,
    method: 'put',
    data
  })
}

// 删除
// DELETE
// /message/sms
export function deleteMessageSms(data = []) {
  return request({
    url: `/message/sms`,
    method: 'delete',
    data
  })
}

// 分页
// GET
// /message/sms/page
export function getMessageSmsPageList(params = {}) {
  return request({
    url: `/message/sms/page`,
    method: 'get',
    params
  })
}

// 发送短信
// POST
// /message/sms/send
export function sendMessageSms(data = {}) {
  return request({
    url: `/message/sms/send`,
    method: 'post',
    data
  })
}

// 信息
// GET
// /message/sms/{id}
export function getMessageSmsConfig(params = {}) {
  const { id } = params
  return request({
    url: `/message/sms/${id}`,
    method: 'get'
  })
}
