import './Decks.css'

type Deck = {
  id: string
  title: string
  example: string
  body: string
  href: string
  cta: string
  /** Cover first; the next two fan out behind it. */
  slides: { src: string }[]
}

// Slides are cropped from the design and live in public/decks/.
const DECKS: Deck[] = [
  {
    id: 'case',
    title: 'Case Studies',
    example: 'Tyler, the Creator: CHROMAKOPIA album rollout',
    body: 'Used to help develop comparable artists’ marketing plans: 360-degree research of an album rollout from conception to completion.',
    href: 'https://www.canva.com/design/DAGXsFDQODs/Xeje9zLSmuupsZlKzTJAyQ/edit',
    cta: 'Open in Canva',
    slides: [{ src: 'case-1' }, { src: 'case-2' }, { src: 'case-3' }],
  },
  {
    id: 'trend',
    title: 'Trend Reports',
    example: 'Roadrunner Records: digital marketing weekly roundup',
    body: 'A weekly digest of current pop culture and music business news, trending content, up-and-coming creators, the latest music releases and more for the label team.',
    href: 'https://www.canva.com/design/DAGO9uCeWQ4/ZwpnC3v2O-AlXFYuHdeDZA/edit',
    cta: 'Open in Canva',
    slides: [{ src: 'trend-1' }, { src: 'trend-2' }, { src: 'trend-3' }],
  },
]

const newTab = { target: '_blank', rel: 'noopener noreferrer' } as const

export function Decks() {
  return (
    <section id="decks" className="decks" data-surface="cream" aria-labelledby="decks-title">
      <h2 id="decks-title" className="decks__title">
        Decks
      </h2>

      <div className="decks__list">
        {DECKS.map((d, i) => (
          <article
            key={d.id}
            className="deck"
            data-flip={i % 2 === 1 || undefined}
            aria-labelledby={`deck-${d.id}`}
          >
            {/* The fanned slides open the deck too, but the button below is the one link
                keyboards and screen readers get, so it isn't announced twice. */}
            <a className="deck__fan" href={d.href} {...newTab} tabIndex={-1} aria-hidden="true">
              {d.slides.map((s, n) => (
                <img
                  key={s.src}
                  className="deck__slide"
                  data-n={n}
                  src={`/decks/${s.src}.jpg`}
                  alt=""
                  width={518}
                  height={290}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              ))}
            </a>

            <div className="deck__text">
              <h3 id={`deck-${d.id}`} className="deck__name">
                {d.title}
              </h3>
              <p className="deck__example">{d.example}</p>
              <p className="deck__body">{d.body}</p>
              <a className="deck__cta" href={d.href} {...newTab}>
                {d.cta}
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M8 16 16 8M9.5 8H16v6.5" />
                </svg>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
