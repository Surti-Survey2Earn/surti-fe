"use client"

import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "src/hooks/use-toast"
import { Copy, ExternalLink, LogOut } from "lucide-react"

export function ConnectButton() {
  const { toast } = useToast()

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address)
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard",
    })
  }

  return (
    <RainbowConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button onClick={openConnectModal} type="button">
                    Connect Wallet
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button onClick={openChainModal} type="button" variant="destructive">
                    Wrong network
                  </Button>
                );
              }

              return (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      {account.displayName}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-sm text-muted-foreground">Connected</span>
                      </div>
                      <div className="font-mono text-xs sm:text-sm mt-1">
                        {account.displayName}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {chain.name}
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => copyAddress(account.address)}
                      className="flex items-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      <span className="text-sm">Copy Address</span>
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem
                      onClick={() => {
                        const explorerUrl = chain.blockExplorers?.default?.url;
                        if (explorerUrl && account.address) {
                          window.open(`${explorerUrl}/address/${account.address}`, '_blank');
                        }
                      }}
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm">View on Explorer</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator /> */}
                    <DropdownMenuItem onClick={openAccountModal} className="flex items-center gap-2 text-red-600">
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Disconnect</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            })()}
          </div>
        );
      }}
    </RainbowConnectButton.Custom>
  )
}