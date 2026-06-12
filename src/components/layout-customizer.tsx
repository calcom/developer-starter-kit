"use client";

import {
  CheckIcon,
  CopyIcon,
  Monitor,
  Moon,
  PaintbrushIcon,
  RotateCcwIcon,
  Sun,
  XIcon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

type PrimaryPreset = {
  key: string;
  label: string;
  color: string;
};

const PRIMARIES: PrimaryPreset[] = [
  { key: "default", label: "Slate", color: "linear-gradient(135deg, #525252, #171717)" },
  { key: "blue", label: "Blue", color: "linear-gradient(135deg, #60a5fa, #2563eb)" },
  { key: "violet", label: "Violet", color: "linear-gradient(135deg, #a78bfa, #7c3aed)" },
  { key: "pink", label: "Pink", color: "linear-gradient(135deg, #f472b6, #db2777)" },
  { key: "green", label: "Green", color: "linear-gradient(135deg, #4ade80, #16a34a)" },
  { key: "orange", label: "Orange", color: "linear-gradient(135deg, #fb923c, #ea580c)" },
];

const RADII = [
  { key: "sharp", label: "Sharp", value: "0.125rem" },
  { key: "default", label: "Default", value: "0.625rem" },
  { key: "rounded", label: "Rounded", value: "1rem" },
];

const FONTS = [
  { key: "default", label: "Cal Sans", family: "var(--font-cal)" },
  { key: "inter", label: "Inter", family: "var(--font-inter)" },
  { key: "geist", label: "Geist", family: "var(--font-geist)" },
  { key: "system", label: "System", family: "ui-sans-serif, system-ui, sans-serif" },
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
  const [font, setFont] = useState("default");
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

  useEffect(() => {
    const root = document.documentElement;
    if (font === "default") delete root.dataset.font;
    else root.dataset.font = font;
  }, [font]);

  function reset() {
    setPrimary("default");
    setRadius("default");
    setFont("default");
    setTheme("system");
  }

  const isDirty =
    primary !== "default" || radius !== "default" || font !== "default" || theme !== "system";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open layout customizer"
        className="group fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full transition-transform hover:scale-110 active:scale-95"
      >
        <span
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, #f87171, #fb923c, #facc15, #4ade80, #22d3ee, #818cf8, #c084fc, #f472b6, #f87171)",
            animation: "rainbow-spin 6s linear infinite",
          }}
        />
        <span
          aria-hidden
          className="absolute inset-[3px] rounded-full bg-background shadow-inner"
        />
        <PaintbrushIcon className="relative size-5 text-foreground transition-transform group-hover:rotate-12" />
      </button>

      <div
        aria-hidden={!open}
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <aside
        aria-hidden={!open}
        style={{ width: "min(420px, 100vw)" }}
        className={cn(
          "fixed bottom-0 right-0 top-0 z-50 flex flex-col bg-background shadow-2xl transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <header
          className="relative flex items-start justify-between"
          style={{ padding: "28px 28px 22px 28px" }}
        >
          <div>
            <div className="flex items-center" style={{ gap: "10px" }}>
              <h2 style={{ fontSize: "22px", fontWeight: 600, letterSpacing: "-0.015em" }}>
                Customize
              </h2>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "3px 8px",
                  borderRadius: "999px",
                  background: "rgba(16, 185, 129, 0.12)",
                  color: "rgb(5, 150, 105)",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                <span style={{ position: "relative", width: "6px", height: "6px" }}>
                  <span
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "999px",
                      background: "rgb(16, 185, 129)",
                      opacity: 0.6,
                      animation: "rainbow-pulse 2s ease-in-out infinite",
                    }}
                  />
                  <span
                    style={{
                      position: "relative",
                      display: "inline-block",
                      width: "6px",
                      height: "6px",
                      borderRadius: "999px",
                      background: "rgb(16, 185, 129)",
                    }}
                  />
                </span>
                Live
              </span>
            </div>
            <p
              style={{
                marginTop: "6px",
                fontSize: "13px",
                color: "var(--muted-foreground)",
              }}
            >
              Tune the template to your brand.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close customizer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              color: "var(--muted-foreground)",
              marginRight: "-6px",
              marginTop: "-4px",
              transition: "all 150ms ease",
            }}
            className="hover:bg-accent hover:text-foreground"
          >
            <XIcon style={{ width: "16px", height: "16px" }} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto" style={{ padding: "8px 28px 24px 28px" }}>
          <Section title="Brand color" hint={PRIMARIES.find((p) => p.key === primary)?.label}>
            <div className="flex flex-wrap" style={{ gap: "14px", paddingTop: "4px" }}>
              {PRIMARIES.map((preset) => {
                const active = primary === preset.key;
                return (
                  <button
                    key={preset.key}
                    type="button"
                    onClick={() => setPrimary(preset.key)}
                    aria-label={preset.label}
                    aria-pressed={active}
                    className="group"
                    style={{
                      position: "relative",
                      width: "44px",
                      height: "44px",
                      borderRadius: "999px",
                      background: preset.color,
                      transition: "transform 180ms ease",
                      transform: active ? "scale(1.08)" : "scale(1)",
                      boxShadow: active
                        ? "0 0 0 2px var(--background), 0 0 0 4px var(--foreground), 0 8px 16px -6px rgba(0,0,0,0.3)"
                        : "0 2px 6px -2px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.18)",
                    }}
                  >
                    {active ? (
                      <CheckIcon
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: "16px",
                          height: "16px",
                          color: "#fff",
                          filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))",
                        }}
                        strokeWidth={3}
                      />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </Section>

          <Section title="Corner radius" hint={RADII.find((r) => r.key === radius)?.label}>
            <SegmentedControl>
              {RADII.map((preset) => (
                <SegmentedItem
                  key={preset.key}
                  active={radius === preset.key}
                  onClick={() => setRadius(preset.key)}
                >
                  <span
                    aria-hidden
                    style={{
                      width: "18px",
                      height: "18px",
                      background: "currentColor",
                      borderRadius: preset.value,
                      opacity: 0.85,
                    }}
                  />
                  {preset.label}
                </SegmentedItem>
              ))}
            </SegmentedControl>
          </Section>

          <Section title="Typeface" hint={FONTS.find((f) => f.key === font)?.label}>
            <div className="grid grid-cols-2" style={{ gap: "10px", paddingTop: "4px" }}>
              {FONTS.map((preset) => {
                const active = font === preset.key;
                return (
                  <button
                    key={preset.key}
                    type="button"
                    onClick={() => setFont(preset.key)}
                    aria-pressed={active}
                    className="flex flex-col items-center justify-center transition-all hover:-translate-y-0.5"
                    style={{
                      padding: "18px 12px",
                      borderRadius: "14px",
                      background: active ? "var(--card)" : "transparent",
                      boxShadow: active
                        ? "0 0 0 2px var(--foreground), 0 6px 18px -8px rgba(0,0,0,0.2)"
                        : "0 0 0 1px color-mix(in oklab, var(--border) 70%, transparent)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: preset.family,
                        fontSize: "26px",
                        fontWeight: 600,
                        lineHeight: 1,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      Aa
                    </span>
                    <span
                      style={{
                        marginTop: "10px",
                        fontFamily: preset.family,
                        fontSize: "11px",
                        color: "var(--muted-foreground)",
                        fontWeight: 500,
                      }}
                    >
                      {preset.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </Section>

          <Section title="Appearance" hint={MODES.find((m) => m.key === theme)?.label ?? "System"}>
            <SegmentedControl>
              {MODES.map((mode) => {
                const Icon = mode.icon;
                return (
                  <SegmentedItem
                    key={mode.key}
                    active={theme === mode.key}
                    onClick={() => setTheme(mode.key)}
                  >
                    <Icon style={{ width: "14px", height: "14px" }} />
                    {mode.label}
                  </SegmentedItem>
                );
              })}
            </SegmentedControl>
          </Section>

          <Section title="Export" hint={isDirty ? "Live" : "Defaults"} last>
            <ExportPanel primary={primary} radius={radius} font={font} isDirty={isDirty} />
          </Section>
        </div>

        <footer
          className="flex items-center justify-between"
          style={{
            padding: "16px 28px",
            borderTop: "1px solid color-mix(in oklab, var(--border) 70%, transparent)",
            gap: "12px",
          }}
        >
          <span style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>
            Changes apply for this session
          </span>
          <button
            type="button"
            onClick={reset}
            disabled={!isDirty}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              borderRadius: "10px",
              fontSize: "12px",
              fontWeight: 500,
              border: "1px solid color-mix(in oklab, var(--border) 80%, transparent)",
              background: "var(--background)",
              cursor: isDirty ? "pointer" : "not-allowed",
              opacity: isDirty ? 1 : 0.4,
              transition: "all 150ms ease",
            }}
            className={isDirty ? "hover:-translate-y-0.5 hover:shadow" : ""}
          >
            <RotateCcwIcon style={{ width: "13px", height: "13px" }} />
            Reset
          </button>
        </footer>
      </aside>
    </>
  );
}

function Section({
  title,
  hint,
  children,
  last = false,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <section
      style={{
        padding: "24px 0",
        borderBottom: last
          ? "none"
          : "1px solid color-mix(in oklab, var(--border) 50%, transparent)",
      }}
    >
      <header className="flex items-baseline justify-between" style={{ marginBottom: "14px" }}>
        <h3
          style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--muted-foreground)",
          }}
        >
          {title}
        </h3>
        {hint ? (
          <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--foreground)" }}>
            {hint}
          </span>
        ) : null}
      </header>
      {children}
    </section>
  );
}

function SegmentedControl({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridAutoFlow: "column",
        gridAutoColumns: "1fr",
        padding: "4px",
        borderRadius: "12px",
        background: "color-mix(in oklab, var(--muted) 60%, transparent)",
        gap: "2px",
      }}
    >
      {children}
    </div>
  );
}

