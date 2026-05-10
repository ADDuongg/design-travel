import { motion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

export function ParallaxHero({
  image,
  heightClass = "min-h-[92vh]",
  overlayClass,
  children,
}: {
  image: string;
  heightClass?: string;
  overlayClass?: string;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);

  return (
    <section ref={ref} className={`relative isolate overflow-hidden ${heightClass}`}>
      <motion.div style={{ y }} className="absolute inset-0 -top-[15%] h-[125%] will-change-transform">
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover object-center scale-[1.03]"
          loading="eager"
        />
      </motion.div>
      <div
        className={
          overlayClass ??
          "absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/55 to-charcoal/15"
        }
      />
      <div className="relative z-[1] flex h-full flex-col">{children}</div>
    </section>
  );
}
