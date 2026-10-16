import { EXAMS } from "@/lib/clinic-data";
import { toSlug } from "@/lib/utils";

export type ServiceSection = {
  id: string;
  heading: string;
  paragraphs?: readonly string[];
  items?: readonly string[];
};

export type ServicePage = {
  slug: string;
  name: string;
  heading: string;
  description: string;
  sections: readonly ServiceSection[];
  whatsappText: string;
  relatedExams?: readonly string[];
};

export const EXAM_PAGES: readonly ServicePage[] = [
  {
    slug: "paquimetria",
    name: "Paquimetria",
    heading: "Paquimetria em Colombo – PR",
    description:
      "Paquimetria em Colombo, PR: exame rápido e indolor que mede a espessura da córnea. Agende pelo WhatsApp na Clínica Médica San Gabriel.",
    sections: [
      {
        id: "o-que-e",
        heading: "O que é",
        paragraphs: [
          "A paquimetria mede a espessura da córnea, a camada transparente na frente do olho. É um exame rápido e indolor.",
        ],
      },
      {
        id: "indicacoes",
        heading: "Quando é indicada",
        items: [
          "Avaliação e acompanhamento de glaucoma, já que a espessura da córnea influencia a leitura da pressão do olho",
          "Avaliação antes de cirurgia refrativa (correção de grau)",
          "Acompanhamento de ceratocone e outras alterações da córnea",
        ],
      },
      {
        id: "como-e-feito",
        heading: "Como é feito",
        paragraphs: [
          "O aparelho mede a córnea em poucos minutos. Dependendo do equipamento, pode ser usado um colírio anestésico. O exame não exige dilatação da pupila.",
        ],
      },
      {
        id: "preparo",
        heading: "Preparo",
        items: [
          "Quem usa lente de contato deve seguir a orientação da clínica sobre quanto tempo antes retirar as lentes",
          "Traga documento, carteirinha do convênio e exames anteriores, se tiver",
        ],
      },
    ],
    whatsappText: "Olá! Vim pelo site e gostaria de agendar o exame de paquimetria.",
    relatedExams: ["tonometria", "topografia-corneana"],
  },
  {
    slug: "topografia-corneana",
    name: "Topografia Corneana",
    heading: "Topografia Corneana em Colombo – PR",
    description:
      "Topografia corneana em Colombo, PR: mapeamento da superfície da córnea para ceratocone, astigmatismo e cirurgia refrativa. Agende pelo WhatsApp.",
    sections: [
      {
        id: "o-que-e",
        heading: "O que é",
        paragraphs: [
          "A topografia corneana cria um mapa da curvatura da córnea. Ela mostra irregularidades que o exame de rotina não detecta.",
        ],
      },
      {
        id: "indicacoes",
        heading: "Quando é indicada",
        items: [
          "Suspeita ou acompanhamento de ceratocone",
          "Avaliação de astigmatismo",
          "Avaliação antes de cirurgia refrativa ou de catarata",
          "Adaptação de lentes de contato",
        ],
      },
      {
        id: "como-e-feito",
        heading: "Como é feito",
        paragraphs: [
          "Você apoia o queixo no aparelho e olha para um ponto de luz enquanto ele fotografa a córnea. Leva poucos minutos, não dói e não precisa de colírio.",
        ],
      },
      {
        id: "preparo",
        heading: "Preparo",
        items: [
          "Quem usa lente de contato deve seguir a orientação da clínica sobre quanto tempo antes retirar as lentes, já que elas alteram a forma da córnea",
          "Traga documento, carteirinha do convênio e exames anteriores, se tiver",
        ],
      },
    ],
    whatsappText:
      "Olá! Vim pelo site e gostaria de agendar o exame de topografia corneana.",
    relatedExams: ["paquimetria", "microscopia-especular"],
  },
  {
    slug: "microscopia-especular",
    name: "Microscopia Especular",
    heading: "Microscopia Especular de Córnea em Colombo – PR",
    description:
      "Microscopia especular em Colombo, PR: avaliação das células da córnea, indicada antes de cirurgias e em doenças da córnea. Agende pelo WhatsApp.",
    sections: [
      {
        id: "o-que-e",
        heading: "O que é",
        paragraphs: [
          "A microscopia especular fotografa e conta as células da camada interna da córnea (endotélio). Essas células mantêm a córnea transparente.",
        ],
      },
      {
        id: "indicacoes",
        heading: "Quando é indicada",
        items: [
          "Avaliação antes de cirurgia de catarata ou refrativa",
          "Acompanhamento de doenças da córnea",
          "Usuários de lente de contato por muitos anos",
        ],
      },
      {
        id: "como-e-feito",
        heading: "Como é feito",
        paragraphs: [
          "O aparelho fotografa a córnea sem encostar no olho. O exame é rápido e indolor.",
        ],
      },
      {
        id: "preparo",
        heading: "Preparo",
        items: [
          "Quem usa lente de contato deve seguir a orientação da clínica sobre retirar as lentes antes do exame",
          "Traga documento, carteirinha do convênio e exames anteriores, se tiver",
        ],
      },
    ],
    whatsappText: "Olá! Vim pelo site e gostaria de agendar o exame de microscopia especular.",
    relatedExams: ["paquimetria", "topografia-corneana"],
  },
  {
    slug: "mapeamento-de-retina",
    name: "Mapeamento de Retina",
    heading: "Mapeamento de Retina em Colombo – PR",
    description:
      "Mapeamento de retina em Colombo, PR: avaliação completa da retina para diabetes, miopia alta, flashes e moscas volantes. Agende pelo WhatsApp.",
    sections: [
      {
        id: "o-que-e",
        heading: "O que é",
        paragraphs: [
          "O mapeamento de retina examina o fundo do olho por inteiro, incluindo a periferia da retina, com a pupila dilatada.",
        ],
      },
      {
        id: "indicacoes",
        heading: "Quando é indicado",
        items: [
          "Pessoas com diabetes ou pressão alta",
          "Miopia alta",
          "Flashes de luz ou moscas volantes que surgiram de repente",
          "Avaliação antes de cirurgias oculares",
          "Histórico de descolamento de retina na família",
        ],
      },
      {
        id: "como-e-feito",
        heading: "Como é feito",
        paragraphs: [
          "Um colírio dilata a pupila, o que leva cerca de 30 minutos. Depois o médico examina a retina com lentes e luz. A dilatação deixa a visão embaçada e sensível à luz por algumas horas.",
        ],
      },
      {
        id: "preparo",
        heading: "Preparo",
        items: [
          "Venha com um acompanhante e não dirija depois do exame",
          "Traga óculos de sol para a volta",
          "Traga documento, carteirinha do convênio e exames anteriores, se tiver",
        ],
      },
    ],
    whatsappText:
      "Olá! Vim pelo site e gostaria de agendar o mapeamento de retina.",
    relatedExams: ["tonometria", "potencial-de-acuidade"],
  },
  {
    slug: "sensibilidade-contraste",
    name: "Sensibilidade ao Contraste",
    heading: "Teste de Sensibilidade ao Contraste em Colombo – PR",
    description:
      "Teste de sensibilidade ao contraste em Colombo, PR: avalia a qualidade da visão além da tabela de letras. Agende pelo WhatsApp.",
    sections: [
      {
        id: "o-que-e",
        heading: "O que é",
        paragraphs: [
          "O teste mede a capacidade de distinguir um objeto do fundo quando os dois têm tons parecidos. Ele mostra perdas de qualidade de visão que a tabela de letras comum não mostra.",
        ],
      },
      {
        id: "indicacoes",
        heading: "Quando é indicado",
        items: [
          "Dificuldade para enxergar à noite ou com neblina",
          "Avaliação de catarata",
          "Acompanhamento de doenças da retina e do nervo óptico",
          "Avaliação antes e depois de cirurgia refrativa",
        ],
      },
      {
        id: "como-e-feito",
        heading: "Como é feito",
        paragraphs: [
          "Você identifica figuras ou letras com contraste cada vez menor. O teste não dói e não usa colírio.",
        ],
      },
      {
        id: "preparo",
        heading: "Preparo",
        items: [
          "Traga seus óculos ou lentes de contato",
          "Traga documento, carteirinha do convênio e exames anteriores, se tiver",
        ],
      },
    ],
    whatsappText:
      "Olá! Vim pelo site e gostaria de agendar o teste de sensibilidade ao contraste.",
    relatedExams: ["potencial-de-acuidade", "mapeamento-de-retina"],
  },
  {
    slug: "motilidade-ocular",
    name: "Motilidade Ocular",
    heading: "Exame de Motilidade Ocular em Colombo – PR",
    description:
      "Exame de motilidade ocular em Colombo, PR: avalia os movimentos e o alinhamento dos olhos, como no estrabismo. Agende pelo WhatsApp.",
    sections: [
      {
        id: "o-que-e",
        heading: "O que é",
        paragraphs: [
          "O exame avalia os movimentos dos olhos e se eles trabalham alinhados.",
        ],
      },
      {
        id: "indicacoes",
        heading: "Quando é indicado",
        items: [
          "Olhos desalinhados (estrabismo), em crianças ou adultos",
          "Visão dupla",
          "Cansaço visual ou dor de cabeça ao ler",
        ],
      },
      {
        id: "como-e-feito",
        heading: "Como é feito",
        paragraphs: [
          "O médico pede para você acompanhar um objeto com o olhar e cobre um olho de cada vez. Não dói e não usa colírio.",
        ],
      },
      {
        id: "preparo",
        heading: "Preparo",
        items: [
          "Traga seus óculos",
          "Traga documento, carteirinha do convênio e exames anteriores, se tiver",
        ],
      },
    ],
    whatsappText:
      "Olá! Vim pelo site e gostaria de agendar o exame de motilidade ocular.",
  },
  {
    slug: "tonometria",
    name: "Tonometria",
    heading: "Tonometria em Colombo – PR",
    description:
      "Tonometria em Colombo, PR: medição da pressão do olho, essencial para detectar o glaucoma cedo. Agende pelo WhatsApp.",
    sections: [
      {
        id: "o-que-e",
        heading: "O que é",
        paragraphs: [
          "A tonometria mede a pressão dentro do olho. Pressão alta é o principal fator de risco para o glaucoma, que costuma não dar sintomas no começo.",
        ],
      },
      {
        id: "indicacoes",
        heading: "Quando é indicada",
        items: [
          "Faz parte da consulta oftalmológica de rotina",
          "Acompanhamento de glaucoma",
          "Histórico de glaucoma na família",
          "Uso prolongado de colírios ou remédios com corticoide",
        ],
      },
      {
        id: "como-e-feito",
        heading: "Como é feito",
        paragraphs: [
          "Dependendo do aparelho, o olho recebe um colírio anestésico ou um leve sopro de ar. Leva poucos segundos e não dói.",
        ],
      },
      {
        id: "preparo",
        heading: "Preparo",
        items: [
          "Quem usa lente de contato deve seguir a orientação da clínica sobre retirar as lentes antes do exame",
          "Traga documento, carteirinha do convênio e exames anteriores, se tiver",
        ],
      },
    ],
    whatsappText: "Olá! Vim pelo site e gostaria de agendar o exame de tonometria.",
    relatedExams: ["paquimetria", "mapeamento-de-retina"],
  },
  {
    slug: "potencial-de-acuidade",
    name: "Potencial de Acuidade",
    heading: "Potencial de Acuidade Visual em Colombo – PR",
    description:
      "Exame de potencial de acuidade visual em Colombo, PR: estima quanto você pode enxergar depois de tratar a catarata. Agende pelo WhatsApp.",
    sections: [
      {
        id: "o-que-e",
        heading: "O que é",
        paragraphs: [
          "O teste estima a visão que o olho pode alcançar, mesmo quando uma catarata ou outra opacidade atrapalha a visão hoje.",
        ],
      },
      {
        id: "indicacoes",
        heading: "Quando é indicado",
        items: [
          "Planejamento da cirurgia de catarata",
          "Avaliação de perda de visão com mais de uma causa possível",
        ],
      },
      {
        id: "como-e-feito",
        heading: "Como é feito",
        paragraphs: [
          "O aparelho projeta uma imagem dentro do olho e você diz o que consegue ler. Não dói.",
        ],
      },
      {
        id: "preparo",
        heading: "Preparo",
        items: [
          "Siga a orientação da clínica sobre dilatação da pupila e acompanhante",
          "Traga documento, carteirinha do convênio e exames anteriores, se tiver",
        ],
      },
    ],
    whatsappText:
      "Olá! Vim pelo site e gostaria de agendar o exame de potencial de acuidade.",
    relatedExams: ["sensibilidade-contraste", "mapeamento-de-retina"],
  },
  {
    slug: "exame-de-vista-para-cnh",
    name: "Exame de Vista para CNH",
    heading: "Exame de Vista para CNH em Colombo – PR",
    description:
      "Exame de vista para CNH em Colombo, PR, ao lado do Detran. Para primeira habilitação, renovação ou mudança de categoria. Agende pelo WhatsApp.",
    sections: [
      {
        id: "o-que-e",
        heading: "O que é",
        paragraphs: [
          "O Detran exige uma avaliação da visão para quem vai tirar, renovar, adicionar ou mudar a categoria da carteira de motorista. A clínica fica ao lado do Detran de Colombo.",
        ],
      },
      {
        id: "indicacoes",
        heading: "Quem precisa",
        items: [
          "Primeira habilitação",
          "Renovação da CNH",
          "Adição ou mudança de categoria",
        ],
      },
      {
        id: "como-e-feito",
        heading: "Como é feito",
        paragraphs: [
          "O exame avalia a nitidez da visão, a visão de cores, o campo visual e a visão com pouca luz e ofuscamento. Se você precisar de óculos ou lentes para dirigir, isso fica registrado na CNH.",
        ],
      },
      {
        id: "preparo",
        heading: "O que levar",
        items: [
          "Documento de identidade com foto e a CNH atual, se for renovação",
          "Óculos ou lentes de contato que você usa para dirigir",
          "Fale com a clínica pelo WhatsApp para confirmar o agendamento junto ao Detran",
        ],
      },
    ],
    whatsappText:
      "Olá! Vim pelo site e gostaria de agendar o exame de vista para a CNH.",
  },
];

