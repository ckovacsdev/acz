import { useEffect, useRef, useState } from 'react'
import { DotFlower } from './DotFlower'
import './Contact.css'

const INSTAGRAM_URL = 'https://www.instagram.com/aczapan/'

// The address is stored reversed and base64-encoded and only assembled when someone clicks
// "Copy email", so it never appears as plain text in the page or its HTML for scrapers.
const ENCODED_EMAIL = 'bW9jLmxpYW1nQGVydWljdWNh'
const email = () => atob(ENCODED_EMAIL).split('').reverse().join('')

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Older browsers, or the clipboard permission was refused: try the legacy route.
    const area = document.createElement('textarea')
    area.value = text
    area.setAttribute('readonly', '')
    area.style.position = 'fixed'
    area.style.opacity = '0'
    document.body.appendChild(area)
    area.select()
    const ok = document.execCommand('copy')
    area.remove()
    return ok
  }
}

export function Contact() {
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const onCopy = async () => {
    const address = email()
    if (await copyText(address)) {
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 2500)
    } else {
      // Copying isn't possible here, so open the visitor's email app instead.
      window.location.href = `mailto:${address}`
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
        {/* TODO: swap in Anna's own words. */}
        <p className="contact__intro">
          Working on a release, a tour or a fan campaign? I’d love to hear about it.
        </p>

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

const CheckIcon = () => (
  <svg {...svgProps}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
)
