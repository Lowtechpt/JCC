import Link from '@/components/ui/link';
import { ChevronRight } from 'lucide-react';

export function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Localização" className="text-[0.9rem] text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-x-1.5">
        {items.map((it, i) => (
          <li key={it.name} className="flex items-center gap-1.5">
            {it.href ? (
              <Link href={it.href} className="inline-flex min-h-11 items-center hover:text-foreground hover:underline underline-offset-4">
                {it.name}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-foreground">
                {it.name}
              </span>
            )}
            {i < items.length - 1 && <ChevronRight size={14} aria-hidden />}
          </li>
        ))}
      </ol>
    </nav>
  );
}
