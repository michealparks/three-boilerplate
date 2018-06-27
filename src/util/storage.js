
export const get = (key, next) => {
  return next(window.localStorage.getItem('key'))
}

export const set = (key, value, next) => {
  window.localStorage.setItem('key', value)

  if (next !== undefined) return next()
}

export default {get, set}
