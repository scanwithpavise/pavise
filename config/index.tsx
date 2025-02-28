import { createAppKit } from "@reown/appkit/react";
import { arbitrum, mainnet } from "@reown/appkit/networks";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

export const projectId = "ffd4b894ab7a622ff31554d0bc77e529"
if (!projectId){
    throw new Error('Project Id is not defined.')
}
export const networks = [mainnet, arbitrum];
export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
});

export const config = wagmiAdapter.wagmiConfig
