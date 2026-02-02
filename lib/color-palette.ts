/**
 * Paleta de cores San Gabriel - extraída da logo
 * Baseada em: clinica-san-gabriel-logo.svg e clinica-san-gabriel.svg
 *
 * Cores da logo:
 * - #F9F1E6  Cream/beige (fundo do ícone do olho)
 * - #DD6A10  Laranja (destaque principal)
 * - #E89B82  Salmão/coral (texto "San Gabriel")
 * - #89391A  Marrom escuro (detalhe secundário)
 * - #B23D17  Vermelho escuro/bordô (accent)
 *
 * Boas práticas UI/UX:
 * - primary: cor principal de marca (CTAs, links, destaques)
 * - secondary: cor de apoio, menos proeminente
 * - accent: highlights, hover, elementos interativos
 * - background/surface: fundos e cards
 * - border: divisórias e contornos
 * - muted: textos secundários, estados desabilitados
 */

/** Valores em OKLCH para consistência perceptual e amplo gamut */
export const SAN_GABRIEL_COLORS = {
  /** Cores base da logo (hex) */
  logo: {
    cream: "#F9F1E6",
    orange: "#DD6A10",
    salmon: "#E89B82",
    darkBrown: "#89391A",
    darkRed: "#B23D17",
  },

  /** Tokens para uso em CSS (OKLCH) */
  oklch: {
    cream: "oklch(0.965 0.018 85)",
    creamMuted: "oklch(0.97 0.01 85)",
    orange: "oklch(0.62 0.18 55)",
    orangeLight: "oklch(0.75 0.14 55)",
    orangeDark: "oklch(0.52 0.16 55)",
    salmon: "oklch(0.75 0.11 40)",
    salmonMuted: "oklch(0.82 0.06 40)",
    darkBrown: "oklch(0.38 0.09 50)",
    darkBrownMuted: "oklch(0.5 0.06 50)",
    darkRed: "oklch(0.48 0.18 35)",
    darkRedMuted: "oklch(0.55 0.12 35)",
    white: "oklch(1 0 0)",
    nearBlack: "oklch(0.22 0.02 50)",
  },

  /** Semântica para componentes */
  semantic: {
    primary: "oklch(0.62 0.18 55)",       // orange - CTAs, links
    primaryForeground: "oklch(0.99 0 0)",
    primaryMuted: "oklch(0.92 0.06 55)",  // fundo de botões secundários

    secondary: "oklch(0.38 0.09 50)",     // darkBrown - botões secundários
    secondaryForeground: "oklch(0.99 0 0)",
    secondaryMuted: "oklch(0.96 0.02 50)",

    accent: "oklch(0.75 0.11 40)",        // salmon - highlights
    accentForeground: "oklch(0.28 0.05 50)",
    accentMuted: "oklch(0.92 0.04 40)",   // fundo accent suave

    background: "oklch(0.99 0.005 85)",   // branco com leve warm
    backgroundAlt: "oklch(0.965 0.018 85)", // cream da logo

    surface: "oklch(1 0 0)",              // cards, popovers
    surfaceMuted: "oklch(0.97 0.01 85)",  // areas em destaque sutil

    border: "oklch(0.91 0.02 85)",
    borderMuted: "oklch(0.95 0.01 85)",

    foreground: "oklch(0.25 0.06 45)",
    foregroundMuted: "oklch(0.42 0.05 45)",
  },
} as const;

export type ColorPalette = typeof SAN_GABRIEL_COLORS;
