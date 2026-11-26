import { useEffect } from 'react'
import { layoutTop } from './useCoverStack'

/**
 * Makes every on-page link (`href="#section"`) reliably scroll to its section.
 *
 * Left to the browser, clicking a link whose `#hash` is already in the address bar
 * does nothing, so "Home" stops working after it's been used once. Handling the click
 * ourselves always scrolls, keeps the address up to date, and moves keyboard focus to
 * the section so the next Tab continues from there.
 */
export function useInPageLinks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return
      const link = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]')
      const id = link?.getAttribute('href')?.slice(1)
      const target = id ? document.getElementById(id) : null
      if (!target) return

      e.preventDefault()
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      window.scrollTo({
        top: layoutTop(target),
        behavior: reduceMotion ? 'auto' : 'smooth',
      })
      history.replaceState(null, '', `#${id}`)

      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
      target.focus({ preventScroll: true })
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
}
