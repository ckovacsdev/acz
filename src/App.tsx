import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { SECTIONS } from './sections'
import { useInPageLinks } from './hooks/useInPageLinks'
import './App.css'

function App() {
  useInPageLinks()

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

        {/* The landing stays pinned while About slides up over it (see App.css). */}
        <div className="cover-stack">
          <Hero />
          <About />
        </div>

        {/* Placeholder sections so the nav has somewhere to go. Each gets designed next. */}
        {SECTIONS.filter((s) => s.id !== 'about').map((s) => (
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
