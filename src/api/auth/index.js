import request from '@/utils/request'

// GET
// /auth/captcha
// 验证码
export function getCaptcha(uuid) {
  return `${process.env.VUE_APP_API_URL}/auth/captcha?uuid=${uuid}`
}

// POST
// /auth/login
// 登录
export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
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
