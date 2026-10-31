import { md, negocioMd } from '@/data/mirror';

export const dynamic = 'force-static';

export const GET = () => md(negocioMd());
