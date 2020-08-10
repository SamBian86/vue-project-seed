import request from '@/utils/request'

// 学校信息

// 信息
// GET
// /property/school
export function getPropertySchoolInfo() {
  return request({
    url: `/property/school`,
    method: 'get'
  })
}

// 校园码
// GET
// /property/school/qrcode
export function getPropertySchoolQRcode(params = {}) {
  return request({
    url: `/property/school/qrcode`,
    method: 'get',
    params
  })
}
