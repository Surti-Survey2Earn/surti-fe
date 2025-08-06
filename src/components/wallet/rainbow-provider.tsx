"use client";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type React from "react";
import { WagmiProvider } from "wagmi";
import { ThemeProvider } from "@/components/theme-provider"

import { wagmiConfig } from "../../config/wagmi";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <RainbowKitProvider>
                        {children}
                    </RainbowKitProvider>
                </ThemeProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
