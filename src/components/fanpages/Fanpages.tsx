import { SectionDivider } from '../section-divider/SectionDivider'
import './Fanpages.css'

// Combined results across the fan accounts.
const STATS = [
  { value: '27.2M', label: 'views' },
  { value: '6M', label: 'likes' },
  { value: '6K', label: 'videos' },
  { value: '115', label: 'accounts' },
  { value: '40', label: 'artists' },
  { value: '12.8%', label: 'AER', title: 'average engagement rate' },
]

// Photos live in public/fanpages/.
const PAGES = [
  { artist: '82MAJOR', photo: '82major' },
  { artist: 'bunii', photo: 'bunii' },
  { artist: 'De La Soul', photo: 'de-la-soul' },
  { artist: 'Empire of The Sun', photo: 'empire-of-the-sun' },
  { artist: 'Haute and Freddy', photo: 'haute-and-freddy' },
  { artist: 'Jake Minch', photo: 'jake-minch' },
  { artist: 'Tyla', photo: 'tyla' },
]

export function Fanpages() {
  return (
    <section
      id="fanpages"
      className="fanpages"
      data-surface="cream"
      aria-labelledby="fanpages-title"
    >
      <SectionDivider />
      <h2 id="fanpages-title" className="fanpages__title">
        Fanpages
      </h2>

      <dl className="fanpages__stats">
        {STATS.map((s) => (
          <div key={s.label} className="fanpages__stat">
            <dt className="sr-only">{s.title ?? s.label}</dt>
            <dd>
              <span className="fanpages__value">{s.value}</span>{' '}
              {s.title ? (
                // A styled tooltip rather than the browser's `title` one, which is slow to
                // appear and doesn't show at all in some browsers. Focusable so keyboard
                // and touch users can open it too.
                <span className="fanpages__tip" tabIndex={0}>
                  {s.label}
                  <span className="fanpages__tip-text" role="tooltip">
                    {s.title}
                  </span>
                </span>
              ) : (
                <span aria-hidden="true">{s.label}</span>
              )}
            </dd>
          </div>
        ))}
      </dl>

      {/* On phones this becomes a sideways-scrolling strip (see Fanpages.css). */}
      <ul className="fanpages__phones">
        {PAGES.map((p) => (
          <li key={p.photo} className="fanpage">
            <div className="phone">
              <img
                className="phone__screen"
                src={`/fanpages/${p.photo}.jpg`}
                alt={`${p.artist} fan page`}
                width={177}
                height={376}
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className="fanpage__artist">{p.artist}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