function SegmentedItem({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        padding: "10px 8px",
        borderRadius: "9px",
        fontSize: "12px",
        fontWeight: 500,
        background: active ? "var(--background)" : "transparent",
        color: active ? "var(--foreground)" : "var(--muted-foreground)",
        boxShadow: active
          ? "0 0 0 1px color-mix(in oklab, var(--border) 80%, transparent), 0 2px 8px -2px rgba(0,0,0,0.12)"
          : "none",
        transition: "all 150ms ease",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

type PrimaryCss = {
  light: { primary: string; ring: string };
  dark: { primary: string; fg: string };
};

const PRIMARY_CSS: Record<string, PrimaryCss> = {
  blue: {
    light: { primary: "oklch(0.55 0.20 252)", ring: "oklch(0.55 0.20 252)" },
    dark: { primary: "oklch(0.72 0.16 252)", fg: "oklch(0.15 0 0)" },
  },
  violet: {
    light: { primary: "oklch(0.55 0.22 295)", ring: "oklch(0.55 0.22 295)" },
    dark: { primary: "oklch(0.74 0.17 295)", fg: "oklch(0.15 0 0)" },
  },
  pink: {
    light: { primary: "oklch(0.60 0.22 5)", ring: "oklch(0.60 0.22 5)" },
    dark: { primary: "oklch(0.76 0.18 5)", fg: "oklch(0.15 0 0)" },
  },
  green: {
    light: { primary: "oklch(0.55 0.18 145)", ring: "oklch(0.55 0.18 145)" },
    dark: { primary: "oklch(0.78 0.16 145)", fg: "oklch(0.15 0 0)" },
  },
  orange: {
    light: { primary: "oklch(0.65 0.19 50)", ring: "oklch(0.65 0.19 50)" },
    dark: { primary: "oklch(0.82 0.16 60)", fg: "oklch(0.15 0 0)" },
  },
};

const RADIUS_VALUES: Record<string, string> = {
  sharp: "0.125rem",
  default: "0.625rem",
  rounded: "1rem",
};

const FONT_FAMILIES: Record<string, string> = {
  inter: "var(--font-inter)",
  geist: "var(--font-geist)",
  system: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
};

function buildCss(primary: string, radius: string, font: string): string {
  const rootLines: string[] = [];
  const darkLines: string[] = [];

  if (primary !== "default" && PRIMARY_CSS[primary]) {
    const p = PRIMARY_CSS[primary];
    rootLines.push(`  --primary: ${p.light.primary};`);
    rootLines.push(`  --ring: ${p.light.ring};`);
    darkLines.push(`  --primary: ${p.dark.primary};`);
    darkLines.push(`  --primary-foreground: ${p.dark.fg};`);
  }
  if (radius !== "default" && RADIUS_VALUES[radius]) {
    rootLines.push(`  --radius: ${RADIUS_VALUES[radius]};`);
  }
  if (font !== "default" && FONT_FAMILIES[font]) {
    rootLines.push(`  --font-sans: ${FONT_FAMILIES[font]};`);
    rootLines.push(`  --font-heading: ${FONT_FAMILIES[font]};`);
  }

  if (rootLines.length === 0) {
    return "/* No overrides — using the template defaults. */";
  }

  let out = `:root {\n${rootLines.join("\n")}\n}`;
  if (darkLines.length > 0) {
    out += `\n\n.dark {\n${darkLines.join("\n")}\n}`;
  }
  return out;
}

function ExportPanel({
  primary,
  radius,
  font,
  isDirty,
}: {
  primary: string;
  radius: string;
  font: string;
  isDirty: boolean;
}) {
  const css = useMemo(() => buildCss(primary, radius, font), [primary, radius, font]);
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <p
        style={{
          fontSize: "12px",
          lineHeight: 1.55,
          color: "var(--muted-foreground)",
        }}
      >
        Paste this into{" "}
        <code
          style={{
            padding: "1px 5px",
            borderRadius: "4px",
            background: "color-mix(in oklab, var(--muted) 80%, transparent)",
            fontFamily: "ui-monospace, monospace",
            fontSize: "11px",
          }}
        >
          src/app/globals.css
        </code>{" "}
        to lock in your selection.
      </p>

      <div style={{ position: "relative" }}>
        <pre
          style={{
            margin: 0,
            padding: "14px 16px",
            paddingTop: "16px",
            borderRadius: "12px",
            background: "color-mix(in oklab, var(--muted) 70%, transparent)",
            border: "1px solid color-mix(in oklab, var(--border) 70%, transparent)",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: "11px",
            lineHeight: 1.65,
            color: "var(--foreground)",
            overflowX: "auto",
            maxHeight: "220px",
          }}
        >
          <code>{css}</code>
        </pre>

        <button
          type="button"
          onClick={copy}
          disabled={!isDirty}
          aria-label={copied ? "Copied!" : "Copy CSS"}
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            padding: "5px 9px",
            borderRadius: "8px",
            fontSize: "11px",
            fontWeight: 600,
            border: "1px solid color-mix(in oklab, var(--border) 80%, transparent)",
            background: "var(--background)",
            color: copied ? "rgb(5, 150, 105)" : "var(--foreground)",
            cursor: isDirty ? "pointer" : "not-allowed",
            opacity: isDirty ? 1 : 0.5,
            transition: "all 150ms ease",
          }}
          className={isDirty ? "hover:-translate-y-0.5 hover:shadow" : ""}
        >
          {copied ? (
            <CheckIcon style={{ width: "12px", height: "12px" }} strokeWidth={3} />
          ) : (
            <CopyIcon style={{ width: "12px", height: "12px" }} />
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}
