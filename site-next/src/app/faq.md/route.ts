import { md, faqMd } from '@/data/mirror';

export const dynamic = 'force-static';

export const GET = () => md(faqMd());
