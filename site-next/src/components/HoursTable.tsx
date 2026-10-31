'use client';
import { dayLabels, slotsText } from '@/data/business';
import { useMinute } from '@/lib/useMinute';
import { lisbonNow } from '@/lib/hours';
import { cn } from '@/lib/utils';

const order = [1, 2, 3, 4, 5, 6, 0];

/** Horário com o dia de hoje destacado (fundo branco + etiqueta azul "hoje"). */
export function HoursTable() {
  const ts = useMinute();
  const today = ts ? lisbonNow(ts).day : -1;
  return (
    <table className="w-full border-separate border-spacing-0 text-left">
      <caption className="sr-only">Horário de atendimento</caption>
      <tbody>
        {order.map((d) => {
          const is = d === today;
          const cell = cn('py-2.5 text-[0.9rem] sm:text-[0.95rem]', is ? 'border-b border-transparent bg-white' : 'border-b border-foreground/10');
          return (
            <tr key={d}>
              <th scope="row" className={cn(cell, 'pl-3 pr-2 sm:px-4', is ? 'rounded-l-2xl font-semibold text-foreground' : 'font-normal text-muted-foreground')}>
                {dayLabels[d]}
                {is && (
                  <span className="ml-2 rounded-full bg-primary px-2.5 py-0.5 align-middle text-xs font-semibold text-white">hoje</span>
                )}
              </th>
              <td className={cn(cell, 'pl-2 pr-3 text-right tabular-nums sm:px-4', is && 'rounded-r-2xl font-semibold')}>{slotsText(d)
                  .split(' · ')
                  .map((slot, i) => (
                    <span key={slot} className="block whitespace-nowrap sm:inline">
                      {i > 0 && <span aria-hidden className="hidden sm:inline"> · </span>}
                      {slot}
                    </span>
                  ))}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
