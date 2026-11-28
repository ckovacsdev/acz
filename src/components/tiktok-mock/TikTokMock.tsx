import { useEffect, useRef } from 'react'
import './TikTokMock.css'

/**
 * One phone's content: a still image, or a short video (served from public/) with a poster
 * frame to show until it plays.
 */
export type TikTokClip = { still: string; video?: string }

/**
 * Three phone-sized TikTok screens with a mock of the app's interface (tabs, action buttons,
 * caption and sound lines, a progress bar). Videos play muted on a loop, like a feed, but
 * only while they're on screen; stills of landscape clips sit over a blurred copy of
 * themselves, the way TikTok fills the screen around them. The handle and caption are drawn
 * as plain bars rather than invented text.
 */
export function TikTokMock({ clips, label }: { clips: TikTokClip[]; label: string }) {
  return (
    <div className="tiktok" role="img" aria-label={label}>
      {clips.map((clip, i) => (
        <Phone key={clip.still} clip={clip} pos={i} />
      ))}
    </div>
  )
}

function Phone({ clip, pos }: { clip: TikTokClip; pos: number }) {
  const phoneRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Play only while the phone is on screen (and never for visitors who prefer less motion,
  // who see the poster frame instead). The progress bar follows the video.
  useEffect(() => {
    const phone = phoneRef.current
    const video = videoRef.current
    if (!phone || !video) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.25 },
    )
    const onTime = () => {
      if (video.duration) phone.style.setProperty('--progress', `${(video.currentTime / video.duration) * 100}%`)
    }
    video.addEventListener('timeupdate', onTime)
    io.observe(phone)
    return () => {
      io.disconnect()
      video.removeEventListener('timeupdate', onTime)
    }
  }, [])

  return (
    <div ref={phoneRef} className="tiktok__phone" data-pos={pos}>
      {clip.video ? (
        <video
          ref={videoRef}
          className="tiktok__clip"
          src={clip.video}
          poster={clip.still}
          muted
          loop
          playsInline
          preload="none"
          disablePictureInPicture
          tabIndex={-1}
        />
      ) : (
        <>
          <img className="tiktok__fill" src={clip.still} alt="" loading="lazy" decoding="async" draggable={false} />
          <img className="tiktok__video" src={clip.still} alt="" loading="lazy" decoding="async" draggable={false} />
        </>
      )}

      <div className="tiktok__ui" aria-hidden="true">
        <div className="tiktok__tabs">
          <span>Following</span>
          <span className="tiktok__tab--on">For You</span>
        </div>

        <div className="tiktok__actions">
          <span className="tiktok__avatar" />
          <Icon d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7C19.5 15.9 12 20.5 12 20.5Z" />
          <Icon d="M12 4.5c4.7 0 8 3 8 6.8s-3.3 6.8-8 6.8c-.9 0-1.8-.1-2.6-.3L5 19.5l1.1-3.4C4.8 14.9 4 13.2 4 11.3 4 7.5 7.3 4.5 12 4.5Z" />
          <Icon d="M7 4.5h10v15l-5-3.6-5 3.6Z" />
          <Icon d="M13 5.5 20 12l-7 6.5v-4C8 14.5 5.5 16 4 19c.5-5.5 3.5-9.4 9-9.5Z" />
        </div>

        <div className="tiktok__meta">
          <span className="tiktok__bar tiktok__bar--handle" />
          <span className="tiktok__bar" />
          <span className="tiktok__sound">
            <svg viewBox="0 0 24 24">
              <path d="M9 17.5V6l10-2v11.5" />
              <circle cx="6.5" cy="17.5" r="2.5" />
              <circle cx="16.5" cy="15.5" r="2.5" />
            </svg>
            <span className="tiktok__bar tiktok__bar--sound" />
          </span>
        </div>

        <span className="tiktok__progress" />
      </div>
    </div>
  )
}

const Icon = ({ d }: { d: string }) => (
  <svg className="tiktok__icon" viewBox="0 0 24 24">
    <path d={d} />
  </svg>
)
