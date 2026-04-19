export type Stats = {
  combat: number;
  defence: number;
  stamina: number;
};

export function rollDice(): number {
  return Math.floor(Math.random() * 12) + 1;
}

export function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

export function cloneStats(stats: Stats): Stats {
  return { ...stats };
}
