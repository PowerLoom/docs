---
sidebar_position: 0
---

# Introduction

![Snapshotter workflow](/images/snapshotter_workflow.png)

A snapshotter peer as part of Powerloom Protocol does exactly what the name suggests:  It synchronizes with other snapshotter peers over a smart contract running on Powerloom Prost chain. It follows an architecture that is driven by state transitions which makes it easy to understand and modify.

Because of its decentralized nature, the snapshotter specification and its implementations share some powerful features that can adapt to your specific information requirements on blockchain applications:

* Each data point is calculated, updated, and synchronized with other snapshotter peers participating in the network
* synchronization of data points is defined as a function of an epoch ID(identifier) where epoch refers to an equally spaced collection of blocks on the data source blockchain (for eg, Ethereum Mainnet/Polygon Mainnet/Polygon Testnet -- Mumbai). This simplifies the building of use cases that are stateful (i.e. can be accessed according to their state at a given height of the data source chain), synchronized, and depend on reliable data. For example,
    * dashboards by offering higher-order aggregate datapoints
    * trading strategies and bots
* a snapshotter peer can load past epochs, indexes, and aggregates from a decentralized state and have access to a rich history of data
    * all the datasets are decentralized on IPFS/Filecoin
    * the power of these decentralized storage networks can be leveraged fully by applying the [principle of composability](/docs/protocol/data-composition)


Powerloom relies on snapshotter peers to generate consensus backed data instead of relying on centralized oracles. This approach helps in mitigating issues like single points of failure, outdated data, or dependence on particular data providers. The decentralized, peer-to-peer structure of Powerloom ensures consistent availability and reliability of consensus backed data.

![Powerloom Workflow](/images/introduction-image.png)


## Specifications and moving parts

Snapshotter is a crucial part of our powerloom protocol. Dive deep into the technical aspects of snapshotter [here](/docs/category/snapshotter)

## Joining a data market

Continue along within this category to explore the different testnet based data markets that you can join as a snapshotter.

* [Joining a network](/docs/category/joining-networks)


:::note

RPC usage is highly use-case specific. If your use case is complicated and needs to make a lot of RPC calls, it is recommended to run your own RPC node instead of using third-party RPC services as it can be expensive.

:::

