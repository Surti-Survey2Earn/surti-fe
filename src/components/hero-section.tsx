"use client"
import React from "react"
import { InfiniteSlider } from "@/components/ui/infinite-slider"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ConnectButton } from "@/components/connect-button"
import Link from "next/link"
import AnimatedBackground from "./animated-background"
import { Badge } from "@/components/ui/badge"
import { useAccount } from "wagmi"
import { motion } from "framer-motion"

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.2 },
}

export default function HeroSection() {
    const { isConnected } = useAccount()

    return (
        <>
            {/* Background */}
            <div className="fixed inset-0 -z-10">
                <AnimatedBackground />
                <div className="absolute inset-0 bg-white/30 dark:bg-black/20 backdrop-blur-sm" />
            </div>

            <main className="overflow-x-hidden">
                <section>
                    <div className="py-24 md:pb-32 lg:pb-36 lg:pt-72">
                        <div className="relative mx-auto flex max-w-7xl flex-col px-6 lg:block lg:px-12">
                            <div className="mx-auto max-w-lg text-center lg:ml-0 lg:max-w-full lg:text-left">
                                <motion.div {...fadeUp}>
                                    <Badge variant="secondary" className="mb-4">
                                        🚀 Web3 Survey Platform
                                    </Badge>
                                    <h1 className="-mt-2 max-w-2xl text-balance text-5xl md:text-6xl xl:text-7xl">
                                        <span style={{ color: "#003049" }}>Earn</span> While{" "}
                                        <span style={{ color: "#003049" }}>You</span> Share{" "}
                                        <span style={{ color: "#003049" }}>You</span>r Opinion.
                                    </h1>
                                    <p className="mt-6 max-w-2xl text-balance text-lg">
                                        Join the first Web3 survey platform where your insights are
                                        rewarded with tokens. Help projects grow while building
                                        your reputation on-chain.
                                    </p>
                                </motion.div>

                                {isConnected ? (
                                    <motion.div
                                        {...fadeUp}
                                        className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start"
                                    >
                                        <Button
                                            asChild
                                            size="lg"
                                            className="h-12 rounded-full pl-5 pr-3 text-base"
                                        >
                                            <Link
                                                href="/dashboard"
                                                className="flex items-center gap-1 text-nowrap"
                                                style={{ color: "#003049" }}
                                            >
                                                Go To Dashboard <ChevronRight className="ml-1" />
                                            </Link>
                                        </Button>

                                        <Button
                                            asChild
                                            size="lg"
                                            variant="ghost"
                                            className="h-12 rounded-full px-5 text-base hover:bg-zinc-950/5 dark:hover:bg-white/5"
                                        >
                                            <Link href="/surveys">
                                                <span className="text-nowrap">Browse Surveys</span>
                                            </Link>
                                        </Button>
                                    </motion.div>
                                ) : (
                                    <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                                        <ConnectButton />
                                        <p className="text-sm text-gray-500 text-center">
                                            Connect your wallet to get started
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="aspect-2/3 absolute inset-1 -z-10 overflow-hidden rounded-3xl border border-black/10 lg:aspect-video lg:rounded-[3rem] dark:border-white/5">
                            {/* Optional: Video background */}
                        </div>
                    </div>

                    <div className="group relative m-auto max-w-7xl px-6">
                        <div className="flex flex-col items-center md:flex-row">
                            <div className="md:max-w-44 md:border-r md:pr-6">
                                <motion.p className="text-end text-sm" {...fadeUp}>
                                    Powering the best teams
                                </motion.p>
                            </div>

                            <div className="relative py-6 md:w-[calc(100%-11rem)]">
                                <InfiniteSlider speedOnHover={20} speed={40} gap={112}>
                                    <div className="flex">
                                        <img
                                            className="mx-auto h-5 w-fit light:invert"
                                            src="https://lisk.com/wp-content/uploads/2025/02/lisk-wordmark-w.png"
                                            alt="Lisk Logo"
                                            height="20"
                                            width="auto"
                                        />
                                    </div>
                                    <div className="flex">
                                        <img
                                            className="mx-auto h-4 w-fit dark:invert"
                                            src="https://wagmi.sh/logo-light.svg"
                                            alt="Wagmi logo"
                                            height="16"
                                            width="auto"
                                        />
                                    </div>
                                    <div className="flex">
                                        <img
                                            className="mx-auto h-4 w-fit dark:invert"
                                            src="https://html.tailus.io/blocks/customers/github.svg"
                                            alt="GitHub Logo"
                                            height="16"
                                            width="auto"
                                        />
                                    </div>
                                    <div className="flex">
                                        <img
                                            className="mx-auto h-4 w-fit dark:invert"
                                            src="https://cdn.freelogovectors.net/wp-content/uploads/2023/09/next-js-logo-freelogovectors.net_.png"
                                            alt="Next js"
                                            height="20"
                                            width="auto"
                                        />
                                    </div>
                                </InfiniteSlider>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
