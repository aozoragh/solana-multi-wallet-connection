# 🚀 Solana Multi-Wallet Connect Demo

A **Next.js + TypeScript** proof-of-concept demonstrating how to connect to **multiple Solana wallets** using the official open-source **Solana Wallet Adapter** libraries.

This project was built as a **POC for a Solana airdrop platform**, showing how users can easily connect with their preferred Solana wallet (e.g. Phantom, Solflare, Backpack, Glow, etc.) and perform simple on-chain actions like requesting a Devnet airdrop.

---

## 🧠 Overview

This demo shows:
- ✅ Multi-wallet connection using `@solana/wallet-adapter`
- ✅ Real-time wallet connect/disconnect UI
- ✅ Display of the connected wallet’s public address
- ✅ Simple **Request Airdrop (Devnet)** button
- ✅ Clean responsive design using TailwindCSS
- ✅ Fully client-side with `Next.js App Router`

---

## 🏗️ Tech Stack

| Tool | Purpose |
|------|----------|
| **Next.js (TypeScript)** | Frontend framework |
| **TailwindCSS** | Styling |
| **@solana/web3.js** | Core Solana RPC client |
| **@solana/wallet-adapter** | Wallet connection framework |
| **Devnet** | Test blockchain network |

---

## ⚙️ Features

- 🔹 Supports **multiple Solana wallets** out of the box:
  - Phantom  
  - Solflare  
  - Trust  
  - OKX 
  - Clover  
  - (and more if added later)

- 🔹 Automatically lists wallets in a modal
- 🔹 Auto-connects if user was previously connected
- 🔹 Works directly on **Solana Devnet** for safe testing
- 🔹 Clean UI — ideal for a client demonstration or internal prototype

---

## 📁 Project Structure

solana-multiwallet-demo/
├── app/
│ ├── layout.tsx # Root layout (wraps WalletConnectionProvider)
│ └── page.tsx # Main demo page
├── components/
│ └── WalletConnectionProvider.tsx # Sets up wallet adapters & context
├── styles/
│ └── globals.css # Tailwind base styles
├── .env.local # RPC endpoint configuration
├── tailwind.config.js
├── package.json
└── README.md


---

## ⚙️ Environment Variables

Create a file named `.env.local` in the project root:

```bash
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
