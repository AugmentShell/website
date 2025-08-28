type ArrowRightProps = {
  size?: number;        // rendered CSS size (px)
  tail?: number;        // tail length in viewBox units
  head?: number;        // arrowhead width
  strokeWidth?: number; // stroke thickness
  className?: string;
};

export function LongArrowRight({
  size = 48,
  tail = 54,
  head = 7,
  strokeWidth = 2,
  className = "",
}: ArrowRightProps) {
  // Geometry (24-high icon with arrow centered vertically)
  const midY = 12;
  const halfHeadH = 7;          // head vertical reach above/below mid
  const topY = midY - halfHeadH;
  const bottomY = midY + halfHeadH;

  // Content width without padding
  const contentWidth = tail + head;   // tail ends at `tail`, head reaches to `tail + head`
  const contentHeight = bottomY - topY; // 14

  // Pad the viewBox by half the stroke so stroke caps never clip
  const pad = strokeWidth / 2;

  const vbX = -pad;
  const vbY = topY - pad;
  const vbW = contentWidth + strokeWidth;   // + pad left + pad right
  const vbH = contentHeight + strokeWidth;  // + pad top + pad bottom

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size * 3}
      height={size}
      viewBox={`${vbX} ${vbY} ${vbW} ${vbH}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      // Keep strokes the same thickness when scaling the SVG:
      vectorEffect="non-scaling-stroke"
      className={className}
    >
      {/* Tail */}
      <line x1={0} y1={midY} x2={tail} y2={midY} />
      {/* Arrowhead */}
      <polyline points={`${tail},${topY} ${tail + head},${midY} ${tail},${bottomY}`} />
    </svg>
  );
}