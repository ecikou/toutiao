export function getItem (key) {
  const res = window.localStorage.getItem(key)
  try {
    return JSON.parse(res)
  } catch (err) {
    return res
  }
}

export function setItem (key, value) {
  if (typeof value === 'object') {
    window.localStorage.setItem(key, JSON.stringify(value))
  } else {
    window.localStorage.setItem(key, value)
  }
}
// 删除本地中的某个存储值
export function removeItem (key) {
  window.localStorage.removeItem(key)
}
// 清空本地存储
export function clearItem () {
  window.localStorage.clearItem()
}
