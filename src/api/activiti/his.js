import request from '@/utils/request'
import { generateUrl } from '@/utils'

// 流程历史

// 历史流程实例列表
// GET
// /activiti/his/getHistoryProcessInstancePage
export function getHistoryProcessInstancePage(params = {}) {
  return request({
    url: `/activiti/his/getHistoryProcessInstancePage`,
    method: 'get',
    params
  })
}

// 获取流程活动图
// GET
// /activiti/his/getInstImage
export function getInstImage(params = {}) {
  return generateUrl(`/activiti/his/getInstImage`, params)
}

// 已办任务：根据登录账号查询用户已办任务
// GET
// /activiti/his/getMyHandledInstancePage
export function getMyHandledInstancePage(params = {}) {
  return request({
    url: `/activiti/his/getMyHandledInstancePage`,
    method: 'get',
    params
  })
}

// 我发起的流程
// GET
// /activiti/his/getMyProcessInstancePage
export function getMyProcessInstancePage(params = {}) {
  return request({
    url: `/activiti/his/getMyProcessInstancePage`,
    method: 'get',
    params
  })
}

// 获取流程处理详情
// GET
// /activiti/his/getTaskHandleDetailInfo
export function getTaskHandleDetailInfo(params = {}) {
  return request({
    url: `/activiti/his/getTaskHandleDetailInfo`,
    method: 'get',
    params
  })
}
