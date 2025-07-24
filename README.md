# Sessions

The onchain video content streaming platform built on Base blockchain.

## Overview

Sessions is a decentralized video content platform that connects creators and fans through blockchain technology. The platform allows creators to upload and monetize video content while enabling fans to discover, mint, and support their favorite creators directly.

## Features

### For Creators

- **Content Upload**: Upload videos with customizable pricing and mint limits
- **Creator Profile**: Showcase your content with a personalized profile
- **Analytics**: Track followers, tips received, and mints sold
- **Revenue Streams**: Earn through direct tips and video minting

### For Fans

- **Content Discovery**: Browse and search for videos from various creators
- **Support Creators**: Tip creators directly with ETH
- **Mint Videos**: Collect exclusive content by minting videos as NFTs
- **Social Features**: Follow favorite creators and interact through comments

### Wallet Features

- **Built-in Wallet**: Manage your crypto assets within the platform
- **Send & Receive**: Transfer ETH to other users
- **Swap**: Exchange ETH and USDC through Uniswap integration
- **Transaction History**: View your on-chain transaction history

## Tech Stack

- **Frontend**: React.js with TailwindCSS for styling
- **State Management**: React Context API and TanStack Query
- **Blockchain Integration**: Web3.js for Ethereum interaction
- **Smart Contracts**: Custom Sessions contract on Base blockchain
- **Media Handling**: Video streaming and thumbnail generation

## Smart Contract Addresses

- **Mainnet**: `0x9C0B6D15b26E13f6990FB5659545F9D983214E5C`
- **Testnet**: `0x78bB839dca36d743876336A60BE5fEbcFF8cC6A6`

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- MetaMask or another Ethereum wallet (optional for development)

### Installation

1. Clone the repository

````bash
git clone https://github.com/oxbryte/basessions-app.git
cd basessions-app
```npm install
# or
yarn install

VITE_BASE_URL=your_backend_api_url

npm run dev
# or
yarn dev

src/
├── App.jsx                # Main application component
├── components/
│   ├── context/           # React context providers
│   ├── features/          # Feature components
│   ├── hooks/             # Custom React hooks
│   ├── layouts/           # Layout components
│   ├── libs/              # Utility functions
│   ├── services/          # API services
│   └── ui/                # Reusable UI components
├── contract/              # Blockchain contract ABIs
└── pages/                 # Application pages
````
