import { useEffect, useRef, useState } from 'react'
import { SECTIONS } from '../../sections'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useSurfaceAt } from '../../hooks/useSurfaceAt'
import { WheelNav } from '../wheel-nav/WheelNav'
import './Nav.css'

const IDS = SECTIONS.map((s) => s.id)
const WIDE = '(min-width: 1100px)'

// Same items as the desktop wheel, each with a short hint underneath.
const MENU_ITEMS = [{ id: 'top', label: 'Home', hint: 'back to the top' }, ...SECTIONS]

export function Nav() {
  const active = useActiveSection(IDS) ?? 'top'
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  // The button floats at the top of the screen; it turns black while over the pink About page.
  const toggleSurface = useSurfaceAt(0.05)

  // While the menu card is open: Escape or scrolling closes it, and so does widening
  // the window to the wheel layout.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const startY = window.scrollY
    const onScroll = () => Math.abs(window.scrollY - startY) > 40 && setOpen(false)
    const mq = window.matchMedia(WIDE)
    const onWide = () => mq.matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScroll, { passive: true })
    mq.addEventListener('change', onWide)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll)
      mq.removeEventListener('change', onWide)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      {/* Desktop: the section links on a wheel around the right edge. */}
      <WheelNav />

      {/* Narrower screens: a floating button that drops down a small menu card. */}
      <button
        ref={toggleRef}
        type="button"
        className="menu-toggle"
        data-surface={toggleSurface}
        aria-expanded={open}
        aria-controls="menu-panel"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((o) => !o)}
      >
        {/* Three bars that fold into an X while the menu is open. */}
        <span className="menu-toggle__bars" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      {/* Tapping anywhere outside the card closes it. */}
      <div className="menu-backdrop" hidden={!open} onClick={close} aria-hidden="true" />

      <nav id="menu-panel" className="menu-panel" aria-label="Main" hidden={!open}>
        <ul>
          {MENU_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={close}
                aria-current={active === item.id ? 'location' : undefined}
              >
                <span className="menu-panel__label">{item.label}</span>
                <span className="menu-panel__hint">{item.hint}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
