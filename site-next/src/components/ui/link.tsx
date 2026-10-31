import NextLink from 'next/link';
import type { ComponentProps } from 'react';

/**
 * next/link sem prefetch por defeito. O site é exportado estático e os ficheiros de
 * prefetch (__next.*.txt) não existem com o nome que o browser pede, o que gerava 404.
 */
export default function Link({ prefetch = false, ...props }: ComponentProps<typeof NextLink>) {
  return <NextLink prefetch={prefetch} {...props} />;
}
