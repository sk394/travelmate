import { motion } from "framer-motion";

export const FloatingElement = ({ children, className, xOffset = 20, yOffset = 20, duration = 3 }:
    { children: React.ReactNode, className: string, xOffset?: number, yOffset?: number, duration?: number }
) => {
    return (
        <motion.div
            className={className}
            animate={{
                y: [0, yOffset, 0],
                x: [0, xOffset, 0],
            }}
            transition={{
                duration: duration,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
            }}
        >
            {children}
        </motion.div>
    )
}