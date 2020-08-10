import request from '@/utils/request'

// 公告信息表

// 保存
// POST
// /article
export function createArticle(data = {}) {
  return request({
    url: `/article`,
    method: 'post',
    data
  })
}

// 修改
// PUT
// /article
export function editArticle(data = {}) {
  return request({
    url: `/article`,
    method: 'put',
    data
  })
}

// 删除
// DELETE
// /article
export function deleteArticle(data = []) {
  return request({
    url: `/article`,
    method: 'delete',
    data
  })
}

// 分页
// GET
// /article/page
export function getArticlePageList(params = {}) {
  return request({
    url: `/article/page`,
    method: 'get',
    params
  })
}

// 信息
// GET
// /article/{id}
export function getArticleById(params = {}) {
  const { id } = params
  return request({
    url: `/article/${id}`,
    method: 'get'
  })
}
