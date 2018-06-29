const evalError = () => {
  throw new Error(`Sorry, this app does not support window.eval().`)
}

// eslint-disable-next-line
if (typeof global !== 'undefined') global.eval = evalError

// eslint-disable-next-line
if (typeof window !== 'undefined') window.eval = evalError
