import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently crossing the middle of the viewport,
 * or null while the reader is above all of them (i.e. on the hero).
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    if (!els.length) return

    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id)
          else visible.delete(e.target.id)
        }
        // Stacked sections can overlap mid-screen; the later one is the one on top.
        setActive(ids.findLast((id) => visible.has(id)) ?? null)
      },
      { rootMargin: '-45% 0px -54% 0px' },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}
