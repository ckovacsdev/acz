import { FLOWER_DOTS, FLOWER_HEIGHT, FLOWER_WIDTH } from './dotFlowerData'

const DOTS = FLOWER_DOTS.split(' ').map((pair) => pair.split(',').map(Number))

/**
 * The cross-stitch rose from the Canva design, drawn as dots in the current text colour.
 * `dot` is the dot radius in design units; small roses need larger dots to stay visible.
 */
export function DotFlower({ className, dot = 2.3 }: { className?: string; dot?: number }) {
  return (
    <svg
      className={className}
      viewBox={`0 0 ${FLOWER_WIDTH} ${FLOWER_HEIGHT}`}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="currentColor">
        {DOTS.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={dot} />
        ))}
      </g>
    </svg>
  )
}
