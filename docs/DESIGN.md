# Design reference – Clínica San Gabriel

## Secondary small pill button (tag style)

Use for **informative tags**, **secondary CTAs**, or **low-emphasis actions** (e.g. “Parceria Hospital de Olhos do Paraná”, “Ver rotas” on the map).

**Visual:**
- **Shape:** Pill / capsule (`rounded-full`)
- **Background:** Light beige (theme `secondary` – cream)
- **Text:** Orange-brown (theme `secondary-foreground`)
- **Size:** Small – `text-sm`, comfortable horizontal padding (`px-4`), compact height (`h-8` / `py-2`)
- **No strong shadow** – subtle or none

**Usage:**

1. **Button component** (recommended):
   ```tsx
   <Button variant="secondaryPill" size="pill">
     Label
   </Button>
   ```
   Or as a link:
   ```tsx
   <Button variant="secondaryPill" size="pill" asChild>
     <Link href="...">Label</Link>
   </Button>
   ```

2. **Inline classes** (e.g. inside a `Link`):
   ```tsx
   className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow-none hover:bg-secondary/90"
   ```

**Defined in:** `components/ui/button.tsx` – variant `secondaryPill`, size `pill`.
