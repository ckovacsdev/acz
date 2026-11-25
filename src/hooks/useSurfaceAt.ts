import { useEffect, useState } from 'react'

/**
 * Which background is under a fixed element: sections opt in with `data-surface="…"`,
 * anything else counts as "dark". `yFraction` is the point to test, as a fraction of
 * the viewport height (0.5 = the middle of the screen).
 */
export function useSurfaceAt(yFraction: number) {
  const [surface, setSurface] = useState('dark')

  useEffect(() => {
    let raf = 0
    const check = () => {
      raf = 0
      const y = window.innerHeight * yFraction
      let found = 'dark'
      document.querySelectorAll<HTMLElement>('[data-surface]').forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.top <= y && r.bottom > y) found = el.dataset.surface ?? 'dark'
      })
      setSurface(found)
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(check)
    }
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [yFraction])

  return surface
}
