import { Doily } from './Doily'
import './Hero.css'

export function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-name">
      <div className="hero__plate">
        <Doily variant="wide" className="hero__doily hero__doily--wide" />
        <Doily variant="round" className="hero__doily hero__doily--round" />
        <h1 id="hero-name" className="hero__name">
          <span>Anna</span> <span>Cuciurean-Zapan</span>
        </h1>
      </div>

      {/* The Canva tagline, with each end doubling as a way into the page. */}
      <p className="hero__tagline">
        <a href="#about" className="hero__link hero__link--start">
          Music industry professional
        </a>
        <span className="hero__leader" aria-hidden="true" />
        <a href="#work" className="hero__link hero__link--end">
          Creative portfolio
        </a>
      </p>
    </section>
  )
}
