import { DotFlower } from './DotFlower'
import './About.css'

// Quick facts, drawn straight from the copy below, for people who skim.
const FACTS = [
  { term: 'Experience', value: '3+ years' },
  { term: 'Master’s', value: 'Music business' },
  { term: 'Bachelor’s', value: 'Journalism' },
  { term: 'Focus', value: 'Marketing, social, PR, journalism' },
]

export function About() {
  return (
    <section id="about" className="about" data-surface="pink" aria-labelledby="about-title">
      {/* Doily-style scalloped trim where the pink sheet meets the black landing. */}
      <span className="sheet-edge" aria-hidden="true" />
      <DotFlower className="about__flower about__flower--top" />
      <DotFlower className="about__flower about__flower--bottom" />

      <div className="about__inner">
        <h2 id="about-title" className="about__title">
          Hi, I’m Anna!
        </h2>

        <div className="about__body">
          <div className="about__copy">
            <p className="about__lead">
              With 3+ years of experience in marketing, social media, PR, journalism and more, my
              passion lies in making visions come true.
            </p>
            <p>
              Having earned my bachelor’s in journalism and master’s in music business, I’m well
              versed in every corner of the musicverse. With a fluency in fandom, I understand what
              makes fans listen, what keeps them engaged and what makes them come out to shows.
            </p>
            <p>
              I believe music is the core of understanding someone. Music is an identity, and being
              a part of this industry means helping shape, form and nurture every single artist and
              fan.
            </p>
            <p>
              In all my roles I bring a personable, professional and positive energy. I’ll be the
              “yes, and…” in the office while constantly pushing my own and others’ creativity to
              the max.
            </p>
          </div>

          <dl className="about__facts">
            {FACTS.map((f) => (
              <div key={f.term} className="about__fact">
                <dt>{f.term}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
