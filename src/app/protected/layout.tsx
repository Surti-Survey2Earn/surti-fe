"use client";

import Providers from "@/components/provider/rainbow-provider";

export default function Web3Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <Providers>{children}</Providers>;
}
