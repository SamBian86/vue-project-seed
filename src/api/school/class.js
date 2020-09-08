import request from '@/utils/request'
// 学校班级信息

// 保存
// POST
// /school/class
export function createSchoolClass(data = {}) {
  return request({
    url: `/school/class`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /school/class
export function editSchoolClass(data = {}) {
  return request({
    url: `/school/class`,
    method: 'put',
    data
  })
}

// 班级导入模板下载
// GET
// /school/class/export/{excelType}
export function exportSchoolClass(params = {}) {
  const { excelType } = params
  return request({
    url: `/school/class/export/${excelType}`,
    method: 'get',
    responseType: 'blob',
    params
  })
}

// 批量导入班级信息
// POST
// /school/class/import
export function importSchoolClass(data = {}) {
  return request({
    url: `/school/class/import`,
    method: 'post',
    dataType: 'uploadData',
    data
  })
}

// 分页
// GET
// /school/class/page
export function getSchoolClassPageList(params = {}) {
  return request({
    url: `/school/class/page`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /school/class/{id}
export function getSchoolClassById(params = {}) {
  const { id } = params
  return request({
    url: `/school/class/${id}`,
    method: 'get'
  })
}

// 删除
// DELETE
// /school/class/{id}
export function deleteSchoolClass(params = {}) {
  const { id } = params
  return request({
    url: `/school/class/${id}`,
    method: 'delete',
    params
  })
}

// 专业-班级列表
// GET
// /school/class/{specialityId}/list
export function getSchoolClassListBySpecialityId(params = {}) {
  const { specialityId } = params
  return request({
    url: `/school/class/${specialityId}/list`,
    method: 'get',
    params
  })
}
