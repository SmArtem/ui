let scrollBarWidth: number | undefined

const isServer = typeof window === 'undefined'

export default (): number => {
  if (isServer) return 0
  if (scrollBarWidth !== undefined) return scrollBarWidth
  const scrollDiv = document.createElement('div')
  document.body.appendChild(scrollDiv)

  scrollDiv.style.width = '100px'
  scrollDiv.style.height = '100px'
  scrollDiv.style.overflow = 'scroll'
  scrollDiv.style.position = 'absolute'
  scrollDiv.style.top = '-9999px'

  scrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth

  document.body.removeChild(scrollDiv)

  return scrollBarWidth
}
