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
    landmark: "ao lado do Detran de Colombo",
    full: "Rua André Skrok, 26, Sala 01, São Gabriel, Colombo - PR, CEP 83402-000",
    mapsUrl: "https://maps.google.com/?q=Rua+André+Skrok+26+Colombo+PR",
    /** Embed src from Google Maps Share > Embed a map */
    mapsEmbedSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3605.6395875150865!2d-49.2024918!3d-25.3498724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce966b2cfb26d%3A0xfb90d01fe725fdb1!2sCl%C3%ADnica%20M%C3%A9dica%2C%20oftalmologia%2C%20consultas%20e%20exames%20em%20Colombo%20%E2%80%93%20PR!5e0!3m2!1sen!2sbr!4v1770082007622!5m2!1sen!2sbr",
    /** Coordinates for schema.org (from embed) */
    geo: { lat: -25.3498724, lng: -49.2024918 },
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

export const SPECIALTIES = {
  ophthalmology: {
    title: "Oftalmologia",
    description:
      "Atendimento especializado em saúde ocular para diagnóstico, prevenção e tratamento de doenças oculares. Nossa equipe utiliza tecnologia de ponta para exames precisos e diagnósticos acurados.",
    features: [
      "Consulta oftalmológica completa",
      "Prevenção de doenças oculares",
      "Diagnóstico precoce",
      "Tratamento personalizado",
    ],
  },
} as const;

export const EXAMS = [
  {
    lucideIcon: "Ruler",
    name: "Paquimetria",
    description:
      "Medição da espessura da córnea para diagnóstico de doenças oculares.",
  },
  {
    lucideIcon: "Map",
    name: "Topografia Corneana",
    description:
      "Mapeamento detalhado da superfície da córnea para diagnóstico preciso.",
  },
  {
    lucideIcon: "Microscope",
    name: "Microscopia",
    description:
      "Exame microscópico para análise detalhada das estruturas oculares.",
  },
  {
    lucideIcon: "ScanEye",
    name: "Mapeamento de Retina",
    description: "Avaliação completa da retina para detectar problemas oculares.",
  },
  {
    lucideIcon: "Contrast",
    name: "Sensibilidade Contraste",
    description:
      "Avaliação da capacidade de distinguir diferentes níveis de contraste.",
  },
  {
    lucideIcon: "Move",
    name: "Motilidade Ocular",
    description:
      "Avaliação dos movimentos dos olhos e coordenação ocular.",
  },
  {
    lucideIcon: "Gauge",
    name: "Tonometria",
    description:
      "Medição da pressão intraocular para detecção de glaucoma.",
  },
  {
    lucideIcon: "Sparkles",
    name: "Potencial de Acuidade",
    description:
      "Teste para avaliar o potencial máximo de visão do paciente.",
  },
] as const;

/** Convênios aceitos – placeholder colors até ter logos reais */
export const CONVENIOS = [
  { name: "Amil", color: "#0066B3", textColor: "#ffffff" },
  { name: "Bradesco Saúde", color: "#CC092F", textColor: "#ffffff" },
  { name: "SulAmérica Saúde", color: "#00A859", textColor: "#ffffff" },
  { name: "Unimed", color: "#00A651", textColor: "#ffffff" },
  { name: "NotreDame Intermédica", color: "#E31837", textColor: "#ffffff" },
  { name: "Porto Saúde", color: "#003366", textColor: "#ffffff" },
] as const;

/** Perguntas frequentes em oftalmologia */
export const FAQ = [
  {
    question: "Com que frequência devo ir ao oftalmologista?",
    answer:
      "Crianças: primeiro exame aos 6 meses, aos 3 anos e antes da escola. Adultos (20–39 anos): a cada 3–5 anos. Adultos (40–64 anos): a cada 2–4 anos. Idosos (65+): anualmente. Diabéticos: anualmente com fundo de olho.",
  },
  {
    question: "Usar óculos piora ou deixa o olho preguiçoso?",
    answer:
      "Não. Óculos com grau correto não causam dependência nem pioram a visão. Eles apenas corrigem o problema refrativo, permitindo enxergar com nitidez. O mito de que o olho fica preguiçoso é falso.",
  },
  {
    question: "Quando devo procurar o oftalmologista com urgência?",
    answer:
      "Procure atendimento imediato em caso de: perda súbita de visão, dor ocular intensa, trauma no olho, vermelhidão com dor e sensibilidade à luz, flashes ou moscas volantes repentinas, visão dupla súbita ou secreção ocular abundante.",
  },
  {
    question: "Usar celular e computador prejudica a visão?",
    answer:
      "O uso prolongado de telas não causa danos permanentes, mas pode provocar cansaço visual, olhos secos e dor de cabeça. Piscamos menos ao usar dispositivos digitais. Recomenda-se a regra 20-20-20: a cada 20 minutos, olhe algo a 6 metros por 20 segundos.",
  },
  {
    question: "O que esperar na primeira consulta? Quais exames são feitos?",
    answer:
      "Na consulta oftalmológica, são realizados: acuidade visual (nitidez), tonometria (pressão ocular), refração (determinação do grau), biomicroscopia e fundoscopia (avaliação da retina). Em alguns casos, a pupila é dilatada. Traga óculos, lentes ou receitas anteriores.",
  },
] as const;

export const NAV_LINKS = [
  { href: "/", label: "Início" },
  { href: "/#especialidades", label: "Especialidades" },
  { href: "/#exames", label: "Exames" },
  { href: "/#convenios", label: "Convênios" },
  { href: "/#horarios", label: "Horários" },
  { href: "/#localizacao", label: "Localização" },
  { href: "/#faq", label: "Perguntas Frequentes" },
] as const;
