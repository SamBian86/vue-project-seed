import request from '@/utils/request'

// 学校学院信息

// 学校-学院列表
// GET
// /property/school/branch/list
export function getPropertySchoolBranchList() {
  return request({
    url: `/property/school/branch/list`,
    method: 'get'
  })
}
