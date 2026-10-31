import { md, fullMd } from '@/data/mirror';

export const dynamic = 'force-static';

export const GET = () => md(fullMd());
