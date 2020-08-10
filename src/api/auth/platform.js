import request from '@/utils/request'

// 登录
// POST
// /auth/platform/login
export function authPlatformLogin(data = {}) {
  return request({
    url: `/auth/platform/login`,
    method: 'post',
    data
  })
}

// 忘记密码
// POST
// /auth/platform/reset/password
export function authPlatformResetPassword(data = {}) {
  return request({
    url: `/auth/platform/reset/password`,
    method: 'post',
    data
  })
}
