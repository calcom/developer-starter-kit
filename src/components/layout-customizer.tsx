"use client";

import { Monitor, Moon, PaintbrushIcon, RotateCcwIcon, Sun, XIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type PrimaryPreset = {
  key: string;
  label: string;
  swatch: string;
};

const PRIMARIES: PrimaryPreset[] = [
  { key: "default", label: "Slate", swatch: "oklch(0.205 0 0)" },
  { key: "blue", label: "Blue", swatch: "oklch(0.55 0.20 252)" },
  { key: "violet", label: "Violet", swatch: "oklch(0.55 0.22 295)" },
  { key: "pink", label: "Pink", swatch: "oklch(0.60 0.22 5)" },
  { key: "green", label: "Green", swatch: "oklch(0.55 0.18 145)" },
  { key: "orange", label: "Orange", swatch: "oklch(0.65 0.19 50)" },
];

const RADII = [
  { key: "sharp", label: "Sharp" },
  { key: "default", label: "Default" },
  { key: "rounded", label: "Rounded" },
];

const MODES = [
  { key: "light", label: "Light", icon: Sun },
  { key: "dark", label: "Dark", icon: Moon },
  { key: "system", label: "System", icon: Monitor },
] as const;

export function LayoutCustomizer() {
  const [open, setOpen] = useState(false);
  const [primary, setPrimary] = useState("default");
  const [radius, setRadius] = useState("default");
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    if (primary === "default") delete root.dataset.primary;
    else root.dataset.primary = primary;
  }, [primary]);

  useEffect(() => {
    const root = document.documentElement;
    if (radius === "default") delete root.dataset.radius;
    else root.dataset.radius = radius;
  }, [radius]);

  function reset() {
    setPrimary("default");
    setRadius("default");
    setTheme("system");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open layout customizer"
        className="fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border bg-background text-foreground shadow-lg transition-transform hover:scale-105"
      >
        <PaintbrushIcon className="size-5" />
      </button>

      <div
        aria-hidden={!open}
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-200",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <aside
        aria-hidden={!open}
        className={cn(
          "fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-sm flex-col border-l bg-background shadow-2xl transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <header className="flex items-center justify-between border-b px-5 py-4">
          <div>
            <h2 className="text-base font-semibold tracking-tight">Customize</h2>
            <p className="text-xs text-muted-foreground">Preview the template in your brand.</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close customizer"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <XIcon className="size-4" />
          </button>
        </header>

        <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
          <Section title="Brand color">
            <div className="grid grid-cols-3 gap-2">
              {PRIMARIES.map((preset) => {
                const active = primary === preset.key;
                return (
                  <button
                    key={preset.key}
                    type="button"
                    onClick={() => setPrimary(preset.key)}
                    className={cn(
                      "flex items-center gap-2 rounded-md border px-2 py-1.5 text-xs font-medium transition-colors hover:bg-accent",
                      active && "border-foreground bg-accent",
                    )}
                  >
                    <span
                      className="size-3.5 rounded-full"
                      style={{ background: preset.swatch }}
                      aria-hidden
                    />
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </Section>

          <Section title="Radius">
            <div className="grid grid-cols-3 gap-2">
              {RADII.map((preset) => {
                const active = radius === preset.key;
                return (
                  <button
                    key={preset.key}
                    type="button"
                    onClick={() => setRadius(preset.key)}
                    className={cn(
                      "rounded-md border px-2 py-1.5 text-xs font-medium transition-colors hover:bg-accent",
                      active && "border-foreground bg-accent",
                    )}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </Section>

          <Section title="Mode">
            <div className="grid grid-cols-3 gap-2">
              {MODES.map((mode) => {
                const Icon = mode.icon;
                const active = theme === mode.key;
                return (
                  <button
                    key={mode.key}
                    type="button"
                    onClick={() => setTheme(mode.key)}
                    className={cn(
                      "inline-flex items-center justify-center gap-1.5 rounded-md border px-2 py-1.5 text-xs font-medium transition-colors hover:bg-accent",
                      active && "border-foreground bg-accent",
                    )}
                  >
                    <Icon className="size-3.5" />
                    {mode.label}
                  </button>
                );
              })}
            </div>
          </Section>
        </div>

        <footer className="border-t px-5 py-4">
          <button
            type="button"
            onClick={reset}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
          >
            <RotateCcwIcon className="size-4" />
            Reset
          </button>
        </footer>
      </aside>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {title}
      </h3>
      {children}
    </section>
  );
}
