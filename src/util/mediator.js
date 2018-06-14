const channels = new Map()

export const on = (name, fn) => {
  if (!channels.has(name)) {
    channels.set(name, [])
  }

  return channels.get(name).push(fn)
}

export const once = (name, fn) => {
  const i = on(name, (data) => {
    fn(data)
    channels.get(name).splice(i, 1)
  })
}

export const emit = (name, data) => {
  const arr = channels.get(name)

  for (let i = 0, l = arr.length; i < l; ++i) {
    arr[i](data)
  }
}

export default {emit, on, once}
