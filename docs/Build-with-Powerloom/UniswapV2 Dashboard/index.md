---
sidebar_position: 0
---

# Introduction

## Pooler - UniswapV2 Data Market



### Introduction to Pooler: Technical Documentation

**What is Pooler?**

Pooler is a Uniswap-specific implementation within the PowerLoom Protocol ecosystem, designed as a snapshotter. It functions by synchronizing with other snapshotter peers over a smart contract on the PowerLoom Protocol testnet. This architecture, guided by state transitions, is both easily comprehensible and modifiable.

:::tip
**Pooler in a Nutshell:**

Forex, the foreign exchange market, involves currency trading and is known for its high liquidity and 24/7 operation. Pooler, in a parallel sense, operates continuously, capturing snapshots of Uniswap trades. Like Forex traders who analyze currency fluctuations to make profits, Pooler users can analyze trade volumes, liquidity reserves, and other metrics to understand market trends and potential profits in the Uniswap market.

In essence, Pooler is to Uniswap what Forex platforms are to currency trading – a tool for real-time tracking and analysis, facilitating better understanding and potentially profitable decision-making in the dynamic world of cryptocurrency trading.
:::


**Core Features:**

- **Data Point Synchronization:** Pooler calculates, updates, and synchronizes each data point with other snapshotter peers. This synchronization is based on epoch IDs, representing a collection of blocks on data source blockchains like Ethereum Mainnet, Polygon Mainnet, etc.
  
- **Decentralized Nature:** The decentralized approach of Pooler means datasets are stored on IPFS/Filecoin, leveraging decentralized storage networks to their fullest.

- **Versatile Use Cases:** Pooler supports various applications, from dashboards offering aggregate data points to trading strategies and bots. It also allows loading of historical data from past epochs, indexes, and aggregates.

**Getting Started with Pooler:**

Setting up Pooler involves a distributed system with several components. The simplest way to get started is through Docker-based setup from the [deploy repository](https://github.com/PowerLoom/deploy). For developers, a more hands-on approach involves manual configuration steps outlined in the Pooler documentation, followed by instructions from the deploy repository.

**Key Components of Pooler:**

1. **Epoch Generation:** Manages block height ranges on the data source blockchain.
2. **Preloading:** Crucial for fetching low-level data like block details and transaction receipts.
3. **Base Snapshot Generation:** Involves creating basic data models from state observations and event logs.
4. **Snapshot Finalization and Aggregation:** Ensures data consistency and builds higher-order data points.
5. **Major Components:** Includes System Event Detector, Process Hub Core, Processor Distributor, Delegation Workers, Callback Workers, RPC Helper, and Core API.

**API and Dashboard:**

The Core API is a crucial element, allowing access to finalized protocol states on the anchor chain’s smart contract. Pooler’s functionality can be observed in action through the Uniswap v2 dashboards, like [uniswapv2.powerloom.io](https://uniswapv2.powerloom.io/), powered by the Pooler foundation's API.

**Development and Extension:**

Pooler’s design enables extensions and custom use case implementations. It offers a detailed guide for extending its capabilities, particularly with Uniswap v2 data points. Developers can add new configurations and data models as needed, ensuring Pooler’s adaptability to various requirements.
