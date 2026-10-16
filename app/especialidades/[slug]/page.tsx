import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import { ServicePageView } from "@/components/service-page";
import { SPECIALTY_PAGES, findSpecialtyPage, specialtyPath } from "@/lib/service-pages";
import { specialtyPageSchema } from "@/lib/structured-data";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return SPECIALTY_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = findSpecialtyPage((await params).slug);
  if (!page) return {};

  return pageMetadata({
    title: page.heading.replace(" – ", ", "),
    description: page.description,
    path: specialtyPath(page.slug),
  });
}

export default async function SpecialtyPage({ params }: Props) {
  const page = findSpecialtyPage((await params).slug);
  if (!page) notFound();

  return (
    <>
      <JsonLd data={specialtyPageSchema(page)} />
      <ServicePageView page={page} kind="especialidade" />
    </>
  );
}
