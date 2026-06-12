import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

import { CalLogo } from "@/components/cal-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { getBrandName } from "@/lib/cal-api/env";

const NAV_LINKS = [
  { label: "API docs", href: "https://cal.com/docs/api-reference/v2/introduction" },
  { label: "API keys", href: "https://app.cal.com/settings/developer/api-keys" },
];

export function SiteHeader() {
  const brand = getBrandName();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          aria-label={brand}
          className="inline-flex items-center text-foreground transition-opacity hover:opacity-80"
        >
          <CalLogo />
        </Link>
        <nav className="flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 items-center gap-1 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {link.label}
              <ArrowUpRightIcon className="size-3.5" />
            </a>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
