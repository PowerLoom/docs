---
sidebar_position: 0
---

# Overview
This section provides a comprehensive walkthrough on what Snapshotters are, how to set up and run a Snapshotter node in the Powerloom Protocol. Snapshotters play a crucial role in capturing and aggregating data relevant to smart contracts across different blockchain networks.

In the Powerloom Protocol ecosystem, a snapshotter peer plays a crucial role in maintaining data consistency and reliability. Powerloom operates on a decentralized network comprising nodes known as **"snapshotters."** These nodes are responsible for reading data from various blockchains, and anyone is eligible to run a snapshotter node.

![Snapshotter workflow](/images/snapshotter_workflow.png)


## Function

The primary function of snapshotters is to monitor state changes in selected smart contracts. This monitoring is guided by predefined "data market" schemas, which outline the specific data fields and events that the snapshotters need to track.

Whenever there's a change of events on the smart contract, snapshotters create "snapshots." These are structured data units that capture the most recent state. These snapshots are then promptly sent to the Powerloom consensus protocol for validation.

Powerloom is powered by numerous snapshotters instead of relying on centralized oracles. This approach helps in mitigating issues like single points of failure, outdated data, or dependence on particular data providers. The decentralized, peer-to-peer structure of Powerloom ensures consistent availability and reliability of data.

![Powerloom Workflow](/images/introduction-image.png)


## Specifications and moving parts

Snapshotter is a crucial part of our powerloom protocol. Dive deep into the technical aspects of snapshotter [here](/docs/category/snapshotter)

## Joining a data market

Continue along within this category to explore the different testnet based data markets that you can join as a snapshotter.

* [Joining a network](/docs/category/joining-networks)

## Setting up the snapshotter node 

The snapshotter is a distributed system with multiple moving parts.

If you're planning to participate as a snapshotter, refer to our specific subsections within [joining networks](/docs/Snapshotters/Joining%20Networks/) to start snapshotting.


:::note

RPC usage is highly use-case specific. If your use case is complicated and needs to make a lot of RPC calls, it is recommended to run your own RPC node instead of using third-party RPC services as it can be expensive.

:::

