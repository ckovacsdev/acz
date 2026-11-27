import { DotFlower } from './DotFlower'
import './SectionDivider.css'

/**
 * A small dotted rose between dotted rules, marking where one cream section ends and the
 * next begins. Purely decorative.
 */
export function SectionDivider() {
  return (
    <div className="section-divider" aria-hidden="true">
      <span className="section-divider__rule" />
      <DotFlower className="section-divider__rose" dot={3.4} />
      <span className="section-divider__rule" />
    </div>
  )
}
