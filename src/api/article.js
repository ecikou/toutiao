import request from '@/utils/request'

export const getArticle = (article_id) => {
  return request({
    url: `/articles/${article_id}`
  })
}
export const addUser = (target) => {
  return request({
    url: 'user/followings',
    method: 'post',
    data: {
      target
    }
  })
}
export const delUser = (target) => {
  return request({
    method: 'delete',
    url: `user/followings/${target}`
  })
}
export const addCollect = (target) => {
  return request({
    url: 'article/collections',
    method: 'post',
    data: {
      target
    }
  })
}
export const delCollect = (target) => {
  return request({
    method: 'delete',
    url: `article/collections/${target}`
  })
}
