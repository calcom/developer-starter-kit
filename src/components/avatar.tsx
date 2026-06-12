"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

type AvatarProps = {
  name: string;
  src?: string | null;
  size?: number;
  className?: string;
};

function resolveSrc(src: string | null | undefined): string | null {
  if (!src) return null;
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  if (src.startsWith("/")) return `https://app.cal.com${src}`;
  return src;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean).slice(0, 2);
  if (parts.length === 0) return "?";
  return parts.map((part) => part[0]?.toUpperCase() ?? "").join("");
}

export function Avatar({ name, src, size = 36, className }: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const resolved = resolveSrc(src);
  const showImage = resolved && !failed;
  const initials = getInitials(name);

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border bg-muted text-xs font-medium text-foreground",
        className,
      )}
      style={{ width: size, height: size }}
      aria-label={name}
    >
      {showImage ? (
        <img
          src={resolved}
          alt={name}
          width={size}
          height={size}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span aria-hidden>{initials}</span>
      )}
    </span>
  );
}
