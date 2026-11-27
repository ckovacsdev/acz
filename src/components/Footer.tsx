import { useEffect, useRef, useState } from 'react'
import { SECTIONS } from '../sections'
import { INSTAGRAM_URL, WRITING, copyEmail } from '../contact'
import './Footer.css'

const newTab = { target: '_blank', rel: 'noopener noreferrer' } as const
const NewTabNote = () => <span className="sr-only"> (opens in a new tab)</span>

/** A quiet sign-off: who Anna is, a map of the page, her writing and how to reach her. */
export function Footer() {
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const onCopy = async () => {
    if (await copyEmail()) {
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <a href="#top" className="footer__name">
            Anna Cuciurean-Zapan
          </a>
          <p className="footer__blurb">
            Music industry professional working across marketing, social media, PR and
            journalism. BA in journalism, MA in music business.
          </p>
          <p className="footer__copyright">© {new Date().getFullYear()} Anna Cuciurean-Zapan</p>
        </div>

        <nav className="footer__col footer__col--explore" aria-labelledby="footer-explore">
          <h2 id="footer-explore" className="footer__heading">
            Explore
          </h2>
          <ul className="footer__list">
            {SECTIONS.filter((s) => s.id !== 'contact').map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>{s.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__col">
          <h2 className="footer__heading">Writing</h2>
          <ul className="footer__list">
            {WRITING.map((w) => (
              <li key={w.href}>
                <a href={w.href} {...newTab}>
                  {w.label}
                  <NewTabNote />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h2 className="footer__heading">Get in touch</h2>
          <ul className="footer__list">
            <li>
              <a href={INSTAGRAM_URL} {...newTab}>
                Instagram
                <NewTabNote />
              </a>
            </li>
            <li>
              <button type="button" className="footer__copy" onClick={onCopy}>
                {copied ? 'Email copied' : 'Copy email'}
              </button>
              <span className="sr-only" role="status" aria-live="polite">
                {copied ? 'Email address copied to your clipboard' : ''}
              </span>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
