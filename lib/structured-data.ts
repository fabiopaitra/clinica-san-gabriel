import { CLINIC, CONVENIOS, DOCTORS, EXAMS, FAQ } from "@/lib/clinic-data";
import {
  examPath,
  examSlug,
  specialtyPath,
  type ServicePage,
} from "@/lib/service-pages";

const CLINIC_ID = `${CLINIC.domain}/#clinica`;

function absoluteUrl(path: string) {
  return new URL(path, CLINIC.domain).toString();
}

function physicianId(index: number) {
  return `${CLINIC.domain}/#medico-${index + 1}`;
}

function physicianSchema(doctor: (typeof DOCTORS)[number], index: number) {
  return {
    "@type": "Physician",
    "@id": physicianId(index),
    name: doctor.name,
    knowsAbout: [doctor.specialty, ...doctor.areas],
    identifier: [
      { "@type": "PropertyValue", propertyID: `CRM-${doctor.crmState}`, value: doctor.crm },
      { "@type": "PropertyValue", propertyID: "RQE", value: doctor.rqe },
    ],
    alumniOf: doctor.education.map((item) => ({
      "@type": "EducationalOrganization",
      name: item.institution,
    })),
    worksFor: { "@id": CLINIC_ID },
    address: { "@id": `${CLINIC_ID}-endereco` },
  };
}

export function clinicSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalClinic",
        "@id": CLINIC_ID,
        name: CLINIC.name,
        description:
          "Clínica de oftalmologia em Colombo, PR. Consultas, exames oftalmológicos e exame de vista para CNH.",
        url: CLINIC.domain,
        logo: absoluteUrl("/clinica-san-gabriel-logo.svg"),
        image: [absoluteUrl(CLINIC.heroPosterUrl), absoluteUrl("/opengraph-image")],
        telephone: CLINIC.phone,
        email: CLINIC.email,
        address: {
          "@type": "PostalAddress",
          "@id": `${CLINIC_ID}-endereco`,
          streetAddress: CLINIC.address.street,
          addressLocality: CLINIC.address.city,
          addressRegion: CLINIC.address.state,
          postalCode: CLINIC.address.zip,
          addressCountry: "BR",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: CLINIC.address.geo.lat,
          longitude: CLINIC.address.geo.lng,
        },
        hasMap: CLINIC.address.mapsUrl,
        areaServed: ["Colombo", "Curitiba", "Região Metropolitana de Curitiba"],
        sameAs: [CLINIC.social.instagram, CLINIC.social.facebook],
        knowsAbout: ["Oftalmologia", "Catarata", "Glaucoma", "Oftalmopediatria"],
        paymentAccepted: `Particular e convênios: ${CONVENIOS.map((c) => c.name).join(", ")}`,
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "08:00",
            closes: "18:30",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Saturday",
            opens: "08:00",
            closes: "12:00",
          },
        ],
        availableService: EXAMS.map((exam) => ({
          "@type": "MedicalTest",
          name: exam.name,
          url: absoluteUrl(examPath(examSlug(exam))),
        })),
        employee: DOCTORS.map((_, index) => ({ "@id": physicianId(index) })),
      },
      ...DOCTORS.map(physicianSchema),
    ],
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

function breadcrumbSchema(trail: readonly { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function examPageSchema(page: ServicePage) {
  const url = absoluteUrl(examPath(page.slug));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        url,
        name: page.heading,
        description: page.description,
        inLanguage: "pt-BR",
        about: { "@type": "MedicalTest", name: page.name },
        publisher: { "@id": CLINIC_ID },
      },
      breadcrumbSchema([
        { name: "Início", path: "/" },
        { name: "Exames", path: "/#exames" },
        { name: page.name, path: examPath(page.slug) },
      ]),
    ],
  };
}

export function specialtyPageSchema(page: ServicePage) {
  const path = specialtyPath(page.slug);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        url: absoluteUrl(path),
        name: page.heading,
        description: page.description,
        inLanguage: "pt-BR",
        about: { "@type": "MedicalCondition", name: page.name },
        relatedLink: (page.relatedExams ?? []).map((slug) => absoluteUrl(examPath(slug))),
        publisher: { "@id": CLINIC_ID },
      },
      breadcrumbSchema([
        { name: "Início", path: "/" },
        { name: "Especialidades", path: "/#especialidades" },
        { name: page.name, path },
      ]),
    ],
  };
}
