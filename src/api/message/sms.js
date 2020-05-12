import request from '@/utils/request'

// 短信服务

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

// 获取配置短信
// GET
// /message/sms/config
export function getMessageSmsConfig() {
  return request({
    url: `/message/sms/config`,
    method: 'get'
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

// 保存配置短信
// POST
// /message/sms/saveConfig
export function saveMessageSmsConfig(data = {}) {
  return request({
    url: `/message/sms/saveConfig`,
    method: 'post',
    data
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
