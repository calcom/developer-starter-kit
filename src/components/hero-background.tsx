export function HeroBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[820px] overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.45] dark:opacity-[0.22]"
        style={{
          backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          color: "var(--muted-foreground)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black 0%, transparent 78%)",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black 0%, transparent 78%)",
        }}
      />

      <div className="absolute left-1/2 top-0 h-[1100px] w-[1100px] -translate-x-1/2 -translate-y-1/2 opacity-60 dark:opacity-40">
        <div
          className="hero-spin absolute inset-0"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, var(--foreground) 60deg, transparent 120deg, transparent 240deg, var(--foreground) 300deg, transparent 360deg)",
            filter: "blur(80px)",
            opacity: 0.08,
            animation: "hero-spin 40s linear infinite",
            transformOrigin: "center",
          }}
        />
      </div>

      <div className="absolute inset-x-0 top-0 h-[440px] overflow-hidden">
        <div
          className="hero-sweep absolute -inset-y-10 -left-1/3 w-1/2 opacity-0"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, color-mix(in oklab, var(--foreground) 8%, transparent) 50%, transparent 100%)",
            filter: "blur(40px)",
            animation: "hero-sweep 9s ease-in-out infinite",
          }}
        />
      </div>

      <div
        className="absolute inset-x-0 top-0 h-[600px]"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, color-mix(in oklab, var(--foreground) 6%, transparent), transparent 70%)",
        }}
      />

      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}
