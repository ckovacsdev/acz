import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { SectionDivider } from './SectionDivider'
import './Socials.css'

type Feed = {
  name: string
  prefix: string
  cols: number
  /** Relative row heights. The SWSH screenshot cuts off its top and bottom rows. */
  rows: number[]
  /** Width ÷ height of the whole grid, so both feeds line up at the same height. */
  ratio: number
  label: string
}

// Tiles are cropped from the design and live in public/socials/ (prefix-01.jpg …).
const FEEDS: Feed[] = [
  {
    name: 'Atlantic Records Publicity',
    prefix: 'atlantic',
    cols: 8,
    rows: [1, 1, 1, 1],
    ratio: 948 / 628,
    label:
      'Grid of Atlantic Records Publicity Instagram posts: award nominations, press coverage and album news.',
  },
  {
    name: 'SWSH',
    prefix: 'swsh',
    cols: 4,
    rows: [185, 257, 185],
    ratio: 772 / 628,
    label:
      'Grid of SWSH Instagram posts: New Music Friday round-ups, music news and the SWSH playlist.',
  },
]

export function Socials() {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  // The tiles fill in one by one, like a feed loading, the first time the grids come into view.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section id="socials" className="socials" data-surface="cream" aria-labelledby="socials-title">
      <SectionDivider />
      <h2 id="socials-title" className="socials__title">
        Socials
      </h2>

      <div className="socials__feeds" ref={ref} data-shown={shown || undefined}>
        {FEEDS.map((f) => (
          <figure
            key={f.prefix}
            className="feed"
            style={{ '--ratio': f.ratio, flexGrow: f.ratio } as CSSProperties}
          >
            <figcaption className="feed__head">
              <span className="feed__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r="0.6" className="feed__icon-dot" />
                </svg>
              </span>
              <span className="feed__name">{f.name}</span>
              <span className="feed__sub">Official Instagram</span>
            </figcaption>

            <div
              className="feed__grid"
              role="img"
              aria-label={f.label}
              style={{
                gridTemplateColumns: `repeat(${f.cols}, minmax(0, 1fr))`,
                gridTemplateRows: f.rows.map((r) => `${r}fr`).join(' '),
              }}
            >
              {Array.from({ length: f.cols * f.rows.length }, (_, i) => {
                const n = String(i + 1).padStart(2, '0')
                // Diagonal wave: each tile waits by its column plus its row.
                const wave = (i % f.cols) + Math.floor(i / f.cols)
                return (
                  <img
                    key={n}
                    className="feed__tile"
                    src={`/socials/${f.prefix}-${n}.jpg`}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    style={{ '--wave': wave } as CSSProperties}
                  />
                )
              })}
            </div>
          </figure>
        ))}
      </div>

      <p className="socials__caption">
        Created and posted content to deliver company news and pop culture updates for the
        official Instagram pages of <strong>Atlantic Records Publicity</strong> and{' '}
        <strong>SWSH</strong>.
      </p>
    </section>
  )
}
