---
sidebar_position: 0
---

# Introduction
This section provides a comprehensive walkthrough on what Snapshotters are, how to set up and run a Snapshotter node in the Powerloom Protocol. Snapshotters play a crucial role in capturing and aggregating data relevant to smart contracts across different blockchain networks.

## Overview

In the Powerloom Protocol ecosystem, a snapshotter peer plays a crucial role in maintaining data consistency and reliability. Powerloom operates on a decentralized network comprising nodes known as **"snapshotters."** These nodes are responsible for reading data from various blockchains, and anyone is eligible to run a snapshotter node.

The primary function of snapshotters is to monitor state changes in selected smart contracts. This monitoring is guided by predefined "data market" schemas, which outline the specific data fields and events that the snapshotters need to track.

Whenever there's a change of events on the smart contract, snapshotters create "snapshots." These are structured data units that capture the most recent state. These snapshots are then promptly sent to the Powerloom consensus protocol for validation.

Powerloom is supported by numerous snapshotters instead of relying on centralized oracles. This approach helps in mitigating issues like single points of failure, outdated data, or dependence on particular data providers. The decentralized, peer-to-peer structure of Powerloom ensures consistent availability and reliability of data.

## Key Features and Operations

- **Synchronization Over Smart Contracts:** Utilizes smart contracts on the Powerloom Protocol testnet for synchronized data management.
- **State-Driven Architecture:** Employs state transitions for ease of understanding and modifications.

:::tip
**What is State transition?** - A state transition in a smart contract is essentially a change in its status or information. It's like updating a record. When certain conditions in the contract are met, the contract's state changes to reflect this. For example, if a smart contract is used for a payment, when the payment is made, the state transitions from "pending" to "completed."
:::

## Decentralized Data Management

- **Epoch-Based Data Synchronization:** Data points are synchronized across the network based on epoch IDs. These epochs represent distinct block collections on the source blockchain, aiding in stateful and reliable data access.
- **Use Cases:** Facilitates diverse applications like:
  - Interactive dashboards featuring aggregated data points.
  - Advanced trading strategies and bots.
  - Historical data analysis through past epoch and index loading.

## Leveraging Decentralized Storage

- **IPFS/Filecoin Integration:** All datasets are decentralized, stored securely on IPFS/Filecoin.
- **Principle of Composability:** Enhances the system's adaptability and efficiency by fully leveraging the decentralized storage networks.

:::tip
**The Principle of Composability** is like using building blocks to create something larger. In technology, especially in areas like blockchain, it means different parts or programs can easily connect and work together, even if they weren't originally designed to do so. This allows for creating more complex systems by combining simple, reusable components.
:::

This approach ensures that the Powerloom Protocol's snapshotter peers are not only effective in data handling but also robust and flexible for various blockchain applications.


## Setting up the snapshotter node 

The snapshotter is a distributed system with multiple moving parts. The easiest way to get started is by using the Docker-based setup from the  [deploy](https://github.com/PowerLoom/deploy)  repository.

If you're planning to participate as a snapshotter, refer to [Deploy Section](/docs/Snapshotters/Running-a-snapshotter-node.md) to start snapshotting.

If you're a developer, you can follow the  [manual configuration steps for pooler](https://github.com/PowerLoom/pooler/blob/main/README.md#configuration)  from this document followed by the  [instructions on the  `deploy`  repo for code contributors](https://github.com/PowerLoom/deploy#instructions-for-code-contributors)  for a more hands-on approach.

:::note

RPC usage is highly use-case specific. If your use case is complicated and needs to make a lot of RPC calls, it is recommended to run your own RPC node instead of using third-party RPC services as it can be expensive.

:::