'use client';
import { LazyMotion, MotionConfig } from 'motion/react';

// As funcionalidades de animação carregam depois da hidratação, fora do caminho crítico.
const loadFeatures = () => import('./motion-features').then((res) => res.default);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
