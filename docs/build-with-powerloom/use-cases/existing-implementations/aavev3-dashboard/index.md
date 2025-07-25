---
sidebar_position: 0
---

# Introduction

## Pooler - AaveV3 Data Market

Powerloom's AaveV3 dashboard is an [extension](/build-with-powerloom/use-cases/building-new-usecase/extending-uniswapv2-dashboard) of the Pooler framework. Its design is similar to the [Uniswap](/build-with-powerloom/use-cases/existing-implementations/uniswap-dashboard/) dashboard use case. The data network is powered by [Snapshotters](/build-with-powerloom/snapshotter-node/introduction) who capture critical data points from Aave's on-chain Smart Contracts.  This data is then processed, aggregated, and displayed on the dashboard to provide users of the Aave protocol with actionable metrics. This implementation is a testament to the composable nature of Pooler and the Powerloom data network's flexibility in capturing a diverse range of data points.

The Dashboard is hosted at [aave-v3.powerloom.io/](https://aave-v3.powerloom.io/)

### Data Points and Aggregated Metrics

Data points are essential elements that serve as the foundational units upon which base snapshots are built. In the Aave protocol, they capture key information about loans, such as the total supplied and borrowed amounts, interest rates, and asset prices at the time of the lending. These base data points are snapshotted and then aggregated by AaveV3-Pooler to provide broader loan market statistics & insights, such as 24-hour lending/borrowing volumes and historical APR rates. Due to their inherent complexity, participants may find lending markets challenging to navigate. Access to actionable metrics is important for users seeking to deploy their capital efficiently and at the appropriate risk levels.

---

### Development and Extension

The Pooler framework builds upon the modular architecture of a Snapshotter Node and enables extensions and custom use case implementations. A developer can extend the pooler compute files found in [snapshotter-computes](https://github.com/powerloom/snapshotter-computes/tree/aave) and config files found in [snapshotter-configs](https://github.com/powerloom/snapshotter-configs/tree/aave) to build their own custom use case implementations.

The documentation has a dedicated section that discusses further implementation and use-case extensions.
Check out our guide on [Setup and Extension](/build-with-powerloom/use-cases/existing-implementations/aavev3-dashboard/setup-and-extension.md).
