/**
 * Prefixo do site quando corre numa subpasta (pré-visualização no GitHub Pages, via PAGES_BASE_PATH no build).
 * Vazio em local e em produção. O next/link já o aplica sozinho; isto serve para o resto.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** Para caminhos que o Next não prefixa: src do next/image, <a> simples (downloads), ícones dos metadados. */
export const withBase = (path: string) => `${basePath}${path}`;

/** Build de pré-visualização: fica fora dos motores de busca (o site verdadeiro será www.jccpt.com). */
export const isPreview = basePath !== '';
