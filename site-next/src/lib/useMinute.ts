'use client';
import { useSyncExternalStore } from 'react';

const subscribe = (cb: () => void) => {
  const id = setInterval(cb, 30_000);
  return () => clearInterval(id);
};

/** Timestamp (arredondado ao minuto) no cliente; 0 no servidor e na hidratação, para não haver mismatch. */
export function useMinute(): number {
  return useSyncExternalStore(
    subscribe,
    () => Math.floor(Date.now() / 60_000) * 60_000,
    () => 0,
  );
}
