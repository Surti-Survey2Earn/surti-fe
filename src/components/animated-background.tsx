"use client"

import { motion } from "framer-motion"

export default function AnimatedBackground() {
  return (
    <div className="relative w-full h-screen overflow-hidden size-full object-cover opacity-50 invert dark:opacity-10 dark:invert-0 dark:lg:opacity-75">
      {/* Main animated gradient background */}
      <motion.div
        className="absolute inset-0"
        initial={{ backgroundPosition: "0% 0%" }}
        animate={{ backgroundPosition: "100% 100%" }}
        transition={{
          duration: 25, // Slower animation for a subtle flow
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse", // Animates back and forth
        }}
        style={{
          background: `radial-gradient(
            circle at 50% 50%,
            rgb(204, 238, 230) 0%, /* Center light teal */
            rgb(255, 230, 220) 20%, /* Inner peach ring */
            rgb(190, 230, 220) 40%, /* Middle teal ring */
            rgb(255, 220, 210) 60%, /* Outer peach ring */
            rgb(180, 220, 220) 100% /* Outermost teal */
          )`,
          backgroundSize: "200% 200%", // Larger than viewport to allow movement
        }}
      />

      {/* Animated dots */}
      <motion.div
        className="absolute w-4 h-4 rounded-full bg-v0-dot-blue"
        style={{ top: "10%", left: "15%" }}
        animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-3 h-3 rounded-full bg-v0-dot-orange"
        style={{ top: "30%", left: "35%" }}
        animate={{ y: [0, -8, 0], x: [0, 5, 0] }}
        transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.div
        className="absolute w-4 h-4 rounded-full bg-v0-dot-blue"
        style={{ bottom: "15%", left: "10%" }}
        animate={{ y: [0, 12, 0], x: [0, 8, 0] }}
        transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute w-3 h-3 rounded-full bg-v0-dot-orange"
        style={{ top: "40%", right: "20%" }}
        animate={{ y: [0, -10, 0], x: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.5 }}
      />
      <motion.div
        className="absolute w-4 h-4 rounded-full bg-v0-dot-blue"
        style={{ top: "10%", right: "10%" }}
        animate={{ y: [0, 15, 0], x: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute w-3 h-3 rounded-full bg-v0-dot-orange"
        style={{ bottom: "20%", right: "15%" }}
        animate={{ y: [0, -7, 0], x: [0, -4, 0] }}
        transition={{ duration: 7.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2.5 }}
      />
    </div>
  )
}
