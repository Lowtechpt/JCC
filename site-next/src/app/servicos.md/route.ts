import { md, servicosMd } from '@/data/mirror';

export const dynamic = 'force-static';

export const GET = () => md(servicosMd());
