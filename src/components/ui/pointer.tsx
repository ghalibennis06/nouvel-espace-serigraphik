import { motion } from "framer-motion";
import {
  type ReactNode,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { cn } from "@/lib/utils";

interface PointerProps {
  /** Pointer SVG / element. Defaults to an arrow cursor tinted via fill class. */
  children?: ReactNode;
  /** Tailwind class applied to the default arrow (e.g. `fill-blue-500`). Ignored when children are given. */
  className?: string;
  style?: CSSProperties;
}

/**
 * Magic-UI style custom pointer. Replaces the system cursor inside its
 * parent element with the supplied SVG/emoji/element. Place it as a
 * direct child of the surface you want to enhance — the parent must be
 * `position: relative`.
 */
export function Pointer({ children, className, style }: PointerProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const node = (containerRef.current = (typeof document !== "undefined"
      ? (document.currentScript?.parentElement as HTMLElement | null)
      : null));
    return () => {
      node && (node.style.cursor = "");
    };
  }, []);

  return (
    <div
      ref={(el) => {
        if (!el) return;
        containerRef.current = el.parentElement as HTMLElement | null;
      }}
      style={{ display: "contents" }}
      onMouseEnter={(e) => {
        const parent = (e.currentTarget.parentElement) as HTMLElement | null;
        if (!parent) return;
        parent.style.cursor = "none";
        setHovering(true);
      }}
      onMouseMove={(e) => {
        const parent = (e.currentTarget.parentElement) as HTMLElement | null;
        if (!parent) return;
        const rect = parent.getBoundingClientRect();
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseLeave={(e) => {
        const parent = (e.currentTarget.parentElement) as HTMLElement | null;
        if (parent) parent.style.cursor = "";
        setHovering(false);
      }}
    >
      {hovering && pos && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.15 }}
          className="pointer-events-none absolute z-50"
          style={{
            left: pos.x,
            top: pos.y,
            transform: "translate(-2px, -2px)",
            ...style,
          }}
        >
          {children ?? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={cn("fill-foreground", className)}
            >
              <path
                d="M5.5 3.5l13 6.5-5.5 2.5-2.5 5.5-5-14.5z"
                stroke="currentColor"
                strokeWidth="0.8"
              />
            </svg>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default Pointer;
