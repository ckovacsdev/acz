import { useId } from 'react'

/**
 * A paper doily drawn procedurally as SVG: a scalloped ellipse with rings of
 * punched cut-outs. Everything is generated once per variant at module load.
 */

type Variant = 'wide' | 'round'

const VARIANTS: Record<Variant, { w: number; h: number; a: number; b: number; n: number }> = {
  wide: { w: 1000, h: 640, a: 466, b: 286, n: 50 },
  round: { w: 1000, h: 900, a: 466, b: 416, n: 56 },
}

type Pt = { x: number; y: number; ang: number }

function makeEllipse(a: number, b: number) {
  const STEPS = 4000
  const lens = [0]
  let px = a
  let py = 0
  let total = 0
  for (let i = 1; i <= STEPS; i++) {
    const t = (i / STEPS) * Math.PI * 2
    const x = a * Math.cos(t)
    const y = b * Math.sin(t)
    total += Math.hypot(x - px, y - py)
    lens.push(total)
    px = x
    py = y
  }

  /** Point at a fraction of the perimeter (equal arc-length), pushed `inset` units inward. */
  function at(frac: number, inset = 0): Pt {
    const target = (((frac % 1) + 1) % 1) * total
    let lo = 0
    let hi = STEPS
    while (lo < hi) {
      const mid = (lo + hi) >> 1
      if (lens[mid] < target) lo = mid + 1
      else hi = mid
    }
    const t = (lo / STEPS) * Math.PI * 2
    const x = a * Math.cos(t)
    const y = b * Math.sin(t)
    let nx = x / (a * a)
    let ny = y / (b * b)
    const len = Math.hypot(nx, ny)
    nx /= len
    ny /= len
    return { x: x - nx * inset, y: y - ny * inset, ang: (Math.atan2(ny, nx) * 180) / Math.PI }
  }

  return { at, total }
}

const f = (v: number) => Math.round(v * 100) / 100

// Local motif shapes. "Outward" is -y; they get rotated onto the ellipse normal.
const TEARDROP = 'M0,-16 C6,-7 8,1 8,6 A8,8 0 0 1 -8,6 C-8,1 -6,-7 0,-16Z'
const LATTICE = [
  [0, -6.5],
  [6.5, 0],
  [0, 6.5],
  [-6.5, 0],
]
  .map(([x, y]) => `M${x},${y - 4.6} L${x + 4.6},${y} L${x},${y + 4.6} L${x - 4.6},${y}Z`)
  .join(' ')
const HEART = 'M0,5 C-7,-1 -7,-7 -3.5,-7 C-1.6,-7 0,-5.6 0,-4 C0,-5.6 1.6,-7 3.5,-7 C7,-7 7,-1 0,5Z'

function build(variant: Variant) {
  const { w, h, a, b, n } = VARIANTS[variant]
  const { at } = makeEllipse(a, b)
  const cx = w / 2
  const cy = h / 2

  // Scalloped outer edge: one semicircular arc per segment, bulging outward.
  const pts = Array.from({ length: n + 1 }, (_, i) => at(i / n))
  let edge = `M${f(pts[0].x + cx)},${f(pts[0].y + cy)}`
  let r = 0
  for (let i = 1; i <= n; i++) {
    const p = pts[i]
    const q = pts[i - 1]
    r = Math.hypot(p.x - q.x, p.y - q.y) / 2
    edge += ` A${f(r)},${f(r)} 0 0 1 ${f(p.x + cx)},${f(p.y + cy)}`
  }
  edge += 'Z'

  const holes: string[] = []
  const place = (d: string, p: Pt, scale = 1) =>
    holes.push(
      `<path d="${d}" transform="translate(${f(p.x + cx)} ${f(p.y + cy)}) rotate(${f(p.ang + 90)}) scale(${scale})"/>`,
    )
  const dot = (p: Pt, rad: number) =>
    holes.push(`<circle cx="${f(p.x + cx)}" cy="${f(p.y + cy)}" r="${f(rad)}"/>`)

  // Motifs were drawn for a ~19-unit scallop; scale them with the real one.
  const k = r / 19

  for (let i = 0; i < n; i++) {
    const mid = (i + 0.5) / n
    // A punched hole in every scallop.
    dot(at(mid, -r * 0.32), r * 0.26)
    // Main band: teardrops alternating with little diamond lattices.
    if (i % 2 === 0) place(TEARDROP, at(mid, r * 2.05), 1.05 * k)
    else place(LATTICE, at(mid, r * 1.85), k)
    // Inner band: hearts between the teardrops, pin-pricks elsewhere.
    if (i % 2 === 1) place(HEART, at(mid, r * 3.4), k)
    else dot(at(mid, r * 3.3), 2.6 * k)
  }
  // Fine perforated border just inside the pattern.
  for (let i = 0; i < n * 3; i++) dot(at(i / (n * 3), r * 4.15), 1.7 * k)

  // Embossed ring around the plain centre.
  const ringPts = Array.from({ length: 180 }, (_, i) => at(i / 180, r * 4.75))
  const ring = 'M' + ringPts.map((p) => `${f(p.x + cx)},${f(p.y + cy)}`).join(' L') + 'Z'

  return { w, h, edge, holes: holes.join(''), ring }
}

const CACHE: Partial<Record<Variant, ReturnType<typeof build>>> = {}
const get = (v: Variant) => (CACHE[v] ??= build(v))

export function Doily({ variant, className }: { variant: Variant; className?: string }) {
  const { w, h, edge, holes, ring } = get(variant)
  const uid = useId().replace(/:/g, '')
  const mask = `doily-mask-${uid}`
  const grain = `doily-grain-${uid}`

  return (
    <svg className={className} viewBox={`0 0 ${w} ${h}`} aria-hidden="true" focusable="false">
      <defs>
        <mask id={mask} maskUnits="userSpaceOnUse" x="0" y="0" width={w} height={h}>
          <path d={edge} fill="#fff" />
          <g fill="#000" dangerouslySetInnerHTML={{ __html: holes }} />
        </mask>
        <filter id={grain} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" />
          <feColorMatrix values="0 0 0 0 0.45  0 0 0 0 0.3  0 0 0 0 0.33  0 0 0 0.9 -0.32" />
        </filter>
      </defs>
      <g mask={`url(#${mask})`}>
        <rect width={w} height={h} fill="var(--paper)" />
        <rect width={w} height={h} filter={`url(#${grain})`} opacity="0.35" />
        <path d={ring} fill="none" stroke="var(--emboss-shade)" strokeWidth="3" />
        <path d={ring} fill="none" stroke="#fff" strokeWidth="2" transform="translate(0 2.5)" />
      </g>
    </svg>
  )
}
