# Parking Lot

A small one-page parking app: park a vehicle in its own lot, get a ticket, see the price build up by the hour, pay and leave.

It's a 2026 remake of the 2021 Makers parking-lot kata. The original Ruby code is kept in [`legacy/`](legacy/).

## Run it

```bash
npm install
npm run dev     # http://localhost:5173
npm test        # Vitest specs
```

## What it does (first version: the Must stories)

- Six lots: car (100), disabled (20), bike (20), electric car (15), bus (5), lorry (5)
- Parking gives a numbered ticket with the entry time
- A full lot shows "… park full" and can't take more
- Look up a ticket to see the hours and the price so far
- Pay & leave frees the space; an unpaid ticket can't leave
- A demo clock (+15 min / +1 hour) to see prices change

## Prices (£, every started hour counts)

| Vehicle | 1st hour | 2nd–3rd (each) | 4th on (each) |
| --- | --- | --- | --- |
| Car | £4.00 | £3.50 | £2.50 |
| Electric car | £3.50 | £3.00 | £2.00 |
| Disabled | free | free | £1.50 |
| Bike | £1.00 | £0.75 | £0.50 |
| Bus | £10.00 | £8.00 | £6.00 |
| Lorry | £12.00 | £10.00 | £8.00 |

Rates live in `src/domain/pricing.ts`.

## Layout

- `src/domain/`: plain TypeScript (ParkingLot, Clock, pricing, vehicles) with Vitest specs
- `src/main.ts` + `src/style.css`: the UI, no framework
