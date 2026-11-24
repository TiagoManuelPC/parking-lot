import './style.css';
import { Clock } from './domain/clock';
import { ParkingLot } from './domain/parking-lot';
import { formatPounds, RATES } from './domain/pricing';
import { vehicleInfo, type VehicleType } from './domain/vehicles';

const park = new ParkingLot(new Clock());
let paying: number | null = null;

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;

const time = (ms: number) =>
  new Date(ms).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
const day = (ms: number) =>
  new Date(ms).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });

function notify(message: string, kind: 'ok' | 'error' = 'ok') {
  const el = $('notice');
  el.textContent = message;
  el.className = `notice ${kind}`;
  el.hidden = false;
}

function renderClock() {
  const now = park.clock.now();
  $('clock-time').textContent = `${day(now)} · ${time(now)}`;
  const mins = Math.round(park.clock.skipped / 60000);
  $('clock-note').textContent = mins
    ? `Demo clock: ${Math.floor(mins / 60)}h ${mins % 60}m ahead`
    : 'Demo clock';
}

function renderLots() {
  $('lots').innerHTML = park
    .lots()
    .map((lot) => {
      const pct = (lot.used / lot.capacity) * 100;
      const level = lot.free === 0 ? 'full' : pct >= 80 ? 'busy' : '';
      const r = RATES[lot.type];
      return `
      <article class="lot ${level}">
        <div class="lot-head"><span class="lot-icon" aria-hidden="true">${lot.icon}</span><h3>${lot.label}</h3></div>
        <p class="lot-free"><strong>${lot.free}</strong> / ${lot.capacity} free</p>
        <div class="bar" role="progressbar" aria-valuenow="${lot.used}" aria-valuemax="${lot.capacity}" aria-label="${lot.label} spaces used"><span style="width:${pct}%"></span></div>
        <p class="rates">${formatPounds(r.first)} first hour · ${formatPounds(r.second)} 2nd–3rd · ${formatPounds(r.later)} after</p>
        <button class="btn primary" data-action="park" data-type="${lot.type}" ${lot.free === 0 ? 'disabled' : ''}>
          ${lot.free === 0 ? `${lot.label} park full` : 'Park'}
        </button>
      </article>`;
    })
    .join('');
}

function renderParked() {
  const tickets = park.parkedNow();
  $('parked-count').textContent = tickets.length ? `(${tickets.length})` : '';
  if (!tickets.length) {
    $('parked').innerHTML = `<p class="empty">No vehicles parked. Pick a space above to park one.</p>`;
    return;
  }
  $('parked').innerHTML = `
    <table>
      <thead><tr><th>Ticket</th><th>Vehicle</th><th>Time in</th><th>Hours</th><th>Price so far</th><th></th></tr></thead>
      <tbody>
        ${tickets
          .map((t) => {
            const q = park.quote(t.number);
            const v = vehicleInfo(t.type);
            return `<tr class="${paying === t.number ? 'selected' : ''}">
              <td class="num">#${t.number}</td>
              <td>${v.icon} ${v.label}</td>
              <td>${time(t.enteredAt)}</td>
              <td>${q.hours}</td>
              <td class="price">${formatPounds(q.pence)}</td>
              <td><button class="btn" data-action="pay" data-ticket="${t.number}">Pay &amp; leave</button></td>
            </tr>`;
          })
          .join('')}
      </tbody>
    </table>`;
}

function renderPayPanel() {
  const el = $('pay-panel');
  if (paying === null) {
    el.innerHTML = '';
    return;
  }
  const t = park.ticket(paying);
  const q = park.quote(paying);
  const v = vehicleInfo(t.type);
  el.innerHTML = `
    <div class="pay">
      <div>
        <p class="pay-title">Ticket #${t.number} · ${v.icon} ${v.label}</p>
        <p class="pay-detail">In at ${time(t.enteredAt)} · ${q.hours} hour${q.hours === 1 ? '' : 's'} charged</p>
      </div>
      <p class="pay-total">${formatPounds(q.pence)}</p>
      <div class="pay-actions">
        <button class="btn primary" data-action="confirm" data-ticket="${t.number}">Pay ${formatPounds(q.pence)} &amp; leave</button>
        <button class="btn ghost" data-action="cancel">Cancel</button>
      </div>
    </div>`;
}

function render() {
  renderClock();
  renderLots();
  renderPayPanel();
  renderParked();
}

document.addEventListener('click', (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('button[data-action]');
  if (!btn) return;
  const { action } = btn.dataset;
  try {
    if (action === 'park') {
      const t = park.park(btn.dataset.type as VehicleType);
      notify(`Ticket #${t.number}: ${vehicleInfo(t.type).label} parked at ${time(t.enteredAt)}. Keep this number to pay.`);
    } else if (action === 'advance') {
      park.clock.advance(Number(btn.dataset.minutes) * 60000);
    } else if (action === 'pay') {
      paying = Number(btn.dataset.ticket);
    } else if (action === 'cancel') {
      paying = null;
    } else if (action === 'confirm') {
      const n = Number(btn.dataset.ticket);
      const payment = park.pay(n);
      park.leave(n);
      paying = null;
      notify(`Ticket #${n} paid ${formatPounds(payment.pence)}. The space is free again.`);
    }
  } catch (err) {
    notify((err as Error).message, 'error');
  }
  render();
});

$('lookup').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = $<HTMLInputElement>('lookup-number');
  try {
    paying = park.ticket(Number(input.value)).number;
    input.value = '';
  } catch (err) {
    notify((err as Error).message, 'error');
  }
  render();
});

// Keep prices and the clock current while the page is open.
setInterval(render, 30_000);
render();
