---
sidebar_position: 0
---

# Introduction

## Pooler - AaveV3 Data Market

Powerloom's AaveV3 dashboard is an [extension](/docs/build-with-powerloom/use-cases/building-new-usecase/extending-uniswapv2-dashboard) of the Pooler framework and follows a similar design to that of the [UniswapV2](/docs/build-with-powerloom/use-cases/existing-implementations/uniswapv2-dashboard/) dasboard use case. [Snapshotters](/docs/build-with-powerloom/snapshotter-node/introduction) participating in this data network capture key data points from Aave's on-chain Smart Contracts, which are then processed, aggregated, and displayed on the dashboard in order to provide actionable metrics to users of the Aave protocol. This implementation offers an example of the composable nature of Pooler, and the flexibility of the Powerloom data network to capture a diverse range of data points.

Dashboard is hosted at [aave-v3.powerloom.io/](https://aave-v3.powerloom.io/)

### Data Points and Aggregated Metrics

Data points serve as the foundational units that base snapshots are built upon. This use case captures fundamental loan metrics for each asset offered by the Aave protocol, including (but not limited to) total amounts supplied and borrowed by users, interest rates for lending and borrowing, and asset prices at the time of lending. These base data points are snapshotted and then aggregated by AaveV3-Pooler to provide broader loan market statistics, such as 24 hour lending/borrowing volumes and historical apr rates. Due to their inherent complexity, participants may find lending markets challenging to navigate. Access to actionable metrics is important for users seeking to deploy their capital efficiently and at the appropriate risk levels.

---

### Development and Extension

Snapshotter Node's design enables extensions and custom use case implementations. A developer can extend the pooler compute files found in [snapshotter-computes](https://github.com/PowerLoom/snapshotter-computes/tree/eth_uniswapv2) and config files found in [snapshotter-configs](https://github.com/PowerLoom/snapshotter-configs/tree/eth_uniswapv2) to build their own custom use case implementations.

We have a dedicated section in the documentation which walkthrough the details on further implementation and usecases extensions.
Check out our guide on [Extending Pooler](/docs/build-with-powerloom/use-cases/building-new-usecase/extending-uniswapv2-dashboard) -->
