export interface ProcessFrame {
  from: number;
  to: number;
  mix: number;
  active: number;
}

export function getProcessFrame(progress: number, steps: number): ProcessFrame {
  const position = Math.min(1, Math.max(0, progress)) * steps;
  const nearest = Math.round(position);
  const distance = position - nearest;
  const halfWidth = 0.25;

  if (nearest > 0 && nearest < steps && Math.abs(distance) < halfWidth) {
    const fraction = (distance + halfWidth) / (halfWidth * 2);
    const mix = fraction * fraction * (3 - 2 * fraction);
    return { from: nearest - 1, to: nearest, mix, active: mix >= 0.5 ? nearest : nearest - 1 };
  }

  const active = Math.min(steps - 1, Math.floor(position));
  return { from: active, to: active, mix: 0, active };
}
