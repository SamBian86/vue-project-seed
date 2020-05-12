import request from '@/utils/request'

// 邮件模板

// 保存
// POST
// /message/mailtemplate
export function createMessageMailtemplate(data = {}) {
  return request({
    url: `/message/mailtemplate`,
    method: 'post',
    dataType: 'formData',
    data
  })
}

// 修改
// PUT
// /message/mailtemplate
export function editMessageMailtemplate(data = {}) {
  return request({
    url: `/message/mailtemplate`,
    method: 'put',
    dataType: 'formData',
    data
  })
}

// 删除
// DELETE
// /message/mailtemplate
export function deleteMessageMailtemplate(data = []) {
  return request({
    url: `/message/mailtemplate`,
    method: 'delete',
    data
  })
}

// 获取配置信息
// GET
// /message/mailtemplate/config
export function getMessageMailtemplateConfig() {
  return request({
    url: `/message/mailtemplate/config`,
    method: 'get'
  })
}

// 分页
// GET
// /message/mailtemplate/page
export function getMessageMailtemplatePageList(params = {}) {
  return request({
    url: `/message/mailtemplate/page`,
    method: 'get',
    params
  })
}

// 保存配置信息
// POST
// /message/mailtemplate/saveConfig
export function saveMessageMailtemplateConfig(data = {}) {
  return request({
    url: `/message/mailtemplate/saveConfig`,
    method: 'post',
    data
  })
}

// 发送邮件
// POST
// /message/mailtemplate/send
export function sendMessageMailtemplate(data = {}) {
  return request({
    url: `/message/mailtemplate/send`,
    method: 'post',
    data
  })
}

// 信息
// GET
// /message/mailtemplate/{id}
export function getMessageMailtemplateById(params = {}) {
  const { id } = params
  return request({
    url: `/message/mailtemplate/${id}`,
    method: 'get'
  })
}
