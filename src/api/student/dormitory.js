import request from '@/utils/request'
import { exportFile } from '@/utils'

// 学生入宿、离宿管理

// 导出excel
// GET
// /student/dormitory/export
export function exportStudentDormitory(params = {}) {
  exportFile(`/student/dormitory/export`, params)
}

// 分页
// GET
// /student/dormitory/page
export function getStudentDormitoryPageList(params = {}) {
  return request({
    url: `/student/dormitory/page`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /student/dormitory/{id}
export function getStudentDormitoryById(params = {}) {
  const { id } = params
  return request({
    url: `/student/dormitory/${id}`,
    method: 'get'
  })
}
