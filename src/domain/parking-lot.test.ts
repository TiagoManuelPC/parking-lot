import { beforeEach, describe, expect, it } from 'vitest';
import { Clock } from './clock';
import { ParkingLot } from './parking-lot';
import { VEHICLE_TYPES, type VehicleType } from './vehicles';

const HOUR = 60 * 60 * 1000;

describe('ParkingLot', () => {
  let clock: Clock;
  let park: ParkingLot;

  beforeEach(() => {
    clock = new Clock(new Date('2026-11-19T09:00:00Z').getTime());
    park = new ParkingLot(clock);
  });

  describe('lots (O1)', () => {
    it('has a lot for every vehicle type with the 2021 capacities', () => {
      const capacities = Object.fromEntries(park.lots().map((l) => [l.type, l.capacity]));
      expect(capacities).toEqual({ car: 100, disabled: 20, bike: 20, electric: 15, bus: 5, lorry: 5 });
    });

    it('starts with every space free', () => {
      for (const lot of park.lots()) expect(lot.free).toBe(lot.capacity);
    });
  });

  describe('parking (P1)', () => {
    it.each(VEHICLE_TYPES.map((v) => v.type))('parks a %s in its own lot only', (type) => {
      park.park(type);
      for (const lot of park.lots()) {
        expect(lot.used).toBe(lot.type === type ? 1 : 0);
      }
    });
  });

  describe('tickets (P2)', () => {
    it('gives a numbered ticket with the entry time', () => {
      const first = park.park('car');
      const second = park.park('bike');
      expect(first.number).toBe(1);
      expect(second.number).toBe(2);
      expect(first.type).toBe('car');
      expect(first.enteredAt).toBe(clock.now());
    });

    it('finds the vehicle by ticket number', () => {
      const ticket = park.park('bus');
      expect(park.ticket(ticket.number)).toBe(ticket);
    });

    it('raises an error for an unknown ticket', () => {
      expect(() => park.ticket(99)).toThrow('Ticket 99 not found');
    });
  });

  describe('full lots (P3)', () => {
    const fill = (type: VehicleType) => {
      const cap = park.lots().find((l) => l.type === type)!.capacity;
      for (let i = 0; i < cap; i++) park.park(type);
    };

    it('knows when a lot is full', () => {
      expect(park.isFull('lorry')).toBe(false);
      fill('lorry');
      expect(park.isFull('lorry')).toBe(true);
    });

    it.each([
      ['car', 'Car park full'],
      ['bike', 'Bike park full'],
      ['electric', 'Electric car park full'],
      ['disabled', 'Disabled park full'],
      ['bus', 'Bus park full'],
      ['lorry', 'Lorry park full'],
    ] as const)('refuses a %s when its lot is full', (type, message) => {
      fill(type);
      expect(() => park.park(type)).toThrow(message);
    });

    it('a full lot does not stop other types parking', () => {
      fill('bus');
      expect(() => park.park('car')).not.toThrow();
    });
  });

  describe('quotes (P4, D1)', () => {
    it('shows the hours and total so far', () => {
      const ticket = park.park('car');
      clock.advance(2 * HOUR + 1);
      expect(park.quote(ticket.number)).toEqual({ hours: 3, pence: 1100 });
    });

    it('goes up when the clock moves forward', () => {
      const ticket = park.park('car');
      expect(park.quote(ticket.number).pence).toBe(400);
      clock.advance(HOUR + 1);
      expect(park.quote(ticket.number).pence).toBe(750);
    });
  });

  describe('paying and leaving (P5)', () => {
    it("won't let an unpaid ticket leave", () => {
      const ticket = park.park('car');
      expect(() => park.leave(ticket.number)).toThrow('Ticket 1 has not been paid');
    });

    it('frees the space once paid', () => {
      const ticket = park.park('car');
      clock.advance(HOUR + 1);
      const payment = park.pay(ticket.number);
      park.leave(ticket.number);
      expect(payment.pence).toBe(750);
      expect(park.lots().find((l) => l.type === 'car')!.free).toBe(100);
      expect(park.parkedNow()).toEqual([]);
    });

    it("can't pay twice", () => {
      const ticket = park.park('car');
      park.pay(ticket.number);
      expect(() => park.pay(ticket.number)).toThrow('Ticket 1 is already paid');
    });

    it('lets a full lot take a new vehicle after one leaves', () => {
      for (let i = 0; i < 5; i++) park.park('bus');
      park.pay(1);
      park.leave(1);
      expect(() => park.park('bus')).not.toThrow();
    });
  });

  describe('parked now (O2)', () => {
    it('lists the vehicles parked now, newest first', () => {
      park.park('car');
      clock.advance(HOUR);
      park.park('bike');
      expect(park.parkedNow().map((t) => t.type)).toEqual(['bike', 'car']);
    });
  });
});
