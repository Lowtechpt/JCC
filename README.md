# JCC Computadores: site novo

Pré-visualização: https://lowtechpt.github.io/JCC/

Site da JCC Computadores, loja de informática em Leça da Palmeira desde 1994: reparação de computadores, telemóveis, televisões e consolas, recondicionados e assistência a empresas.

## Pastas

- `site-next/`: o site (Next.js, React e Tailwind CSS), exportado como site estático.
- `assets-originais/`: fotos e logótipo da loja.
- `assets-stock/`: fotos ilustrativas de equipamentos, com licença CC0 (ver `assets-stock/LICENCAS.md`).
- `JCC_INFO_SITE.md`: a informação do negócio usada no site.

## Correr no computador

```bash
cd site-next
npm install
npm run dev     # http://localhost:3000
npm run build   # site estático em site-next/out/
```

Depois de trocar ou acrescentar fotos em `assets-originais/` ou `assets-stock/`, corre `npm run images` dentro de `site-next/` para gerar as versões WebP.

## Publicação

Cada push para `main` publica a pré-visualização no GitHub Pages (`.github/workflows/pages.yml`). A pré-visualização fica na subpasta `/JCC/` e fora dos motores de busca (`noindex`). Para publicar no domínio final (www.jccpt.com), faz o build sem a variável `PAGES_BASE_PATH`.

## Formulário de orçamento

Os pedidos chegam a geral@jccpt.com através da FormSubmit. O primeiro pedido feito em cada endereço do site envia um email "Activate Form", que tem de ser confirmado uma vez.
