import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import FlipCard from '../flip-card/FlipCard'
import { TikTokMock } from '../tiktok-mock/TikTokMock'
import { SectionDivider } from '../section-divider/SectionDivider'
import './Activations.css'

// Photo collages live in public/activations/. `fit: 'contain'` shows an image whole,
// letterboxed on the black card, for ones too tall or wide to crop to the shared shape.
// `clips` shows mock TikTok phones instead of a single image: each a still, or a video
// with its poster frame (all in public/activations/).
const ACTIVATIONS: {
  title: string
  image: string
  alt: string
  fit?: 'contain'
  clips?: { still: string; video?: string }[]
  body: string[]
}[] = [
  {
    title: '‘eternal sunshine: deluxe’ Short Film Screenings',
    image: 'eternal-sunshine-screenings',
    alt: 'Collage from the screenings: a theater marquee for “Brighter Days Ahead”, merch and check-in tables, ‘eternal sunshine’ popcorn, a full screening room and fans with the film’s poster.',
    body: [
      'Exclusive screenings of Ariana Grande’s 30-minute short film for thousands of fans in New York, LA, Chicago and Boca Raton. ‘eternal sunshine’ themed decor was shipped nationwide while maintaining close communication with all theater staff to make sure each event ran smoothly. Theaters sold ‘eternal sunshine’ branded popcorn as well as the artist’s official merch.',
      'Fans were methodically checked in and given commemorative movie tickets, wristbands and postcards, and photographed with permission to be featured on official Ariana fan pages.',
    ],
  },
  {
    title: 'Cynthia Erivo Fan Album Listening Party',
    image: 'cynthia-erivo-listening-party',
    alt: 'Collage from the listening party: the ‘I Forgive You’ artwork on a video wall and backdrop, a dimly lit lounge, a crowd of fans and a signature drinks menu with champagne.',
    body: [
      'An invite-only early listening event for Cynthia’s album ‘I Forgive You’ for her top fans at Republic Studios. The space was completely transformed to be chic, dimly lit and intimate.',
      'Dinner and drinks were served, and fans listened to the entire album alongside Cynthia before a meet and greet with photos.',
    ],
  },
  {
    title: 'Jake Minch Fan Photographer Sign Up',
    image: 'jake-minch-photographer',
    fit: 'contain',
    alt: 'The fan photographer sign-up form, listing the tour dates from Salt Lake City to San Diego, beside the “Getting Big Tour” poster offering a VIP ticket and a Kodak Charmera camera.',
    body: [
      'Going into his “Getting Big Tour” on the West Coast, Jake Minch and his team were looking for ways to engage his fanbase pre-tour.',
      'Through his SWSH album, his team launched a pop up sign up for one fan at each show to win a VIP ticket and the chance to be the show’s photographer for the night (collaborating with Kodak). Our CRM captured around 700 fan emails for future marketing.',
    ],
  },
  {
    title: 'TikTok Catalog Campaign',
    image: 'tiktok-catalog-campaign',
    clips: [
      { still: 'tiktok-lock-in' },
      // From @unsentlyricz_ and @lovesickmemes on TikTok.
      { still: 'tiktok-unsentlyricz', video: 'tiktok-unsentlyricz' },
      { still: 'tiktok-lovesickmemes', video: 'tiktok-lovesickmemes' },
    ],
    alt: 'Three fan page TikToks from the campaign on mock phone screens: “time to lock in diva”, and two playing videos, “you can go ahead tell them” and “how it feels to be with the guy you thought would never like you”.',
    body: [
      'Fanpage activation to boost catalog streams for select group of 5 artists through the use of genre pages focusing on relationships, love and heartbreak.',
      'Created pitch deck for label, built 12 organic fanpages across TikTok and Instagram and posted 2x daily on each. Results generated over 5M impressions, coupled with paid ads (as of 11/19).',
    ],
  },
]

const FlipIcon = () => (
  <svg className="activation__cue-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M3.5 12a8.5 8.5 0 0 1 14.6-5.9L20.5 8.5" />
    <path d="M20.5 3.5v5h-5" />
    <path d="M20.5 12a8.5 8.5 0 0 1-14.6 5.9L3.5 15.5" />
    <path d="M3.5 20.5v-5h5" />
  </svg>
)

/** "Click to …" on devices with a mouse, "Tap to …" on touch screens. */
const Cue = ({ action }: { action: string }) => (
  <span className="activation__cue" aria-hidden="true">
    <FlipIcon />
    <span className="activation__cue-fine">Click {action}</span>
    <span className="activation__cue-coarse">Tap {action}</span>
  </span>
)

