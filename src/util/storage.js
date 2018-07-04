export const get = (key, next) => {
  const val = JSON.parse(window.localStorage.getItem('n' + key))
  return next !== undefined ? next(val) : val
}

export const set = (key, value, next) => {
  window.localStorage.setItem('n' + key, JSON.stringify(value))

  if (next !== undefined) return next()
}

export default {get, set}
