---
sidebar_position: 3
title: Data Markets and Sources
---

# Data Markets

Snapshotters generate snapshots, both base and higher order, as per the data sources _defined by the data markets they participate in_. Each data market maintains its [specific protocol state](/docs/protocol/specifications/protocol-state) concerning the submission, calculation, and finalization of such snapshots.

The data sources defined by a market can be static or dynamic, depending on the use case at hand.

## Static Data Sources

Our implementation of a data market serves datasets to render live Uniswap V2 and Aave V3 dashboards. Further details about the data source configurations and snapshot schemas can be found in the following sections of our documentation:

* [Building with Powerloom -- Uniswap V2 Dashboard](/docs/build-with-powerloom/use-cases/existing-implementations/uniswapv2-dashboard/)
* [Building with Powerloom -- Aave V3 Dashboard](/docs/build-with-powerloom/use-cases/existing-implementations/aavev3-dashboard/)

Continuing with the Uniswap V2 example, you can explore the data sources list defined as part of the Uniswap v2 specific configuration in the [`snapshotter-configs`](https://github.com/Powerloom/snapshotter-configs/blob/fcf9b852bac9694258d7afcd8beeaa4cf961c65f/projects.example.json#L1-L11) repository.

```json reference
https://github.com/Powerloom/snapshotter-configs/blob/fcf9b852bac9694258d7afcd8beeaa4cf961c65f/projects.example.json#L1-L11
```

The `projects` field in the above configuration snippet represents the Uniswap v2 pair contract addresses that are tracked, and snapshots are generated for these contracts. To further understand how snapshots on these contracts are tracked, refer to the section on [Project Types and IDs](#project-types-and-ids).

## Dynamic Data Sources

In situations where data sources are constantly changing or numerous, making it impractical to maintain an extensive list, the data sources need not be explicitly defined in the configuration.

Instead, the snapshotter implementation operates in ['bulk mode'](/docs/protocol/specifications/snapshotter/snapshot-build#bulk-mode). The data source configuration specifies computation modules that utilize general-purpose [preloaded](/docs/protocol/specifications/snapshotter/preloading) datasets to filter transactions, event logs, etc., on contract addresses of interest. This is where the signaling of data sources comes into play.

```json reference
https://github.com/Powerloom/snapshotter-configs/blob/39e4713cdd96fff99d100f1dea7fb7332df9e491/projects.example.json#L1-L28
```

### Data Source Signaling

Data sources can be dynamically added to the contract based on the role of certain peers in the ecosystem known as 'signalers.' This is a pivotal aspect of the Powerloom Protocol ecosystem, separate from snapshotting, and is on track to be decentralized. The decentralization will take into account on-chain activity, market forces, and accommodate a demand-driven, dynamic data ecosystem.

In the current implementation of a use case that tracks wallet activity for Quests on Polygon zkEVM, such wallets are added from a data feed supplied by Merkle. The feed consists of wallets that sign up on their platform. Only these wallet addresses are of interest to the Quest platform on Merkle for tracking activities across DEXs and asset bridges.

Read more about it in the [snapshotter specs of the bulk node](/docs/protocol/specifications/snapshotter/snapshot-build#bulk-mode).

![Merkle Data Source Signaling](/images/data_source_signaling_example.png)

## Project Types and IDs

All data sources are tracked with a project ID on the protocol. Think of it as a stream of datasets, finalized by consensus against [each epoch released](/docs/protocol/specifications/epoch#1-epoch_released) on the protocol.

Find more details in the [specifications of snapshot generation](/docs/protocol/specifications/snapshotter/snapshot-build).

## Useful Links and Concepts

* [Modular Architecture of Use Case-Specific Snapshotter Implementations](/docs/build-with-powerloom/snapshotter-node/architecture)
