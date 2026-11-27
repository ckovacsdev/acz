import './Campaigns.css'

type Campaign = {
  artist: string
  /** The release, shown in quotes; soundtracks use a plain description instead. */
  release: string
  quoted: boolean
  cover: string
}

// Official artwork (600×600) lives in public/campaigns/.
const CAMPAIGNS: Campaign[] = [
  { artist: 'Ariana Grande', release: 'eternal sunshine: deluxe', quoted: true, cover: 'ariana-grande' },
  { artist: 'Conan Gray', release: 'Wishbone', quoted: true, cover: 'conan-gray' },
  { artist: 'Stray Kids', release: 'KARMA', quoted: true, cover: 'stray-kids' },
  { artist: 'Wallows', release: 'Model', quoted: true, cover: 'wallows' },
  { artist: 'KPop Demon Hunters', release: 'Movie soundtrack', quoted: false, cover: 'kpop-demon-hunters' },
  { artist: 'The Marías', release: 'Submarine', quoted: true, cover: 'the-marias' },
  { artist: 'Wicked', release: 'Movie soundtrack', quoted: false, cover: 'wicked' },
  { artist: 'Wicked: For Good', release: 'Movie soundtrack', quoted: false, cover: 'wicked-for-good' },
  { artist: 'Kid Cudi', release: 'Free', quoted: true, cover: 'kid-cudi' },
  { artist: 'Cynthia Erivo', release: 'I Forgive You', quoted: true, cover: 'cynthia-erivo' },
  { artist: 'Miranda Lambert', release: 'Postcards From Texas', quoted: true, cover: 'miranda-lambert' },
  {
    artist: 'Alex Warren',
    release: 'You’ll Be Alright, Kid (Chapter 1)',
    quoted: true,
    cover: 'alex-warren',
  },
]

export function Campaigns() {
  return (
    <section id="work" className="campaigns" data-surface="cream" aria-labelledby="work-title">
      {/* Scalloped cream edge where this sheet slides up over the pink About page. */}
      <span className="sheet-edge" aria-hidden="true" />
      <h2 id="work-title" className="campaigns__title">
        Campaigns
      </h2>

      <ul className="campaigns__grid">
        {CAMPAIGNS.map((c) => (
          <li key={c.cover} className="campaign">
            <img
              className="campaign__cover"
              src={`/campaigns/${c.cover}.jpg`}
              alt={`${c.artist}, ${c.quoted ? `“${c.release}”` : c.release.toLowerCase()} cover art`}
              width={600}
              height={600}
              loading="lazy"
              decoding="async"
            />
            <p className="campaign__artist">{c.artist}</p>
            <p className="campaign__release">{c.quoted ? `‘${c.release}’` : c.release}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
