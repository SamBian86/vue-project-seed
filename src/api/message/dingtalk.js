import request from '@/utils/request'

// 钉钉消息服务

// 保存
// POST
// /message/dingtalk
export function createMessageDingtalk(data = {}) {
  return request({
    url: `/message/dingtalk`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /message/dingtalk
export function editMessageDingtalk(data = {}) {
  return request({
    url: `/message/dingtalk`,
    method: 'put',
    data
  })
}

// 删除
// DELETE
// /message/dingtalk
export function deleteMessageDingtalk(data = []) {
  return request({
    url: `/message/dingtalk`,
    method: 'delete',
    data
  })
}

// 获取配置信息
// GET
// /message/dingtalk/config
export function getMessageDingtalkConfig() {
  return request({
    url: `/message/dingtalk/config`,
    method: 'get'
  })
}

// 分页
// GET
// /message/dingtalk/page
export function getMessageDingtalkPageList(params = {}) {
  return request({
    url: `/message/dingtalk/page`,
    method: 'get',
    params
  })
}

// 保存配置信息
// POST
// /message/dingtalk/saveConfig
export function saveMessageDingtalkConfig(data = {}) {
  return request({
    url: `/message/dingtalk/saveConfig`,
    method: 'post',
    data
  })
}

// 发送通知
// POST
// /message/dingtalk/send
export function sendMessageDingtalk(data = {}) {
  return request({
    url: `/message/dingtalk/send`,
    method: 'post',
    data
  })
}

// 获取可选择模板类型列表
// GET
// /message/dingtalk/template/type/list
export function getMessageDingtalkTemplateTypeList(params = {}) {
  return request({
    url: `/message/dingtalk/template/type/list`,
    method: 'get',
    params
  })
}
