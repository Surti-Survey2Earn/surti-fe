"use client";

import Providers from "@/components/wallet/rainbow-provider";

export default function Web3Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <Providers>{children}</Providers>;
}
