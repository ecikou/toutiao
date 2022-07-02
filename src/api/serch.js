import request from '@/utils/request'

export const getSuggestList = q => {
  return request({
    url: 'suggestion',
    params: {
      q
    }
  })
}

// eslint-disable-next-line camelcase
export const getSearchResult = ({ q, page, per_pag }) => {
  return request({
    url: 'search',
    params: {
      q,
      page,
      per_pag
    }
  })
}
