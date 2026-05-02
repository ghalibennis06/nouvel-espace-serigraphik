"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface BeamsBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  intensity?: "subtle" | "medium" | "strong";
}

interface Beam {
  x: number;
  y: number;
  width: number;
  length: number;
  angle: number;
  speed: number;
  opacity: number;
  hue: number;
  pulse: number;
  pulseSpeed: number;
}

const OPACITY_MAP = { subtle: 0.7, medium: 0.85, strong: 1 };
const MINIMUM_BEAMS = 20;

function createBeam(width: number, height: number): Beam {
  return {
    x: Math.random() * width * 1.5 - width * 0.25,
    y: Math.random() * height * 1.5 - height * 0.25,
    width: 30 + Math.random() * 60,
    length: height * 2.5,
    angle: -35 + Math.random() * 10,
    speed: 0.6 + Math.random() * 1.2,
    opacity: 0.12 + Math.random() * 0.16,
    hue: 190 + Math.random() * 70,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.02 + Math.random() * 0.03,
  };
}

export function BeamsCanvas({ intensity = "strong" as BeamsBackgroundProps["intensity"], className }: { intensity?: BeamsBackgroundProps["intensity"]; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beamsRef = useRef<Beam[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      beamsRef.current = Array.from({ length: Math.round(MINIMUM_BEAMS * 1.5) }, () =>
        createBeam(canvas.width, canvas.height)
      );
    };

    resize();
    window.addEventListener("resize", resize);

    function resetBeam(beam: Beam, index: number, total: number) {
      if (!canvas) return;
      const col = index % 3;
      const spacing = canvas.width / 3;
      beam.y = canvas.height + 100;
      beam.x = col * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5;
      beam.width = 100 + Math.random() * 100;
      beam.speed = 0.5 + Math.random() * 0.4;
      beam.hue = 190 + (index * 70) / total;
      beam.opacity = 0.2 + Math.random() * 0.1;
    }

    function drawBeam(beam: Beam) {
      ctx!.save();
      ctx!.translate(beam.x, beam.y);
      ctx!.rotate((beam.angle * Math.PI) / 180);
      const alpha = beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.2) * (OPACITY_MAP[intensity!] ?? 1);
      const grad = ctx!.createLinearGradient(0, 0, 0, beam.length);
      grad.addColorStop(0, `hsla(${beam.hue},85%,65%,0)`);
      grad.addColorStop(0.1, `hsla(${beam.hue},85%,65%,${alpha * 0.5})`);
      grad.addColorStop(0.4, `hsla(${beam.hue},85%,65%,${alpha})`);
      grad.addColorStop(0.6, `hsla(${beam.hue},85%,65%,${alpha})`);
      grad.addColorStop(0.9, `hsla(${beam.hue},85%,65%,${alpha * 0.5})`);
      grad.addColorStop(1, `hsla(${beam.hue},85%,65%,0)`);
      ctx!.fillStyle = grad;
      ctx!.fillRect(-beam.width / 2, 0, beam.width, beam.length);
      ctx!.restore();
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.filter = "blur(35px)";
      const total = beamsRef.current.length;
      beamsRef.current.forEach((beam, i) => {
        beam.y -= beam.speed;
        beam.pulse += beam.pulseSpeed;
        if (beam.y + beam.length < -100) resetBeam(beam, i, total);
        drawBeam(beam);
      });
      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 pointer-events-none", className)}
      style={{ filter: "blur(15px)" }}
    />
  );
}

export function BeamsBackground({ className, intensity = "strong", children }: BeamsBackgroundProps) {
  return (
    <div className={cn("relative min-h-screen w-full overflow-hidden bg-neutral-950", className)}>
      <BeamsCanvas intensity={intensity} />

      <motion.div
        className="absolute inset-0 bg-neutral-950/5"
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
        style={{ backdropFilter: "blur(50px)" }}
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
