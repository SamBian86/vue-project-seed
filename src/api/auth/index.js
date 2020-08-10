import request from '@/utils/request'

// GET
// /auth/captcha
// 验证码
export function getCaptcha(uuid) {
  return `${process.env.VUE_APP_API_URL}/auth/captcha?uuid=${uuid}`
}

// POST
// /auth/logout
// 退出
export function logout(params) {
  return request({
    url: '/auth/logout',
    method: 'post',
    params
  })
}

// 修改密码
// PUT
// /auth/modify/password
export function modifyPassword(data = {}) {
  return request({
    url: `/auth/modify/password`,
    method: 'put',
    data
  })
}

// 登录用户信息
// GET
// /auth/user/info
export function getAuthUserInfo() {
  return request({
    url: `/auth/user/info`,
    method: 'get'
  })
}
