---
sidebar_position: 0
---

# Introduction
This section provides a comprehensive guide on how to set up and run a Snapshotter node in the Powerloom Protocol. Snapshotters play a crucial role in capturing and aggregating data relevant to smart contracts across different blockchain networks.

## Overview: 

A snapshotter peer as part of Powerloom Protocol does exactly what the name suggests: It synchronizes with other snapshotter peers over a smart contract running on the present version of the PowerLoom Protocol testnet. It follows an architecture that is driven by state transitions which makes it easy to understand and modify.

Because of its decentralized nature, the snapshotter specification and its implementations share some powerful features that can adapt to your specific information requirements on blockchain applications:

- Each data point is calculated, updated, and synchronized with other snapshotter peers participating in the network
- Synchronization of data points is defined as a function of an epoch ID(identifier) where epoch refers to an equally spaced collection of blocks on the data source blockchain. This simplifies the building of use cases that are stateful (i.e. can be accessed according to their state at a given height of the data source chain), synchronized, and depend on reliable data. For example,
    -  Dashboards by offering higher-order aggregate datapoints
    -  Trading strategies and bots
- A snapshotter peer can load past epochs, indexes, and aggregates from a decentralized state and have access to a rich history of data
    -  All the datasets are decentralized on IPFS/Filecoin
    -  The power of these decentralized storage networks can be leveraged fully by applying the  [principle of composability](https://github.com/PowerLoom/pooler/blob/main/README.md#aggregation-and-data-composition---snapshot-generation-of-higher-order-datapoints-on-base-snapshots)


## Setup: 

The snapshotter is a distributed system with multiple moving parts. The easiest way to get started is by using the Docker-based setup from the  [deploy](https://github.com/PowerLoom/deploy)  repository.

If you're planning to participate as a snapshotter, refer to [Deploy Section](/docs/Snapshotters/Running-a-snapshotter-node.md) to start snapshotting.

If you're a developer, you can follow the  [manual configuration steps for pooler](https://github.com/PowerLoom/pooler/blob/main/README.md#configuration)  from this document followed by the  [instructions on the  `deploy`  repo for code contributors](https://github.com/PowerLoom/deploy#instructions-for-code-contributors)  for a more hands-on approach.


:::note

RPC usage is highly use-case specific. If your use case is complicated and needs to make a lot of RPC calls, it is recommended to run your own RPC node instead of using third-party RPC services as it can be expensive.

:::