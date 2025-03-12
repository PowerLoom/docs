---
sidebar_position: 0
---

# Introduction

## Pooler - UniswapV2 and UniswapV3 Data Markets

Pooler is a Uniswap-specific implementation within the Powerloom ecosystem, designed as a snapshotter. It functions by synchronizing with other snapshotter peers over a smart contract on the Powerloom Protocol testnet. This architecture, guided by state transitions, is both easily comprehensible and modifiable. The Powerloom Protocol supports snapshotting for both the V2 and V3 smart contracts for Uniswap.

:::tip
**Pooler in a Nutshell:**

Forex, the foreign exchange market, involves currency trading and is known for its high liquidity and 24/7 operation. Pooler, in a parallel sense, operates continuously, capturing snapshots of Uniswap trades. Like Forex traders who analyze currency fluctuations to make profits, Pooler users can analyze trade volumes, liquidity reserves, and other metrics to understand market trends and potential profits in the Uniswap market.

In essence, Pooler is to Uniswap and other DeFi product what Forex platforms are to currency trading – a tool for real-time tracking and analysis, facilitating better understanding and potentially profitable decision-making in the dynamic world of cryptocurrency trading.
:::


### How it works
Let's explore the details of the Pooler implementation. The image provided illustrates the operational flow of the UniswapV2 Dashboard hosted at [uniswapv2.powerloom.io](https://uniswapv2.powerloom.io).

> Note: The below image depicts the workflow for the UniswapV2 specific implementation, however, the flow described in the rendering and the following outlined steps are the same for the UniswapV3 use case. The UniswapV3 Dashboard is hosted at: [uniswapv3.powerloom.io](https://uniswapv3.powerloom.io/).

![Uniswap Dashboard Rendering](/images/dashboard-rendering.png)


#### Workflow: 
1. The user accesses the Uniswap V2 dashboard through [uniswapv2.powerloom.io](https://uniswapv2.powerloom.io).
2. The dashboard makes calls to a foundation hosted node to get the latest aggregated data.
3. These calls are handled by the Snapshotter Core API interface, running on the foundation hosted node.
4. The foundation nodes then fetch the relevant data from blockchain/Redis cache to optimize the response times.
5. Once the data is retrieved, the frontend is rendered with the data.


### Data Points and Aggregated Metrics in Pooler

Data points are key metrics sourced from Uniswap V2 or V3 pair contracts, detailing how snapshots are built and stored. Pooler generates base trade snapshots as well as higher order aggregates per Epoch, providing an overview of market trends, such as trade frequencies and average prices. These insights aid users in understanding market movements and asset performance, crucial for informed trading decisions while participating in the Uniswap protocol.

---

### Development and Extension

Snapshotter Node's design enables extensions and custom use case implementations. A developer can extend the pooler UniswapV2 compute files found in [snapshotter-computes (V2)](https://github.com/PowerLoom/snapshotter-computes/tree/eth_uniswapv2) and config files found in [snapshotter-configs (V2)](https://github.com/PowerLoom/snapshotter-configs/tree/eth_uniswapv2), or the UniswapV3 compute files found in [snapshotter-computes (V3)](https://github.com/PowerLoom/snapshotter-computes/tree/uniswapv3-v1) and the associated config files in [snapshotter-configs (V3)](https://github.com/PowerLoom/snapshotter-configs/tree/eth_uniswapv3) to build their own custom use case implementations.

We have a dedicated section in the documentation which walkthrough the details on further implementation and usecases extensions.
Check out our guide on [Extending Uniswap V2 dashboard usecase.](/build-with-powerloom/use-cases/building-new-usecase/extending-uniswapv2-dashboard)
