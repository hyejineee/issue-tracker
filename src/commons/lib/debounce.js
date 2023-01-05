const debounce = (func, timeout = 300) => {
  let timer
  return () => {
    if (!timer) {
      func()
    }
    clearTimeout(timer)
    timer = setTimeout(() => {
      timer = undefined
    }, timeout)
  }
}

export default debounce
