"use client";

import { useScroll, motion, useTransform } from "framer-motion"
import Image from "next/image"
import React from "react"

export const ParallaxSection = ({ children, className, offset = 50 }:
    { children: React.ReactNode, className: string, offset?: number }
) => {
    const { scrollY } = useScroll()
    const y = useTransform(scrollY, [0, 1000], [0, offset])

    return (
        <motion.div style={{ y }} className={className}>
            {children}
        </motion.div>
    )
}

export const ParallaxImage = ({ src, alt, width, height, className, speed = 0.5 }:
    { src: string, alt: string, width: number, height: number, className: string, speed?: number }
) => {
    const { scrollYProgress } = useScroll()
    const y = useTransform(scrollYProgress, [0, 1], [0, 100 * speed])

    return (
        <motion.div className={`relative overflow-hidden ${className}`}>
            <motion.div style={{ y: y }}>
                <Image
                    src={src || "/banf.jpg"}
                    alt={alt}
                    width={width}
                    height={height}
                    className="w-full h-full object-cover "
                />
            </motion.div>
        </motion.div>
    )
}