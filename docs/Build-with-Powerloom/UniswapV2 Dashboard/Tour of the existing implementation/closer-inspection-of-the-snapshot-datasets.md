---
sidebar_position: 1
---

# Closer inspection of the snapshot dataset

We explored the data that is being tracked by the snapshotter. Let's dive more deeper inspecting the snapshot dataset in Pooler involves understanding how data is captured, processed, and stored. 

### Process of Capturing Data Points

Each Process mentioned below has a detailed documentation as each one of the bits are a part of the core Protocol. You can refer to each corresponding documentation for more information. 

1. **Epoch Generation:** Pooler uses epochs to define ranges of block heights on the Ethereum mainnet for data collection. Each epoch represents a collection of blocks, facilitating the organized capture of trade data.

2. **Preloading:** Pooler preloads essential data like block details and transaction receipts. This step is crucial for the efficient building of base snapshots. Preloaders fetch this data and store it in Redis for subsequent processing.

3. **Base Snapshot Generation:** In this phase, base snapshots are computed. These are collections of state observations and event logs within a given epoch. The snapshot generation process is determined by project configurations, which include specific smart contract addresses and processing modules.

4. **Snapshot Finalization:** After the base snapshot generation, the data reach a consensus on the protocol state contract, triggering the `SnapshotFinalized` event. This step ensures the integrity and consistency of the data across all projects.

5. **Aggregation:** Pooler then generates higher-order data points by aggregating over base snapshots. This process involves combining data from various snapshots to create comprehensive metrics like total trade volume over a specified time.


### Project Configuration

:::tip[Remember]

Before jumping into this section, please do check out the above documentation. 

:::

Each Pair Contract that is tracked has a specific project ID that it corresponds to.
Let's take an example of 24Hours Trade volume Snapshot (This is for an individual pair contract). Here's how the implementation for this configuration works:

config/projects.json: Each entry in this configuration file defines the most fundamental unit of data representation in Powerloom Protocol, that is, a project. It is of the following schema

```json
{
    "project_type": "snapshot_project_name_prefix_",
    "projects": ["array of smart contract addresses"], // Uniswap v2 pair contract addresses in this implementation
    "preload_tasks":[
      "eth_price",
      "block_details"
    ],
    "processor":{
        "module": "snapshotter.modules.uniswapv2.pair_total_reserves",
        "class_name": "PairTotalReservesProcessor" // class to be found in module snapshotter/modules/pooler/uniswapv2/pair_total_reserves.py
    }
}

```