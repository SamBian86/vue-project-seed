import request from '@/utils/request'

// 物业人员登录
// POST
// /auth/property/login
export function authPropertyLogin(data = {}) {
  return request({
    url: `/auth/property/login`,
    method: 'post',
    data
  })
}

// 物业人员忘记密码
// POST
// /auth/property/reset/password
export function authPropertyResetPassword(data = {}) {
  return request({
    url: `/auth/property/reset/password`,
    method: 'post',
    data
  })
}
