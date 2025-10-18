// app/page.tsx
"use client";

import React, { useCallback, useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

/**
 * Simple centered card showing:
 * - Title
 * - Network badge
 * - WalletMultiButton (connect)
 * - Connected address + Disconnect
 * - Request Airdrop (devnet) button
 */

export default function Page() {
  const { connection } = useConnection();
  const { publicKey, disconnect } = useWallet();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const requestAirdrop = useCallback(async () => {
    if (!publicKey) {
      setMsg("Connect wallet first");
      return;
    }
    try {
      setLoading(true);
      setMsg("Requesting airdrop...");
      // request 1 SOL on devnet
      const sig = await connection.requestAirdrop(
        publicKey as PublicKey,
        LAMPORTS_PER_SOL
      );
      await connection.confirmTransaction(sig, "confirmed");
      setMsg(`Airdrop successful — tx: ${sig}`);
    } catch (err: any) {
      setMsg(`Airdrop failed: ${err?.message ?? String(err)}`);
    } finally {
      setLoading(false);
    }
  }, [connection, publicKey]);

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow p-8">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold">
            Solana Multi-Wallet Connect Demo
          </h1>
          {/* <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
            devnet
          </span> */}
        </header>

        <section className="flex flex-col gap-4">
          {/* Connect button — auto lists all wallets from provider */}
          <div className="flex items-center gap-4">
            <WalletMultiButton />
          </div>

          {/* Connected state */}
          <div>
            {publicKey ? (
              <div className="space-y-2">
                <div>
                  <strong>Connected:</strong>{" "}
                  <span className="font-mono">{publicKey.toBase58()}</span>
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => void requestAirdrop()}
                    className="px-3 py-1 bg-green-600 text-white rounded disabled:opacity-60"
                    disabled={loading}
                  >
                    {loading ? "Requesting..." : "Request Airdrop (1 SOL)"}
                  </button>
                  <button
                    onClick={() => void disconnect()}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-600">No wallet connected</div>
            )}
          </div>

          {msg && <div className="text-sm text-gray-700 mt-2">{msg}</div>}
        </section>

        {/* <footer className="mt-6 text-xs text-gray-500">
          POC — Multi-wallet connect via @solana/wallet-adapter. No airdrop on
          mainnet.
        </footer> */}
      </div>
    </main>
  );
}
