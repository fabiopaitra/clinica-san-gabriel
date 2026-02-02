/**
 * Dados centralizados da Clínica Médica San Gabriel
 * Usado em todo o site para consistência e manutenção fácil
 */

export const CLINIC = {
  name: "Clínica Médica San Gabriel",
  shortName: "San Gabriel",

  phone: "+554133000606",
  phoneFormatted: "(41) 3300-0606",
  whatsapp: "https://wa.me/554133000606",
  whatsappMessage: (text: string) =>
    `https://wa.me/554133000606?text=${encodeURIComponent(text)}`,

  address: {
    street: "Rua André Skrok, 26, Sala 01",
    neighborhood: "São Gabriel",
    city: "Colombo",
    state: "PR",
    zip: "83402-000",
    landmark: "ao lado do Detran",
    full: "Rua André Skrok, 26, Sala 01, São Gabriel, Colombo - PR, CEP 83402-000",
    mapsUrl: "https://maps.google.com/?q=Rua+André+Skrok+26+Colombo+PR",
  },

  hours: {
    weekdays: "08h às 18h30",
    saturday: "08h às 12h",
    sunday: "Fechado",
  },

  social: {
    instagram: "https://www.instagram.com/clinicamedicasangabriel",
    facebook: "https://www.facebook.com/clinicamedicasangabriel",
  },

  email: "contato@clinicamedicasangabriel.com.br",
  domain: "https://clinicamedicasangabriel.com.br",

  /** URL do vídeo do hero (Vercel Blob CDN). Fallback: /clinica-san-gabriel.mp4 em dev */
  heroVideoUrl:
    process.env.NEXT_PUBLIC_HERO_VIDEO_URL || "/clinica-san-gabriel.mp4",
  heroPosterUrl: "/clinica-san-gabriel.jpg",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Início" },
  { href: "/#especialidades", label: "Especialidades" },
  { href: "/#exames", label: "Exames" },
  { href: "/#convenios", label: "Convênios" },
  { href: "/#horarios", label: "Horários" },
  { href: "/#localizacao", label: "Localização" },
  { href: "/#faq", label: "Perguntas Frequentes" },
] as const;
