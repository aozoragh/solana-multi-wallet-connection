// components/WalletConnectionProvider.tsx
"use client";

import React, { useMemo } from "react";
import { Cluster, clusterApiUrl } from "@solana/web3.js";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

// Wallet adapters (official package exports many adapters)
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TrustWalletAdapter,
  CloverWalletAdapter,
  // TorusWalletAdapter,
  // LedgerWalletAdapter,
} from "@solana/wallet-adapter-wallets";

// styles for the wallet adapter UI
import "@solana/wallet-adapter-react-ui/styles.css";

/**
 * WalletConnectionProvider
 * - Wrap your app with this provider to enable wallet connections.
 * - We create many adapters here; add/remove adapters as needed.
 */
export const WalletConnectionProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  // Use the RPC URL from env (fallback to devnet)
  const rpcUrl =
    process.env.NEXT_PUBLIC_SOLANA_RPC_URL ??
    clusterApiUrl("devnet" as Cluster);

  // instantiate the wallets you want to support.
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network: WalletAdapterNetwork.Devnet }),
      new TrustWalletAdapter(),
      new CloverWalletAdapter(),
      // new TorusWalletAdapter(), // OAuth-like wallet
      // Ledger sometimes needs additional browser permissions and may increase bundle size
      // new LedgerWalletAdapter(),
      // Add more adapters here if available in your version of @solana/wallet-adapter-wallets
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={rpcUrl}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default WalletConnectionProvider;