export const SPECIALTY_PAGES: readonly ServicePage[] = [
  {
    slug: "catarata",
    name: "Catarata",
    heading: "Catarata: diagnóstico e tratamento em Colombo – PR",
    description:
      "Catarata em Colombo, PR: consulta, exames e orientação sobre cirurgia com oftalmologista. Agende pelo WhatsApp na Clínica Médica San Gabriel.",
    sections: [
      {
        id: "o-que-e",
        heading: "O que é",
        paragraphs: [
          "Catarata é quando o cristalino, a lente natural do olho, fica opaco. A visão fica embaçada aos poucos. É comum depois dos 60 anos, mas também pode aparecer com diabetes, uso de corticoide ou depois de traumas no olho.",
        ],
      },
      {
        id: "sintomas",
        heading: "Sintomas",
        items: [
          "Visão embaçada ou como se houvesse uma névoa",
          "Ofuscamento com faróis e luz do sol",
          "Cores mais apagadas",
          "Troca frequente do grau dos óculos",
          "Dificuldade para enxergar à noite",
        ],
      },
      {
        id: "diagnostico",
        heading: "Diagnóstico",
        paragraphs: [
          "O oftalmologista confirma a catarata na consulta. Quando a cirurgia é indicada, exames como topografia, microscopia especular e potencial de acuidade ajudam a planejar o tratamento.",
        ],
      },
      {
        id: "tratamento",
        heading: "Tratamento",
        paragraphs: [
          "O tratamento da catarata é cirúrgico: o cristalino opaco é trocado por uma lente artificial. O médico avalia o momento certo e explica as opções de lente para o seu caso.",
        ],
      },
    ],
    whatsappText:
      "Olá! Vim pelo site e gostaria de agendar uma consulta sobre catarata.",
    relatedExams: [
      "potencial-de-acuidade",
      "topografia-corneana",
      "microscopia-especular",
      "sensibilidade-contraste",
    ],
  },
  {
    slug: "glaucoma",
    name: "Glaucoma",
    heading: "Glaucoma: diagnóstico e acompanhamento em Colombo – PR",
    description:
      "Glaucoma em Colombo, PR: diagnóstico precoce com tonometria, paquimetria e mapeamento de retina. Agende pelo WhatsApp.",
    sections: [
      {
        id: "o-que-e",
        heading: "O que é",
        paragraphs: [
          "Glaucoma é uma doença que lesa o nervo óptico, quase sempre ligada à pressão alta dentro do olho. A perda de visão é lenta, começa pelas laterais e não volta. Por isso o diagnóstico precoce é o que protege a visão.",
        ],
      },
      {
        id: "fatores-de-risco",
        heading: "Quem tem mais risco",
        items: [
          "Pessoas com mais de 40 anos",
          "Histórico de glaucoma na família",
          "Diabetes ou pressão alta",
          "Miopia alta",
          "Uso prolongado de corticoide",
        ],
      },
      {
        id: "diagnostico",
        heading: "Diagnóstico",
        paragraphs: [
          "Na maioria dos casos o glaucoma não dá sintomas no começo. A consulta de rotina mede a pressão do olho e avalia o nervo óptico. Quando há suspeita, o médico pode pedir outros exames complementares.",
        ],
      },
      {
        id: "tratamento",
        heading: "Tratamento",
        paragraphs: [
          "O tratamento busca controlar a pressão do olho, geralmente com colírios de uso contínuo. O acompanhamento é para a vida toda, com consultas regulares.",
        ],
      },
    ],
    whatsappText:
      "Olá! Vim pelo site e gostaria de agendar uma consulta sobre glaucoma.",
    relatedExams: ["tonometria", "paquimetria", "mapeamento-de-retina"],
  },
  {
    slug: "oftalmopediatria",
    name: "Oftalmopediatria",
    heading: "Oftalmologista para crianças em Colombo – PR",
    description:
      "Consulta oftalmológica infantil em Colombo, PR: quando levar seu filho, sinais de alerta e o que é avaliado. Agende pelo WhatsApp.",
    sections: [
      {
        id: "quando-levar",
        heading: "Quando levar",
        items: [
          "Primeiro exame por volta dos 6 meses",
          "Aos 3 anos",
          "Antes de começar a escola",
          "Depois, conforme a orientação do oftalmologista",
        ],
      },
      {
        id: "sinais-de-alerta",
        heading: "Sinais de alerta",
        items: [
          "Olhos desalinhados ou tortos",
          "Reflexo branco na pupila em fotos",
          "Chegar muito perto da TV ou do caderno",
          "Apertar os olhos, piscar demais ou coçar os olhos com frequência",
          "Dor de cabeça ou dificuldade na escola",
        ],
      },
      {
        id: "consulta",
        heading: "Como é a consulta",
        paragraphs: [
          "O médico avalia a visão de acordo com a idade, o alinhamento dos olhos e a saúde do fundo do olho. Em algumas consultas a pupila é dilatada com colírio. Traga os óculos da criança, se ela já usar.",
        ],
      },
    ],
    whatsappText:
      "Olá! Vim pelo site e gostaria de agendar uma consulta oftalmológica infantil.",
    relatedExams: ["motilidade-ocular", "mapeamento-de-retina"],
  },
];

export function examPath(slug: string) {
  return `/exames/${slug}`;
}

export function specialtyPath(slug: string) {
  return `/especialidades/${slug}`;
}

export function examSlug(exam: (typeof EXAMS)[number]) {
  return toSlug(exam.name);
}

export function findExamPage(slug: string) {
  return EXAM_PAGES.find((page) => page.slug === slug);
}

export function findSpecialtyPage(slug: string) {
  return SPECIALTY_PAGES.find((page) => page.slug === slug);
}
