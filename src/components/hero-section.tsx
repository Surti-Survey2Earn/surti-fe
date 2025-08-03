"use client"
import React from 'react'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ConnectButton } from "@/components/connect-button"
import Link from "next/link"
import AnimatedBackground from './animated-background'
import { Badge } from "@/components/ui/badge"

import { useAccount } from "wagmi" // Import useAccount from providers

export default function HeroSection() {
    const { isConnected } = useAccount();
    return (
        <>{/* Background */}
            <div className="fixed inset-0 -z-10">
                <AnimatedBackground />
                <div className="absolute inset-0 bg-white/30 dark:bg-black/20 backdrop-blur-sm" />
            </div>
            <main className="overflow-x-hidden">
                <section>
                    <div className="py-24 md:pb-32 lg:pb-36 lg:pt-72">
                        <div className="relative mx-auto flex max-w-7xl flex-col px-6 lg:block lg:px-12">
                            <div className="mx-auto max-w-lg text-center lg:ml-0 lg:max-w-full lg:text-left">
                                <Badge variant="secondary" className="mb-4">
                                    🚀 Web3 Survey Platform
                                </Badge>
                                <h1 className="-mt-2 max-w-2xl text-balance text-5xl md:text-6xl xl:text-7xl" >
                                    <span style={{ color: "#003049" }}>Earn</span> While <span style={{ color: "#003049" }}>You</span> Share <span style={{ color: "#003049" }}>You</span>r Opinion.
                                </h1>
                                <p className="mt-6 max-w-2xl text-balance text-lg" >
                                    Join the first Web3 survey platform where your insights are rewarded with tokens. Help projects grow while building your reputation on-chain.
                                </p>
                                {isConnected ? (
                                    <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                                        <Button
                                            asChild
                                            size="lg"
                                            className="h-12 rounded-full pl-5 pr-3 text-base"
                                        >
                                            <Link href="/dashboard" className="flex items-center gap-1 text-nowrap " style={{ color: "#003049" }}>
                                                Go To Dashboard
                                                <ChevronRight className="ml-1" />
                                            </Link>
                                        </Button>

                                        <Button
                                            key={2}
                                            asChild
                                            size="lg"
                                            variant="ghost"
                                            className="h-12 rounded-full px-5 text-base hover:bg-zinc-950/5 dark:hover:bg-white/5">
                                            <Link href="/surveys">
                                                <span className="text-nowrap">Browse Surveys</span>
                                            </Link>
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                                        <ConnectButton />
                                        <p className="d-flex text-sm text-gray-500 text-center">Connect your wallet to get started</p>
                                    </div>
                                )}

                            </div>
                        </div>
                        <div className="aspect-2/3 absolute inset-1 -z-10 overflow-hidden rounded-3xl border border-black/10 lg:aspect-video lg:rounded-[3rem] dark:border-white/5">
                            {/* <video
                                autoPlay
                                loop
                                className="size-full object-cover opacity-50 invert dark:opacity-35 dark:invert-0 dark:lg:opacity-75"
                                src="https://ik.imagekit.io/lrigu76hy/tailark/dna-video.mp4?updatedAt=1745736251477"></video> */}

                        </div>
                    </div>


                    <div className="group relative m-auto max-w-7xl px-6">
                        <div className="flex flex-col items-center md:flex-row">
                            <div className="md:max-w-44 md:border-r md:pr-6">
                                <p className="text-end text-sm">Powering the best teams</p>
                            </div>
                            <div className="relative py-6 md:w-[calc(100%-11rem)]">
                                <InfiniteSlider
                                    speedOnHover={20}
                                    speed={40}
                                    gap={112}>
                                    <div className="flex">
                                        <img
                                            className="mx-auto h-5 w-fit dark:invert"
                                            src="https://html.tailus.io/blocks/customers/nvidia.svg"
                                            alt="Nvidia Logo"
                                            height="20"
                                            width="auto"
                                        />
                                    </div>

                                    <div className="flex">
                                        <img
                                            className="mx-auto h-4 w-fit dark:invert"
                                            src="https://html.tailus.io/blocks/customers/column.svg"
                                            alt="Column Logo"
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
                                            className="mx-auto h-5 w-fit dark:invert"
                                            src="https://html.tailus.io/blocks/customers/nike.svg"
                                            alt="Nike Logo"
                                            height="20"
                                            width="auto"
                                        />
                                    </div>
                                    <div className="flex">
                                        <img
                                            className="mx-auto h-5 w-fit dark:invert"
                                            src="https://html.tailus.io/blocks/customers/lemonsqueezy.svg"
                                            alt="Lemon Squeezy Logo"
                                            height="20"
                                            width="auto"
                                        />
                                    </div>
                                    <div className="flex">
                                        <img
                                            className="mx-auto h-4 w-fit dark:invert"
                                            src="https://html.tailus.io/blocks/customers/laravel.svg"
                                            alt="Laravel Logo"
                                            height="16"
                                            width="auto"
                                        />
                                    </div>
                                    <div className="flex">
                                        <img
                                            className="mx-auto h-7 w-fit dark:invert"
                                            src="https://html.tailus.io/blocks/customers/lilly.svg"
                                            alt="Lilly Logo"
                                            height="28"
                                            width="auto"
                                        />
                                    </div>

                                    <div className="flex">
                                        <img
                                            className="mx-auto h-6 w-fit dark:invert"
                                            src="https://html.tailus.io/blocks/customers/openai.svg"
                                            alt="OpenAI Logo"
                                            height="24"
                                            width="auto"
                                        />
                                    </div>
                                </InfiniteSlider>

                                {/* <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
                                <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
                                <ProgressiveBlur
                                    className="pointer-events-none absolute left-0 top-0 h-full w-20"
                                    direction="left"
                                    blurIntensity={1}
                                />
                                <ProgressiveBlur
                                    className="pointer-events-none absolute right-0 top-0 h-full w-20"
                                    direction="right"
                                    blurIntensity={1}
                                /> */}
                            </div>
                        </div>
                    </div>
                </section>
            </main >
        </>
    )
}
