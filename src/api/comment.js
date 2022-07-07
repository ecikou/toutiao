import request from '@/utils/request'
export const getCommentList = ({ type, source, offset, limit }) => {
  return request({
    url: '/comments',
    method: 'get',
    params: {
      type,
      source,
      offset,
      limit
    }
  })
}

export const addLike = (target) => {
  return request({
    url: 'comment/likings',
    method: 'post',
    data: {
      target
    }
  })
}

export const delLike = (target) => {
  return request({
    url: `comment/likings/${target}`,
    method: 'DELETE'
  })
}

export const addComment = (data) => {
  return request({
    url: 'comments',
    method: 'post',
    data
  })
}
