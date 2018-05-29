const output = (buffer) => `
const buffer = new ArrayBuffer(${buffer.length});
const uint8 = new Uint8Array(buffer);
uint8.set([${buffer.join(',')}]);
const {Module, instantiate, Memory, Table} = WebAssembly;
const WebAssemblyModule = (deps) => instantiate(buffer, deps || {
  'global': {},
  'env': {
    'memory': new Memory({initial: 10, limit: 100}),
    'table': new Table({initial: 0, element: 'anyfunc'})
  }
});

export default WebAssemblyModule;
`

module.exports = function (buffer) {
  this.cacheable()
  this.callback(null, output(buffer))
}

module.exports.raw = true
