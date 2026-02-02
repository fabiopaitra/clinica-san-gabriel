"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CLINIC, NAV_LINKS } from "@/lib/clinic-data";

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="Abrir menu de navegação"
        >
          <Menu className="size-6" aria-hidden />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[85vw] max-w-sm"
        aria-label="Menu de navegação"
      >
        <SheetHeader>
          <SheetTitle className="sr-only">Menu</SheetTitle>
        </SheetHeader>
        <nav
          className="mt-8 flex flex-col gap-1"
          aria-label="Navegação principal"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="min-h-[48px] px-4 py-3 text-lg font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-md flex items-center -mx-2"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-6 pt-4 border-t">
            <Button
              variant="whatsapp"
              size="lg"
              className="w-full"
              asChild
            >
              <a
                href={CLINIC.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Falar no WhatsApp"
              >
                Agendar via WhatsApp
              </a>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export function Header() {
  return (
    <header
      className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="banner"
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0"
          aria-label={`${CLINIC.name} - Página inicial`}
        >
          <Image
            src="/clinica-san-gabriel-logo.svg"
            alt=""
            width={180}
            height={50}
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* Desktop navigation */}
        <nav
          className="hidden lg:flex items-center gap-1"
          aria-label="Navegação principal"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="min-h-[44px] px-4 py-2 text-base font-medium text-foreground/90 hover:text-foreground hover:bg-accent rounded-md flex items-center"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="whatsapp" size="lg" className="hidden sm:inline-flex" asChild>
            <a
              href={CLINIC.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar no WhatsApp"
            >
              Agendar
            </a>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
