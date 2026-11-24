import type { VehicleType } from './vehicles';

/** Hourly rates in pence: the 1st hour, each of the 2nd and 3rd, and each hour after. */
export interface Rates {
  first: number;
  second: number;
  later: number;
}

export const RATES: Record<VehicleType, Rates> = {
  car: { first: 400, second: 350, later: 250 },
  electric: { first: 350, second: 300, later: 200 },
  disabled: { first: 0, second: 0, later: 150 },
  bike: { first: 100, second: 75, later: 50 },
  bus: { first: 1000, second: 800, later: 600 },
  lorry: { first: 1200, second: 1000, later: 800 },
};

const HOUR_MS = 60 * 60 * 1000;

/** Every started hour counts as a full hour, with a minimum of one. */
export function hoursCharged(stayMs: number): number {
  return Math.max(1, Math.ceil(stayMs / HOUR_MS));
}

/** Price in pence for a stay of `stayMs` milliseconds. */
export function priceFor(type: VehicleType, stayMs: number): number {
  const hours = hoursCharged(stayMs);
  const r = RATES[type];
  let pence = 0;
  for (let h = 1; h <= hours; h++) {
    pence += h === 1 ? r.first : h <= 3 ? r.second : r.later;
  }
  return pence;
}

export function formatPounds(pence: number): string {
  return pence === 0 ? 'Free' : `£${(pence / 100).toFixed(2)}`;
}
