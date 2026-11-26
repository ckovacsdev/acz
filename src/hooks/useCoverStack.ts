import { useEffect, type RefObject } from 'react'

/**
 * Stacked sections: each section in the container pins in place and the next one slides
 * up over it, like sheets laid on top of each other.
 *
 * A section shorter than the screen pins as soon as it reaches the top. A taller one
 * (About) has to scroll until its bottom edge reaches the bottom of the screen first,
 * or its lower half would never be seen; so each section pins at
 * `top: min(0, screen height − its height)`, and later sections sit above earlier ones.
 */
export function useCoverStack(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const stack = ref.current
    if (!stack) return
    const sheets = Array.from(stack.children) as HTMLElement[]

    const update = () => {
      const vh = window.innerHeight
      sheets.forEach((el, i) => {
        el.style.zIndex = String(i)
        el.style.setProperty('--stick-top', `${Math.min(0, vh - el.offsetHeight)}px`)
      })
    }

    update()
    const ro = new ResizeObserver(update)
    sheets.forEach((el) => ro.observe(el))
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [ref])
}

/**
 * Where an element sits on the page, ignoring any sticky offset. A pinned section reports
 * its pinned position from getBoundingClientRect, which isn't where links should land.
 */
export function layoutTop(el: HTMLElement) {
  const prev = el.style.position
  el.style.position = 'static'
  const top = el.getBoundingClientRect().top + window.scrollY
  el.style.position = prev
  return top
}
