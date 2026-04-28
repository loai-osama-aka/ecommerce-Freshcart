"use client";

import { motion } from "framer-motion";

export default function FadeIn({
  children,
  delay = 0,
  direction = "left",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "left" | "right" | "up";
}) {
  const getX = () => {
    if (direction === "left") return -60;
    if (direction === "right") return 60;
    return 0;
  };

  const getY = () => {
    if (direction === "up") return 40;
    return 0;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: getX(), y: getY() }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}