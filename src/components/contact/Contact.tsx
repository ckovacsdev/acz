import { useEffect, useRef, useState } from 'react'
import { DotFlower } from '../dot-flower/DotFlower'
import { INSTAGRAM_URL, RESUME_URL, copyEmail } from '../../contact'
import './Contact.css'

export function Contact() {
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const onCopy = async () => {
    // Where copying isn't possible, copyEmail opens the visitor's email app instead.
    if (await copyEmail()) {
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <section id="contact" className="contact" data-surface="pink" aria-labelledby="contact-title">
      {/* Scalloped pink edges where this section meets the black above and below. */}
      <span className="sheet-edge" aria-hidden="true" />
      <span className="sheet-edge sheet-edge--bottom" aria-hidden="true" />
      <DotFlower className="contact__flower contact__flower--top" />
      <DotFlower className="contact__flower contact__flower--bottom" />

      <div className="contact__inner">
        <h2 id="contact-title" className="contact__title">
          Let’s Connect
        </h2>

        <div className="contact__actions">
          <a
            className="contact__button"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon />
            <span>
              Instagram
              <span className="sr-only"> (opens in a new tab)</span>
            </span>
          </a>

          <button
            type="button"
            className="contact__button"
            data-copied={copied || undefined}
            onClick={onCopy}
          >
            {copied ? <CheckIcon /> : <MailIcon />}
            <span>{copied ? 'Email copied' : 'Copy email'}</span>
          </button>

          <a className="contact__button" href={RESUME_URL} target="_blank" rel="noopener">
            <ResumeIcon />
            <span>
              Resume
              <span className="sr-only"> (PDF, opens in a new tab)</span>
            </span>
          </a>
        </div>

        {/* Announces the copy to screen readers. */}
        <p className="sr-only" role="status" aria-live="polite">
          {copied ? 'Email address copied to your clipboard' : ''}
        </p>
      </div>
    </section>
  )
}

const svgProps = {
  className: 'contact__icon',
  viewBox: '0 0 24 24',
  'aria-hidden': true,
  focusable: false,
} as const

const InstagramIcon = () => (
  <svg {...svgProps}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.6" className="contact__icon-dot" />
  </svg>
)

const MailIcon = () => (
  <svg {...svgProps}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
    <path d="m4.5 7 7.5 6 7.5-6" />
  </svg>
)

const ResumeIcon = () => (
  <svg {...svgProps}>
    <path d="M14 3.5H7.5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V8Z" />
    <path d="M14 3.5V8h4.5M9 12.5h6M9 16h6" />
  </svg>
)

const CheckIcon = () => (
  <svg {...svgProps}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
)
