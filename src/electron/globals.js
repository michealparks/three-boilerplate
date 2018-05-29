const globals = require('../utils/globals')

Object.keys(globals).forEach(key => {
  global[key] = globals[key]
})
