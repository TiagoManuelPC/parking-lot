import { describe, expect, it } from 'vitest';
import { formatPounds, hoursCharged, priceFor } from './pricing';

const MIN = 60 * 1000;
const HOUR = 60 * MIN;

describe('hoursCharged', () => {
  it('charges at least one hour, even straight away', () => {
    expect(hoursCharged(0)).toBe(1);
  });

  it('counts every started hour as a full hour', () => {
    expect(hoursCharged(HOUR)).toBe(1);
    expect(hoursCharged(HOUR + 5 * MIN)).toBe(2);
    expect(hoursCharged(3 * HOUR)).toBe(3);
  });
});

describe('priceFor', () => {
  it('charges a car £4 for the first hour', () => {
    expect(priceFor('car', 30 * MIN)).toBe(400);
  });

  it('charges a car £3.50 for each of the 2nd and 3rd hours', () => {
    expect(priceFor('car', 2 * HOUR)).toBe(750);
    expect(priceFor('car', 3 * HOUR)).toBe(1100);
  });

  it('charges a car £2.50 for each hour after the 3rd', () => {
    expect(priceFor('car', 5 * HOUR)).toBe(1600);
  });

  it('has different rates for each vehicle type', () => {
    expect(priceFor('bike', 3 * HOUR)).toBe(250);
    expect(priceFor('lorry', 5 * HOUR)).toBe(4800);
    expect(priceFor('electric', HOUR)).toBe(350);
    expect(priceFor('bus', 4 * HOUR)).toBe(3200);
  });

  it('lets disabled drivers park free for 3 hours, then £1.50 an hour', () => {
    expect(priceFor('disabled', 3 * HOUR)).toBe(0);
    expect(priceFor('disabled', 4 * HOUR)).toBe(150);
  });
});

describe('formatPounds', () => {
  it('formats pence as pounds', () => {
    expect(formatPounds(1100)).toBe('£11.00');
    expect(formatPounds(75)).toBe('£0.75');
    expect(formatPounds(0)).toBe('Free');
  });
});