export function Activations() {
  // The card faces are absolutely positioned, so a card can't size itself. Measure what each
  // face needs (everything except the flexible spacer) and size each card to its taller
  // face. Cards that share a row (two columns on desktop) take the row's tallest, so they
  // stay level; stacked on phones, each card keeps its own height.
  const faceRefs = useRef<(HTMLDivElement | null)[]>([])
  const listRef = useRef<HTMLDivElement>(null)
  const [heights, setHeights] = useState<number[]>(() => ACTIVATIONS.map(() => 520))

  useLayoutEffect(() => {
    const faces = faceRefs.current.filter((el): el is HTMLDivElement => !!el)
    const px = (v: string) => parseFloat(v) || 0
    // A few pixels of slack so rounding or font differences between browsers never clip
    // the last line or the cue.
    const BUFFER = 6

    const need = (face: HTMLElement) => {
      const cs = getComputedStyle(face)
      let total = px(cs.paddingTop) + px(cs.paddingBottom)
      for (const child of Array.from(face.children) as HTMLElement[]) {
        if (child.classList.contains('activation__spacer')) continue
        const c = getComputedStyle(child)
        // Exact (fractional) heights; offsetHeight rounds and can come up short.
        total += child.getBoundingClientRect().height + px(c.marginTop) + px(c.marginBottom)
      }
      return Math.ceil(total) + BUFFER
    }

    const measure = () => {
      const own = ACTIVATIONS.map((_, i) =>
        Math.max(need(faceRefs.current[i * 2]!), need(faceRefs.current[i * 2 + 1]!)),
      )
      const articles = Array.from(listRef.current?.children ?? []) as HTMLElement[]
      const next = own.map((h, i) => {
        const row = articles[i]?.offsetTop
        return Math.max(h, ...own.filter((_, j) => articles[j]?.offsetTop === row))
      })
      setHeights((prev) => (prev.every((h, i) => h === next[i]) ? prev : next))
    }

    measure()
    // Watch the content too: the faces themselves are pinned to the card's height, so text
    // reflowing inside them (e.g. once the web fonts load) wouldn't otherwise be noticed.
    const ro = new ResizeObserver(measure)
    faces.forEach((el) => {
      ro.observe(el)
      Array.from(el.children).forEach((child) => ro.observe(child))
    })
    // And once more when the web fonts and images have finished loading, in case the
    // observer misses a late reflow.
    let alive = true
    const later = () => alive && measure()
    document.fonts?.ready.then(later)
    window.addEventListener('load', later)
    return () => {
      alive = false
      ro.disconnect()
      window.removeEventListener('load', later)
    }
  }, [])

  // A small "peek" wobble the first time each card scrolls into view, hinting that it turns.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const cards = Array.from(listRef.current?.querySelectorAll<HTMLElement>('.activation') ?? [])
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          e.target.classList.add('activation--peek')
          io.unobserve(e.target)
        })
      },
      { threshold: 0.6 },
    )
    cards.forEach((c) => io.observe(c))
    return () => io.disconnect()
  }, [])

  return (
    <section
      id="activations"
      className="activations"
      data-surface="cream"
      aria-labelledby="activations-title"
    >
      <SectionDivider />
      <h2 id="activations-title" className="activations__title">
        Fandom Activations
      </h2>

      <div className="activations__list" ref={listRef}>
        {ACTIVATIONS.map((a, i) => (
          <article key={a.image} className="activation">
            <FlipCard
              className="activation__card"
              ariaLabel={`${a.title}: show or hide the details`}
              width={2000}
              height={heights[i]}
              radius={18}
              background="#000"
              color="var(--cream)"
              tiltMax={6}
              glareOpacity={0.14}
              hoverScale={1.015}
              shadowOpacity={0.22}
              front={
                <div
                  className="activation__face activation__face--front"
                  ref={(el) => void (faceRefs.current[i * 2] = el)}
                >
                  {a.clips ? (
                    <TikTokMock
                      clips={a.clips.map((c) => ({
                        still: `/activations/${c.still}.jpg`,
                        video: c.video && `/activations/${c.video}.mp4`,
                      }))}
                      label={a.alt}
                    />
                  ) : (
                    <img
                      className={`activation__image${a.fit === 'contain' ? ' activation__image--contain' : ''}`}
                      src={`/activations/${a.image}.jpg`}
                      alt={a.alt}
                      width={800}
                      height={540}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />
                  )}
                  <h3 className="activation__title">{a.title}</h3>
                  {/* Fills whatever height the card has spare (it's sized to the longer back)
                      with the opening of the description, fading out above the cue. Screen
                      readers get the full text on the back instead. */}
                  <p className="activation__spacer activation__teaser" aria-hidden="true">
                    {a.body[0]}
                  </p>
                  <Cue action="to read more" />
                </div>
              }
              back={
                <div
                  className="activation__face activation__face--back"
                  ref={(el) => void (faceRefs.current[i * 2 + 1] = el)}
                >
                  <h3 className="activation__title">{a.title}</h3>
                  {a.body.map((p) => (
                    <p key={p.slice(0, 24)} className="activation__text">
                      {p}
                    </p>
                  ))}
                  <span className="activation__spacer" aria-hidden="true" />
                  <Cue action="to see photos" />
                </div>
              }
            />
          </article>
        ))}
      </div>
    </section>
  )
}
