/**
 * GooeyFilter Component
 *
 * SVG filter that creates a blob-merge gooey effect on overlapping elements.
 * Used by CGMWTNOV2025Hero and NewFooter components to create the futuristic
 * "liquid metal" aesthetic when elements overlap.
 *
 * Usage:
 * - Import and render once per page
 * - Apply via CSS: `filter: url("#goo");`
 *
 * Source: CGMWTNOV2025 (Orbit Matter) project
 */

export function GooeyFilter() {
  return (
    <svg
      style={{ visibility: "hidden", position: "absolute" }}
      width="0"
      height="0"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      aria-hidden="true"
    >
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
}
