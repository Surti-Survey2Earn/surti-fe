
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { base, liskSepolia, mainnet, sepolia } from "wagmi/chains";

export const wagmiConfig = getDefaultConfig({
  appName: "Create Web3 Kit",
  projectId: "9d5461d65ecda1d30e5d78a67aba80e6",
  chains: [mainnet, base, sepolia, liskSepolia],
  ssr: true,
});
