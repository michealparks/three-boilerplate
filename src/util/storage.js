export const get = (key, next) => {
  return next(JSON.parse(window.localStorage.getItem('data' + key)))
}

export const set = (key, value, next) => {
  window.localStorage.setItem('n' + key, JSON.stringify(value))

  if (next !== undefined) return next()
}

export default {get, set}
