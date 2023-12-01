---
sidebar_position: 3
title: Data markets and sources
---

# Data markets

Snapshotters generate snapshots, base as well as higher order, composable snapshots according to the data sources _defined by the data markets they participate in_. Every data market maintains its [specific protocol state](/docs/protocol/specifications/protocol-state) regarding submission, calculation and finalization of such snapshots.

The data sources defined by a market can be static as well as dynamic, depending on the use case at hand.

## Static data sources

This is utilized by our own implementation of a data market that serves datasets to render a live Uniswap V2 dashboard. You can find further details of the data source configuration and snapshot schema in the following section within our documentation

* [Building with Powerloom -- Uniswap V2 Dashboard](/docs/build-with-powerloom/use-cases/existing-implementations/uniswapv2-dashboard/)

We will continue with this example and take a look at the data sources list defined as part of the Uniswap v2 specific configuration to be found in the [`snapshotter-configs`](https://github.com/PowerLoom/snapshotter-configs/blob/fcf9b852bac9694258d7afcd8beeaa4cf961c65f/projects.example.json#L1-L11) repo.

```json reference
https://github.com/PowerLoom/snapshotter-configs/blob/fcf9b852bac9694258d7afcd8beeaa4cf961c65f/projects.example.json#L1-L11
```

The `projects` field in the above configuration snippet are nothing but the Uniswap v2 pair contract addresses that are tracked and on which snapshots are generated. Jump to the section on [project types and IDs](#project-types-and-ids) to further understand the way the snapshots on these contracts are tracked.

## Dynamic data sources

For situations where data sources are constantly changing or numerous, making it impractical to maintain an extensive list of them, the data sources need not be defined explicitly in the configuration.

Instead it is left to the snapshotter implementation to operate in ['bulk mode'](/docs/protocol/specifications/snapshotter/snapshot-build#bulk-mode). The data source configuration merely specifies the computation modules which will utilize general purpose, [preloaded](/docs/protocol/specifications/snapshotter/preloading) datasets to filter out transactions, event logs etc on contract addresses of interest. This is where signaling of data sources comes into picture.

```json reference
https://github.com/PowerLoom/snapshotter-configs/blob/39e4713cdd96fff99d100f1dea7fb7332df9e491/projects.example.json#L1-L28
```

### Data source signaling

Data sources can be dynamically added to the contract according to the role of certain peers in the ecosystem known as 'signalers'. This is the most significant aspect of the Powerloom Protocol ecosystem apart from snapshotting and will soon be decentralized to factor in on-chain activity, and market forces and accommodate a demand-driven, dynamic data ecosystem.

In the present implementation of the use case that tracks wallet activity for Quests on Polygon zkEVM, such wallets are added from a data feed supplied by Mercle that consists of wallets that signup on their platform. Only these wallet addresses are of interest to the Quest platform on Mercle for their activities to be tracked across DEXs and asset bridges.

Read more about it in the [snapshotter specs of bulk node](/docs/protocol/specifications/snapshotter/snapshot-build#bulk-mode).

![Mercle data source signaling](/images/data_source_signaling_example.png)


## Project types and IDs

All data sources are tracked with a project ID on the protocol. Think of it as a stream of datasets, finalized by consensus against [each epoch released](/docs/protocol/specifications/epoch#1-epoch_released) on the protocol.

Find more details on this in the [specifications of snapshot generation](/docs/protocol/specifications/snapshotter/snapshot-build).


## Useful links and concepts

* [Modular architecture of Use case specific snapshotter implementations](/docs/protocol/specifications/snapshotter/implementations)