import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Campaigns } from './components/Campaigns'
import { Fanpages } from './components/Fanpages'
import { Activations } from './components/Activations'
import { Tours } from './components/Tours'
import { Publications } from './components/Publications'
import { Contact } from './components/Contact'
import { SECTIONS } from './sections'
import { useInPageLinks } from './hooks/useInPageLinks'
import { useCoverStack } from './hooks/useCoverStack'
import { useRef } from 'react'
import './App.css'

function App() {
  useInPageLinks()
  const stackRef = useRef<HTMLDivElement>(null)
  const contactStackRef = useRef<HTMLDivElement>(null)
  useCoverStack(stackRef)
  useCoverStack(contactStackRef)

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        {/* "Home" links land here. It can't be the hero itself: a pinned (sticky) element
            always reports being at the top already, so the browser wouldn't scroll to it. */}
        <div id="top" />

        {/* Each section pins in place while the next slides up over it (see App.css). */}
        <div className="cover-stack" ref={stackRef}>
          <Hero />
          <About />
          <Campaigns />
        </div>

        {/* These carry straight on from Campaigns on the same cream, with no sheet effect. */}
        <Fanpages />
        <Activations />
        <Tours />
        <Publications />

        {/* The section before Contact pins in place while Contact slides up over it, like
            About over the landing. */}
        <div className="cover-stack" ref={contactStackRef}>
          {/* Placeholder sections so the nav has somewhere to go. Each gets designed next. */}
          {SECTIONS.filter(
            (s) =>
              !['about', 'work', 'fanpages', 'activations', 'tours', 'publications', 'contact'].includes(s.id),
          ).map((s) => (
            <section key={s.id} id={s.id} className="section" aria-labelledby={`${s.id}-title`}>
              <h2 id={`${s.id}-title`} className="section__title">
                {s.label}
              </h2>
              <p className="section__placeholder">Coming soon: {s.hint}.</p>
            </section>
          ))}
          <Contact />
        </div>
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} Anna Cuciurean-Zapan</p>
      </footer>
    </>
  )
}

export default App
