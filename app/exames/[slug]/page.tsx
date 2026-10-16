import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import { ServicePageView } from "@/components/service-page";
import { EXAM_PAGES, examPath, findExamPage } from "@/lib/service-pages";
import { examPageSchema } from "@/lib/structured-data";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return EXAM_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = findExamPage((await params).slug);
  if (!page) return {};

  return pageMetadata({
    title: page.heading.replace(" – ", ", "),
    description: page.description,
    path: examPath(page.slug),
  });
}

export default async function ExamPage({ params }: Props) {
  const page = findExamPage((await params).slug);
  if (!page) notFound();

  return (
    <>
      <JsonLd data={examPageSchema(page)} />
      <ServicePageView page={page} kind="exame" />
    </>
  );
}
