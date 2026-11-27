import { SectionDivider } from './SectionDivider'
import './Tours.css'

type Tour = { artist: string; tour: string; poster: string }

// Posters live in public/tours/. Two rows of five, as in the design.
const ROWS: Tour[][] = [
  [
    { artist: 'Bruno Mars', tour: 'The Romantic Tour', poster: 'bruno-mars' },
    { artist: 'Tate McRae', tour: 'Miss Possessive Tour', poster: 'tate-mcrae' },
    { artist: 'TWICE', tour: 'This Is For World Tour', poster: 'twice' },
    {
      artist: 'Playboi Carti, Ken Carson, Destroy Lonely and Homixide Gang',
      tour: 'Antagonist Tour',
      poster: 'antagonist',
    },
    { artist: 'Kaytranada and Justice', tour: 'Fall ’25 Tour', poster: 'kaytranada-justice' },
  ],
  [
    { artist: 'Reneé Rapp', tour: 'Bite Me Tour', poster: 'renee-rapp' },
    { artist: 'Dave Matthews Band', tour: 'Summer Tour 2026', poster: 'dave-matthews-band' },
    { artist: 'mgk', tour: 'Lost Americana Tour', poster: 'mgk' },
    { artist: 'The Who', tour: 'The Song Is Over North American Farewell Tour', poster: 'the-who' },
    { artist: 'Bon Jovi', tour: 'Forever Tour', poster: 'bon-jovi' },
  ],
]

// Each row repeats its posters so the loop never runs out of track (see Tours.css).
const COPIES = 3

export function Tours() {
  return (
    <section id="tours" className="tours" data-surface="cream" aria-labelledby="tours-title">
      <SectionDivider />
      <h2 id="tours-title" className="tours__title">
        Tours
      </h2>

      {/* The moving reel is decorative repetition; screen readers get this list instead. */}
      <ul className="sr-only">
        {ROWS.flat().map((t) => (
          <li key={t.poster}>
            {t.artist}: {t.tour}
          </li>
        ))}
      </ul>

      <div className="tours__reel" aria-hidden="true">
        {ROWS.map((row, r) => (
          <div key={r} className="tours__row" data-row={r}>
            <div className="tours__track">
              {Array.from({ length: COPIES }, (_, copy) =>
                row.map((t) => (
                  <img
                    key={`${copy}-${t.poster}`}
                    className="tours__poster"
                    src={`/tours/${t.poster}.jpg`}
                    alt=""
                    width={360}
                    height={415}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                )),
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
