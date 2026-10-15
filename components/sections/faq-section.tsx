"use client";

import React from "react";
import { FAQ } from "@/lib/clinic-data";
import { trackEvent } from "@/lib/analytics";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function trackFaqOpen(value: string) {
  if (!value) return;
  const question = FAQ[Number(value.replace("faq-", ""))]?.question;
  if (question) trackEvent("faq_open", { question });
}

export function FAQSection() {
  return (
    <section
      id="faq"
      className="bg-white"
      aria-labelledby="faq-title"
    >
      <div className="mx-auto max-w-6xl">
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <h2
            id="faq-title"
            className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
          >
            Perguntas Frequentes
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">
            Tire suas dúvidas sobre consultas e cuidados com a saúde ocular.
          </p>

          <Accordion
            type="single"
            collapsible
            onValueChange={trackFaqOpen}
            className="mt-8"
          >
            {FAQ.map((item, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
              >
                <AccordionTrigger className="font-normal">{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
