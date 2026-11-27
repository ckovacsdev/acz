import { Nav } from './components/nav/Nav'
import { Hero } from './components/hero/Hero'
import { About } from './components/about/About'
import { Campaigns } from './components/campaigns/Campaigns'
import { Fanpages } from './components/fanpages/Fanpages'
import { Activations } from './components/activations/Activations'
import { Tours } from './components/tours/Tours'
import { Publications } from './components/publications/Publications'
import { Socials } from './components/socials/Socials'
import { Decks } from './components/decks/Decks'
import { Footer } from './components/footer/Footer'
import { Contact } from './components/contact/Contact'
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
        <Socials />

        {/* Decks pins in place while Contact slides up over it, like About over the
            landing. */}
        <div className="cover-stack" ref={contactStackRef}>
          <Decks />
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
