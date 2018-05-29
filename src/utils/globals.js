module.exports = {
  '__root__': require('path').resolve(__dirname, '../..'),
  '__dev__': process.env.NODE_ENV === 'development',
  '__darwin__': process.platform === 'darwin',
  '__linux__': process.platform === 'linux',
  '__win32__': process.platform === 'win32',
  '__noop__': () => {}
}
