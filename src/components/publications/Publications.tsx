import type { CSSProperties } from 'react'
import { WRITING } from '../../contact'
import { SectionDivider } from '../section-divider/SectionDivider'
import './Publications.css'

type Base = { title: string; href: string; image: string }

/** The Luna Collective's look: white, bold capitals, a coloured "tape" strip and a byline. */
type LunaArticle = Base & { outlet: 'luna'; tape: 'Review' | 'Interview'; date?: string }

/** Medium's dark preview: headline, standfirst and a meta line. */
type MediumArticle = Base & { outlet: 'medium'; dek: string; meta: string }

type Article = LunaArticle | MediumArticle
type Group = { label: string; articles: Article[] }

const OUTLET_NAME = { luna: 'The Luna Collective', medium: 'Medium' } as const

// Images are cropped from the design and live in public/publications/.
const GROUPS: Group[] = [
  {
    label: 'Reviews',
    articles: [
      {
        outlet: 'luna',
        tape: 'Review',
        date: 'Jul 28',
        title: 'Review: Prince of Darkness 2hollis Returns with New Gothic Emo Single ‘Hurt’',
        href: 'https://www.thelunacollective.co/journal/review-2hollis-hurt',
        image: '2hollis',
      },
      {
        outlet: 'medium',
        title: 'Tuesday Tracks: “wyd” by Remi Wolf',
        dek: 'Fall in love with the fever dream that is Remi Wolf’s debut album ‘Juno.’',
        meta: 'NYU Local · 3 min read · Oct 26, 2021',
        href: 'https://medium.com/nyu-local/tuesday-tracks-wyd-by-remi-wolf-5f31fa1571d3',
        image: 'remi-wolf',
      },
    ],
  },
  {
    label: 'Q&As',
    articles: [
      {
        outlet: 'luna',
        tape: 'Interview',
        title: 'Q&A: Cautious Clay Weighs In on the Power of Community and Fandom',
        href: 'https://www.thelunacollective.co/journal/qa-cautious-clay',
        image: 'cautious-clay',
      },
      {
        outlet: 'luna',
        tape: 'Interview',
        title: 'Q&A: Soft Loft Talk Songwriting Sessions, Life Advice and Phoebe Bridgers',
        href: 'https://www.thelunacollective.co/journal/qa-soft-loft',
        image: 'soft-loft',
      },
    ],
  },
  {
    label: 'Features',
    articles: [
      {
        outlet: 'medium',
        title: 'Clive Davis Hosts Virtual Q&A with Jack Antonoff',
        dek: '“If you surround yourself with people who give you life, then it becomes remarkable how much you can accomplish,” Antonoff said during the 90-minute Zoom call on Friday.',
        meta: 'NYU Local · 6 min read · Sep 13, 2021',
        href: 'https://medium.com/nyu-local/clive-davis-hosts-virtual-q-a-with-jack-antonoff-99f1f9693c10',
        image: 'antonoff',
      },
      {
        outlet: 'medium',
        title: 'Clive Davis Alum Olivia Reid on Her New EP “Earth Water” and Upcoming Spotify Podcast',
        dek: '“The people [in the industry] that have been around for 30 years are waiting for the young people to come in and do cool stuff.”',
        meta: 'NYU Local · 4 min read · Oct 13, 2021',
        href: 'https://medium.com/nyu-local/clive-davis-alum-olivia-reid-on-her-new-ep-earth-water-and-upcoming-spotify-podcast-7bf770e7226',
        image: 'olivia-reid',
      },
    ],
  },
  {
    label: 'Show Coverage',
    articles: [
      {
        outlet: 'medium',
        title: 'NYU Local Takes on Gov Ball',
        dek: 'Local staff writers Anna and Giovanny do an hourly play by play of their Saturday at Governors Ball.',
        meta: '10 min read · Sep 28, 2021',
        href: 'https://medium.com/@acuciure/nyu-local-takes-on-gov-ball-f119d7284e60',
        image: 'gov-ball',
      },
    ],
  },
  {
    label: 'Op-Eds',
    articles: [
      {
        outlet: 'medium',
        title: '‘You’ Season 3: A Tragic Continuation of the Story of an Unchecked Stalker',
        dek: 'No, you still cannot fix Joe Goldberg.',
        meta: 'NYU Local · 4 min read · Oct 21, 2021',
        href: 'https://medium.com/nyu-local/you-season-3-a-tragic-continuation-of-the-story-of-an-unchecked-stalker-4980e0a05891',
        image: 'you-s3',
      },
    ],
  },
]

const newTab = { target: '_blank', rel: 'noopener noreferrer' } as const

export function Publications() {
  return (
    <section
      id="publications"
      className="pubs"
      data-surface="cream"
      aria-labelledby="publications-title"
    >
      <SectionDivider />
      <h2 id="publications-title" className="pubs__title">
        Publications
      </h2>

      <div className="pubs__frame">
        <div className="pubs__grid">
          {GROUPS.map((g) => (
            <div
              key={g.label}
              className="pubs__group"
              data-span={g.articles.length}
              style={{ '--span': g.articles.length } as CSSProperties}
            >
              <h3 className="pubs__group-title">{g.label}</h3>
              <ul className="pubs__cards">
                {g.articles.map((a) => (
                  <li key={a.href}>
                    <ArticleCard article={a} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <p className="pubs__more">
        more on{' '}
        {WRITING.map((m, i) => (
          <span key={m.href}>
            <a href={m.href} {...newTab}>
              {m.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            {i < WRITING.length - 2 ? ', ' : i === WRITING.length - 2 ? ' and ' : ''}
          </span>
        ))}
      </p>
    </section>
  )
}

function ArticleCard({ article: a }: { article: Article }) {
  return (
    <a className="pub" data-outlet={a.outlet} href={a.href} {...newTab}>
      <div className="pub__head">
        {a.outlet === 'luna' ? (
          <>
            {a.date && <span className="pub__date">{a.date}</span>}
            <h4 className="pub__title">{a.title}</h4>
            {/* Decorative: the word repeated along a coloured strip, as on the site. */}
            <span className="pub__tape" data-tape={a.tape} aria-hidden="true">
              <span>{`${a.tape} `.repeat(16)}</span>
            </span>
            <span className="pub__byline">
              <span aria-hidden="true">☆</span> By <u>Anna Cuciurean-Zapan</u>{' '}
              <span aria-hidden="true">☆</span>
            </span>
          </>
        ) : (
          <>
            <h4 className="pub__title">{a.title}</h4>
            <p className="pub__dek">{a.dek}</p>
            <span className="pub__meta">{a.meta}</span>
          </>
        )}
      </div>

      <div className="pub__media">
        <img
          src={`/publications/${a.image}.jpg`}
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        <span className="pub__read">
          Read
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M8 16 16 8M9.5 8H16v6.5" />
          </svg>
        </span>
      </div>
      <span className="sr-only">
        {' '}
        on {OUTLET_NAME[a.outlet]} (opens in a new tab)
      </span>
    </a>
  )
}
