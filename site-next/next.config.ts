import type { NextConfig } from "next";

// Pré-visualização no GitHub Pages: o site fica numa subpasta (PAGES_BASE_PATH, definido no workflow;
// aceita "JCC" ou "/JCC"). Sem a variável (local e produção) fica na raiz.
const pagesPath = (process.env.PAGES_BASE_PATH ?? "").replace(/^\/+|\/+$/g, "");
const basePath = pagesPath ? `/${pagesPath}` : "";
// Endereço completo da pré-visualização (ex.: https://lowtechpt.github.io/JCC), para canonical e partilhas.
const siteUrl = (process.env.PAGES_SITE_URL ?? "").replace(/\/+$/, "");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath, NEXT_PUBLIC_SITE_URL: siteUrl },
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
