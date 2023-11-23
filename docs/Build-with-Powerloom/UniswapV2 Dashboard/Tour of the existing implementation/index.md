---
sidebar_position: 0
---

# Datapoints

### Data Points in Pooler

In Pooler, data points are specific, quantifiable elements derived from Uniswap V2 trading activities. These include:

- **Pair Reserves:** Liquidity reserves of each token in Uniswap V2 pair contracts.
- **Token Prices:** Current prices of tokens involved in trading pairs.
- **Trading Volume:** Volume of trades for different intervals (24 hours, 7 days).
- **Fees:** Fees accrued from trades over specified periods (24 hours, 7 days).
- **Top Tokens and Pairs:** Ranking based on trade volume and other metrics.
- **Daily Stats:** Summarized daily trading data such as volume, fees, and liquidity.

### Process of Capturing Data Points

1. **Epoch Generation:** Pooler uses epochs to define ranges of block heights on the Ethereum mainnet for data collection. Each epoch represents a collection of blocks, facilitating the organized capture of trade data.

2. **Preloading:** Pooler preloads essential data like block details and transaction receipts. This step is crucial for the efficient building of base snapshots. Preloaders fetch this data and store it in Redis for subsequent processing.

3. **Base Snapshot Generation:** In this phase, base snapshots are computed. These are collections of state observations and event logs within a given epoch. The snapshot generation process is determined by project configurations, which include specific smart contract addresses and processing modules.

4. **Snapshot Finalization:** After the base snapshot generation, the data reach a consensus on the protocol state contract, triggering the `SnapshotFinalized` event. This step ensures the integrity and consistency of the data across all projects.

5. **Aggregation:** Pooler then generates higher-order data points by aggregating over base snapshots. This process involves combining data from various snapshots to create comprehensive metrics like total trade volume over a specified time.

### Code Implementation

The implementation of these processes is detailed in the Pooler GitHub repository. Key components include:

- **Preloaders:** Defined in `snapshotter/utils/preloaders/`, these are responsible for the initial data fetching.
- **Snapshot Workers:** Located in `pooler/utils/snapshot_worker.py`, these workers build the base snapshots.
- **Aggregation Workers:** Found in `pooler/utils/aggregation_worker.py`, they are tasked with creating aggregated data points from base snapshots.
- **RPC Helper:** (`pooler/utils/rpc.py`) assists in extracting data from the blockchain for snapshot generation.
- **Core API:** Defined in `pooler/core_api.py`, it allows access to finalized data on the smart contract.

The specific configurations for data points like pair reserves, token prices, trading volumes, and fees are outlined in `config/projects.json` and `config/aggregator.json`. These configurations dictate what data to capture and how to process it.

By reviewing these components in the [Pooler GitHub repository](https://github.com/PowerLoom/pooler), one can gain an in-depth understanding of how Pooler captures, processes, and presents Uniswap V2 trading data.