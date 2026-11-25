import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { SECTIONS } from '../sections'
import './WheelNav.css'

/**
 * Desktop side navigation: the section links sit on the rim of a wheel that curves
 * around the right edge (after React Bits' Option Wheel). The wheel is driven by the
 * page scroll, so the current section is always the one turned to the middle.
 */

const ITEMS = [{ id: 'top', label: 'Home' }, ...SECTIONS.map(({ id, label }) => ({ id, label }))]

// Wheel shape, in em of the item font size.
const SPACING = 1.75 // vertical distance between neighbouring items
const TILT = (7 * Math.PI) / 180 // angle between neighbouring items
const RADIUS = SPACING / TILT
const BLUR = 0.08 // px of blur per step from the middle
const FADE = 0.09 // opacity lost per step from the middle
const MIN_OPACITY = 0.6
const SMOOTHING = 180 // ms easing time constant

export function WheelNav() {
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const [active, setActive] = useState(0)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let pos = 0
    let target = 0
    let raf = 0
    let last = 0

    // Scroll offsets at which each item becomes the middle one.
    const measure = () => {
      const vh = window.innerHeight
      const max = document.documentElement.scrollHeight - vh
      let prev = -1
      return ITEMS.map(({ id }, i) => {
        const el = document.getElementById(id)
        const top = el ? el.getBoundingClientRect().top + window.scrollY : 0
        // An item is centred when its section reaches the top, which is where a click lands.
        let at = i === 0 ? 0 : Math.min(max, Math.max(0, top))
        if (at <= prev) at = prev + 1
        prev = at
        return at
      })
    }
    let anchors = measure()

    const scrollToPos = () => {
      const y = window.scrollY
      const n = anchors.length
      if (y <= anchors[0]) return 0
      if (y >= anchors[n - 1]) return n - 1
      let i = 0
      while (y >= anchors[i + 1]) i++
      return i + (y - anchors[i]) / (anchors[i + 1] - anchors[i])
    }

    const render = () => {
      itemRefs.current.forEach((el, i) => {
        if (!el) return
        const d = i - pos
        const a = d * TILT
        const dist = Math.abs(d)
        const x = RADIUS * (1 - Math.cos(a))
        const y = RADIUS * Math.sin(a)
        el.style.transform = `translate(${x.toFixed(4)}em, calc(-50% + ${y.toFixed(4)}em)) rotate(${(-a).toFixed(4)}rad)`
        el.style.setProperty('--blur', `${(dist * BLUR).toFixed(2)}px`)
        el.style.setProperty('--opacity', Math.max(MIN_OPACITY, 1 - dist * FADE).toFixed(3))
        // 1 when this item is in the middle, easing to 0 one step away.
        el.style.setProperty('--active', Math.max(0, 1 - dist).toFixed(3))
      })
      matchSurfaces()
    }

    // Each item takes the colours of whatever section is directly behind it, so while
    // the wheel straddles the black/pink edge every item stays readable.
    const matchSurfaces = () => {
      const surfaces = Array.from(
        document.querySelectorAll<HTMLElement>('main [data-surface]'),
        (el) => ({ rect: el.getBoundingClientRect(), surface: el.dataset.surface ?? 'dark' }),
      )
      itemRefs.current.forEach((el) => {
        if (!el) return
        const r = el.getBoundingClientRect()
        const y = r.top + r.height / 2
        const hit = surfaces.find((s) => s.rect.top <= y && s.rect.bottom > y)
        const surface = hit?.surface ?? 'dark'
        if (el.dataset.surface !== surface) el.dataset.surface = surface
      })
    }

    const tick = (t: number) => {
      const dt = last ? t - last : 16
      last = t
      pos += (target - pos) * (reduceMotion ? 1 : 1 - Math.exp(-dt / SMOOTHING))
      if (Math.abs(target - pos) < 0.0005) pos = target
      render()
      if (pos !== target) {
        raf = requestAnimationFrame(tick)
      } else {
        raf = 0
        last = 0
      }
    }

    const update = () => {
      target = scrollToPos()
      setActive(Math.round(target))
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const remeasure = () => {
      anchors = measure()
      update()
    }

    pos = target = scrollToPos()
    render()
    update()

    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', remeasure)
    const ro = new ResizeObserver(remeasure)
    ro.observe(document.body)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', remeasure)
      ro.disconnect()
    }
  }, [])

  // Up/down arrows move between items, like turning the wheel by hand.
  const onKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
    const links = itemRefs.current
    const i = links.findIndex((el) => el === document.activeElement)
    if (i === -1) return
    e.preventDefault()
    const next = Math.min(links.length - 1, Math.max(0, i + (e.key === 'ArrowDown' ? 1 : -1)))
    links[next]?.focus()
  }

  return (
    <nav className="wheel-nav" aria-label="Main">
      <ul onKeyDown={onKeyDown}>
        {ITEMS.map((item, i) => (
          <li key={item.id}>
            <a
              ref={(el) => {
                itemRefs.current[i] = el
              }}
              href={`#${item.id}`}
              className="wheel-nav__item"
              aria-current={active === i ? 'location' : undefined}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
