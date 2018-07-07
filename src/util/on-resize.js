
// The actualResizeHandler will execute at a rate of 15fps
const delay = 66
const fns = []

let resizeTimeout = -1

const throttler = () => {
  // ignore resize events as long as an actualResizeHandler execution is in the queue
  if (resizeTimeout === -1) {
    resizeTimeout = setTimeout(timeoutFn, delay)
  }
}

const timeoutFn = () => {
  resizeTimeout = -1

  for (let i = 0, l = fns.length; i < l; i++) {
    fns[i]()
  }
}

window.addEventListener('resize', throttler, {passive: true})

export default (fn) => fns.push(fn)
