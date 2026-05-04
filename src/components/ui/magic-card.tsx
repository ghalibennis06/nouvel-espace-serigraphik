import { type CSSProperties, type ReactNode, useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagicCardProps {
  children: ReactNode;
  className?: string;
  /** Spotlight radius in pixels. */
  gradientSize?: number;
  /** Glow intensity (0..1). */
  gradientOpacity?: number;
  /** Spotlight gradient inner color. */
  gradientColor?: string;
  /** Spotlight gradient from-color (used in mode="orb"). */
  glowFrom?: string;
  /** Spotlight gradient to-color (used in mode="orb"). */
  glowTo?: string;
  /**
   * "spotlight" → soft radial gradient follows the cursor (default).
   * "orb"       → an orb of color follows the cursor more crisply.
   */
  mode?: "spotlight" | "orb";
  style?: CSSProperties;
}

/**
 * Magic-UI flavour card with a cursor-following glow. Drop around any
 * card-shaped child to add a premium hover feel without changing the
 * child's layout.
 */
export function MagicCard({
  children,
  className,
  gradientSize = 200,
  gradientOpacity = 0.5,
  gradientColor = "rgba(184,99,74,0.18)",
  glowFrom = "#ee4f27",
  glowTo = "#6b21ef",
  mode = "spotlight",
  style,
}: MagicCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mouseX.set(e.clientX - r.left);
      mouseY.set(e.clientY - r.top);
    };
    const handleLeave = () => {
      mouseX.set(-gradientSize);
      mouseY.set(-gradientSize);
    };
    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [gradientSize, mouseX, mouseY]);

  const spotlight = useMotionTemplate`radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 80%)`;

  const orb = useMotionTemplate`radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${glowFrom} 0%, ${glowTo} 50%, transparent 75%)`;

  return (
    <div
      ref={ref}
      className={cn("group relative isolate overflow-hidden rounded-[24px]", className)}
      style={style}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: mode === "orb" ? orb : spotlight,
          opacity: gradientOpacity,
          mixBlendMode: mode === "orb" ? "screen" : "normal",
        }}
      />
      <div className="relative z-20">{children}</div>
    </div>
  );
}

export default MagicCard;
