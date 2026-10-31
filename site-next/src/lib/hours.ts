import { schedule, dayLabels, fmtTime } from '@/data/business';

const toMin = (t: string) => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};

const WEEKDAYS: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

const fmt = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Lisbon',
  weekday: 'short',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});

/** Dia da semana (0 = domingo) e minutos desde a meia-noite, em hora de Lisboa. */
export function lisbonNow(ts: number) {
  const parts = fmt.formatToParts(new Date(ts));
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '0';
  return {
    day: WEEKDAYS[get('weekday')] ?? 0,
    minutes: Number(get('hour')) * 60 + Number(get('minute')),
  };
}

export type Status = { open: boolean; label: string };

export function storeStatus(ts: number): Status {
  const { day, minutes } = lisbonNow(ts);
  const today = schedule[day] ?? [];
  for (const [a, b] of today) {
    if (minutes >= toMin(a) && minutes < toMin(b)) {
      return { open: true, label: `Aberto agora · fecha às ${fmtTime(b)}` };
    }
  }
  const later = today.find(([a]) => toMin(a) > minutes);
  if (later) return { open: false, label: `Fechado · abre às ${fmtTime(later[0])}` };
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    const s = schedule[d] ?? [];
    if (s.length) {
      const name = i === 1 ? 'amanhã' : dayLabels[d].toLowerCase().replace('-feira', '');
      return { open: false, label: `Fechado · abre ${name} às ${fmtTime(s[0][0])}` };
    }
  }
  return { open: false, label: 'Fechado' };
}
