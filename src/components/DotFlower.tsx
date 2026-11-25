import { FLOWER_DOTS, FLOWER_HEIGHT, FLOWER_WIDTH } from './dotFlowerData'

const DOTS = FLOWER_DOTS.split(' ').map((pair) => pair.split(',').map(Number))

/** The cross-stitch rose from the Canva design, drawn as dots in the current text colour. */
export function DotFlower({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox={`0 0 ${FLOWER_WIDTH} ${FLOWER_HEIGHT}`}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="currentColor">
        {DOTS.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.3" />
        ))}
      </g>
    </svg>
  )
}
