---
sidebar_position: 0
---

## On-Chain Activity Tracking

On-chain activity tracking is vital in understanding and analyzing blockchain interactions. It provides deep insights into transactions, smart contracts, and user behaviors on various blockchains.  

We leverage Snapshotter Peers to monitor on-chain activities of testnet participants across various chains and protocols. These activity predominantly operate in Bulk Mode due to their one-time nature and the highly dynamic set of participants involved. 

In this particular implementation of the peer, known as 'Snapshotter' in the Powerloom Protocol, we have successfully harnessed its capabilities to provide accurate metrics, verified through consensus, pertaining to fundamental data points. These metrics allow us to determine if and when a on-chain activity (quest) is completed by a testnet participant.

## Why On-Chain Activity Tracking Matters

For developers, on-chain activity tracking is a gateway to:
- **Understanding User Interactions**: It helps in identifying patterns and trends in how users interact with different blockchain protocols.
- **Smart Contract Analysis**: Developers can monitor and analyze the performance and usage of smart contracts.
- **Real-Time Data Access**: It provides real-time data, aiding in responsive and dynamic application development.
- **Security and Compliance**: Enables tracking of transactions for security audits and compliance with regulations.

## Building an On-Chain Activity Tracker

### 1. Snapshot Builders

Snapshot builders are the core components that capture blockchain activity. They are typically found in a specific implementation directory: [`snapshotter/modules/computes`](https://github.com/Powerloom/snapshotter-computes/tree/1e145c7f458ce48b8cd2ac860c2ae4a78fad7ea9) in a project's repository. Each snapshot builder must implement a standard interface: [`GenericProcessorSnapshot`](https://github.com/Powerloom/pooler/blob/main/snapshotter/utils/callback_helpers.py).


```python reference
https://github.com/Powerloom/pooler/blob/d8b7be32ad329e8dcf0a7e5c1b27862894bc990a/snapshotter/utils/callback_helpers.py#L179-L197
```
#### Key Components:

- **Transformation Lambdas**: These are functions that add an additional computation layer on the generated snapshot. They should align with the snapshot's structure and the specific data needs of your project.
- **Compute Callback**: This is where the logic for snapshot extraction and generation is written. It processes inputs such as:
  - `epoch`: Details of the current epoch or timeframe.
  - `redis`: Asynchronous Redis connection for data handling.
  - `rpc_helper`: Utility for blockchain data requests.

### 2. Snapshot Generation and Storage

The `compute()` function should return an instance of a Pydantic model, encapsulating the snapshot data. This data is then uploaded to a storage solution like IPFS (InterPlanetary File System) for decentralized and persistent storage.

```python reference
https://github.com/Powerloom/pooler/blob/d8b7be32ad329e8dcf0a7e5c1b27862894bc990a/snapshotter/utils/generic_worker.py#L179-L191
```

### 3. Configuring the Snapshot Builder

A configuration file [`config/projects.json`](https://github.com/Powerloom/snapshotter-configs/blob/544f3f3355f0b25b99bac7fe8288cec1a4aea3f3/projects.example.json) specifies the details of the snapshots to be generated. For instance, a [snapshot builder](https://github.com/Powerloom/snapshotter-computes/blob/29199feab449ad0361b5867efcaae9854992966f/bungee_bridge.py) for `zkevm:bungee_bridge` might look like this:

```json
{
  "project_type": "zkevm:bungee_bridge",
  "preload_tasks": ["block_transactions"],
  "processor": {
    "module": "snapshotter.modules.boost.bungee_bridge",
    "class_name": "BungeeBridgeProcessor"
  }
}
```

The preloader dependencies like [`block_transactions`](https://github.com/Powerloom/pooler/blob/main/snapshotter/utils/preloaders/tx_receipts/preloader.py) are crucial as they define the initial data set that the snapshot builder will process.

### 4. Snapshot Processing

The snapshot builder processes preloaded data (e.g., block transactions) and filters out relevant information. For instance, it might generate snapshots for wallet addresses that interacted with a specific contract during a defined epoch.

## Practical Example: Bungee Bridge Processor

Consider a scenario where you're tracking transactions related to the Bungee Bridge refuel contract. The snapshot builder would analyze the preloaded block transactions and create snapshots for wallet addresses that received funds from the Bungee Bridge contract within a specific timeframe.

## Leveraging On-Chain Activity Trackers in Development

Developers can use on-chain activity trackers to build a wide range of applications, including:

- **Analytical Tools**: For analyzing blockchain data and extracting meaningful insights.
- **Alert Systems**: To monitor and send notifications for specific on-chain events.
- **Compliance Checkers**: Ensuring transactions and smart contracts comply with set regulations.
- **Security Monitors**: Identifying potentially malicious activities or vulnerabilities in smart contracts.

