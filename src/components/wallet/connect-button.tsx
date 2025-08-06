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

const buttonBaseStyles = "rounded-full hover:rounded-full";

const ChainIcon = ({ iconUrl, name, background, size = 20 }: {
  iconUrl?: string;
  name?: string;
  background?: string;
  size?: number;
}) => (
  <div
    style={{
      background,
      width: size,
      height: size,
      borderRadius: 999,
      overflow: 'hidden',
      marginRight: 4,
    }}
  >
    {iconUrl && (
      <img
        alt={`${name ?? 'Chain'} icon`}
        src={iconUrl}
        style={{ width: size, height: size }}
      />
    )}
  </div>
);

const GradientButton = ({ children, onClick, variant = 'outline' }: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'outline' | 'default';
}) => (
  <Button
    onClick={onClick}
    type="button"
    variant={variant}
    className={`${buttonBaseStyles} flex items-center gap-2 cursor-pointer`}
  >
    {children}
  </Button>
);

export function ConnectButton() {
  const { toast } = useToast()

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address)
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard",
    })
  }

  // Custom mapping untuk block explorer URLs
  const getExplorerUrl = (chainId: number | undefined, address: string) => {
    const explorerUrls: { [key: number]: string } = {
      1: "https://etherscan.io", // Ethereum Mainnet
      11155111: "https://sepolia.etherscan.io", // Ethereum Sepolia
      4202: "https://sepolia-blockscout.lisk.com", // Lisk Sepolia
      8453: "https://basescan.org", // Base Mainnet
      84532: "https://sepolia.basescan.org", // Base Sepolia
    }

    const baseUrl = explorerUrls[chainId || 0]
    return baseUrl ? `${baseUrl}/address/${address}` : null
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
                  <Button
                    onClick={openConnectModal}
                    type="button"
                    className="rounded-full cursor-pointer bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold px-6 py-3 transition-all duration-300 ease-in-out shadow hover:brightness-110 hover:shadow-lg dark:from-indigo-400 dark:to-pink-400"
                  >
                    Connect Wallet
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button
                    onClick={openChainModal}
                    type="button"
                    variant="destructive"
                    className="rounded-full cursor-pointer"
                  >
                    Wrong network
                  </Button>
                );
              }

              return (
                <div className="flex flex-row gap-3 z-50">
                  {/* Chain Button with Dropdown Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        type="button"
                        onClick={openChainModal}
                        className={`${buttonBaseStyles} flex items-center gap-2 cursor-pointer`}
                      >
                        {chain.hasIcon && (
                          <div className='min-w-5'>
                            <ChainIcon
                              iconUrl={chain.iconUrl}
                              name={chain.name}
                              background={chain.iconBackground}
                            />
                          </div>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                        
                  </DropdownMenu>

                  {/* Account Button with Dropdown Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        type="button"
                        className={`${buttonBaseStyles} flex items-center gap-2 cursor-pointer`}
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="max-w-32 truncate">
                          {account.displayName}
                        </span>
                        {account.displayBalance && (
                          <span className="text-xs text-muted-foreground hidden sm:inline">
                            {account.displayBalance}
                          </span>
                        )}
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
                        {chain.id && (
                          <div className="text-xs text-muted-foreground mt-1">
                            <div className="text-xs text-muted-foreground mt-1">
                              {chain.name} (Chain ID: {chain.id})
                            </div>
                          </div>
                        )}
                        {account.displayBalance && (
                          <div className="text-xs text-muted-foreground mt-1">
                            Balance: {account.displayBalance}
                          </div>
                        )}

                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => copyAddress(account.address)}
                        className="flex items-center gap-2"
                      >
                        <Copy className="w-4 h-4" />
                        <span className="text-sm">Copy Address</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          const explorerUrl = getExplorerUrl(chain.id, account.address);
                          if (explorerUrl) {
                            window.open(explorerUrl, '_blank');
                          } else {
                            toast({
                              title: "Explorer Not Available",
                              description: "Block explorer not configured for this network",
                              variant: "destructive"
                            });
                          }
                        }}
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-sm">View on Explorer</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={openAccountModal} className="flex items-center gap-2 text-red-600">
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm">Disconnect</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              );
            })()}
          </div>
        );
      }}
    </RainbowConnectButton.Custom>
  )
}