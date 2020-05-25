import request from '@/utils/request'
import { openNewTab } from '@/utils'
// 成本科目表

// 保存
// POST
// /engineering/cost/type
export function createEngineeringCostType(data = {}) {
  return request({
    url: `/engineering/cost/type`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /engineering/cost/type
export function editEngineeringCostType(data = {}) {
  return request({
    url: `/engineering/cost/type`,
    method: 'put',
    data
  })
}

// 删除
// DELETE
// /engineering/cost/type
export function deleteEngineeringCostType(data = []) {
  return request({
    url: `/engineering/cost/type`,
    method: 'delete',
    data
  })
}

// 模板下载
// GET
// /engineering/cost/type/export/{excelType}
export function downloadEngineeringCostType(params = {}) {
  const { excelType } = params
  openNewTab(`/engineering/cost/type/export/${excelType}`, params)
}

// 导入
// POST
// /engineering/cost/type/import
export function importEngineeringCostType(data = {}) {
  return request({
    url: `/engineering/cost/type/import`,
    method: 'post',
    dataType: 'formData',
    data
  })
}

// 树结构列表
// GET
// /engineering/cost/type/list
export function getEngineeringCostTypeTree() {
  return request({
    url: `/engineering/cost/type/list`,
    method: 'get'
  })
}

// 详情信息
// GET
// /engineering/cost/type/{id}
export function getEngineeringCostTypeById(params = {}) {
  const { id } = params
  return request({
    url: `/engineering/cost/type/${id}`,
    method: 'get'
  })
}
