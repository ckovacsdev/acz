import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Campaigns } from './components/Campaigns'
import { SECTIONS } from './sections'
import { useInPageLinks } from './hooks/useInPageLinks'
import { useCoverStack } from './hooks/useCoverStack'
import { useRef } from 'react'
import './App.css'

function App() {
  useInPageLinks()
  const stackRef = useRef<HTMLDivElement>(null)
  useCoverStack(stackRef)

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

        {/* Placeholder sections so the nav has somewhere to go. Each gets designed next. */}
        {SECTIONS.filter((s) => s.id !== 'about' && s.id !== 'work').map((s) => (
          <section key={s.id} id={s.id} className="section" aria-labelledby={`${s.id}-title`}>
            <h2 id={`${s.id}-title`} className="section__title">
              {s.label}
            </h2>
            <p className="section__placeholder">Coming soon: {s.hint}.</p>
          </section>
        ))}
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} Anna Cuciurean-Zapan</p>
      </footer>
    </>
  )
}

export default App
