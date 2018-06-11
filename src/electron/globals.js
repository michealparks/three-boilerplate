const globals = require('../util/globals')

Object.keys(globals).forEach(key => {
  global[key] = globals[key]
})
