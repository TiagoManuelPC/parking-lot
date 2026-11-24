/** A clock that can be moved forward, so the demo can show hourly prices (D1). */
export class Clock {
  private offset = 0;

  /** `source` gives the real time; pass a fixed number for a frozen clock in tests. */
  constructor(private readonly source: number | (() => number) = Date.now) {}

  now(): number {
    const base = typeof this.source === 'number' ? this.source : this.source();
    return base + this.offset;
  }

  advance(ms: number): void {
    this.offset += ms;
  }

  /** How far the demo clock has been moved forward. */
  get skipped(): number {
    return this.offset;
  }
}
