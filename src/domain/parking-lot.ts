import { Clock } from './clock';
import { hoursCharged, priceFor } from './pricing';
import { VEHICLE_TYPES, vehicleInfo, type VehicleType } from './vehicles';

export interface Ticket {
  number: number;
  type: VehicleType;
  enteredAt: number;
  paid?: Payment;
}

export interface Payment {
  ticket: number;
  pence: number;
  hours: number;
  paidAt: number;
}

export interface Quote {
  hours: number;
  pence: number;
}

export interface LotStatus {
  type: VehicleType;
  label: string;
  icon: string;
  capacity: number;
  used: number;
  free: number;
}

export class ParkingLot {
  private readonly tickets = new Map<number, Ticket>();
  private nextNumber = 1;

  constructor(readonly clock: Clock = new Clock()) {}

  lots(): LotStatus[] {
    return VEHICLE_TYPES.map((v) => {
      const used = this.countParked(v.type);
      return { type: v.type, label: v.label, icon: v.icon, capacity: v.capacity, used, free: v.capacity - used };
    });
  }

  isFull(type: VehicleType): boolean {
    return this.countParked(type) >= vehicleInfo(type).capacity;
  }

  park(type: VehicleType): Ticket {
    if (this.isFull(type)) throw new Error(`${vehicleInfo(type).label} park full`);
    const ticket: Ticket = { number: this.nextNumber++, type, enteredAt: this.clock.now() };
    this.tickets.set(ticket.number, ticket);
    return ticket;
  }

  ticket(number: number): Ticket {
    const ticket = this.tickets.get(number);
    if (!ticket) throw new Error(`Ticket ${number} not found`);
    return ticket;
  }

  quote(number: number): Quote {
    const t = this.ticket(number);
    const stay = this.clock.now() - t.enteredAt;
    return { hours: hoursCharged(stay), pence: priceFor(t.type, stay) };
  }

  pay(number: number): Payment {
    const t = this.ticket(number);
    if (t.paid) throw new Error(`Ticket ${number} is already paid`);
    const { hours, pence } = this.quote(number);
    t.paid = { ticket: number, hours, pence, paidAt: this.clock.now() };
    return t.paid;
  }

  leave(number: number): void {
    const t = this.ticket(number);
    if (!t.paid) throw new Error(`Ticket ${number} has not been paid`);
    this.tickets.delete(number);
  }

  /** Vehicles in the car park now, newest first. */
  parkedNow(): Ticket[] {
    return [...this.tickets.values()].sort((a, b) => b.enteredAt - a.enteredAt || b.number - a.number);
  }

  private countParked(type: VehicleType): number {
    let n = 0;
    for (const t of this.tickets.values()) if (t.type === type) n++;
    return n;
  }
}
