---
sidebar_position: 0
---

# Tracking Quests on ZkEVM

Tracking on-chain activities can be a challenging task for developers. It requires a deep understanding of the underlying blockchain protocol and the ability to process large amounts of data per block.

With the Snapshotter Peers, developers can easily track on-chain activities across various blockchains and protocols. The only thing they need to do is write a Snapshot Processor that extracts and returns the relevant data from the list of transactions in a block which are already accessible to them, thanks to [preloading](/docs/Protocol/Specifications/Snapshotter/preloading).

## Why On-Chain Activity Tracking Matters

Being able to track on-chain activities is crucial for a wide range of applications, including: 
- **Understanding User Interactions**: It helps in identifying patterns and trends in how users interact with different blockchain protocols.
- **Identifying trends**: It helps in identifying trends in how users interact with different blockchain protocols. For example, it can be used to identify the most popular smart contracts or the most active wallet addresses.
- **Signal to Trading Strategies**: It can be used to identify potential trading opportunities based on the activity of specific wallet addresses or smart contracts.
- **Quest Completion Tracking**: It can be used to track the completion of quests or tasks on the blockchain. 

For example, we at Powerloom use Quest completion tracking for our Testnet program participants. We leverage Snapshotter Peers to monitor on-chain activities of testnet participants across various chains and protocols. These quests predominantly operate in [Bulk Mode](/docs/Protocol/Specifications/Snapshotter/snapshot-build#data-source-specification-bulk-mode) due to their one-time nature and the highly dynamic set of participants involved.

## Building an On-Chain Activity Tracker

### Snapshot Building

We let Snapshotter Peers handle the heavy lifting of capturing on-chain activities. Developers can focus on building a Snapshot Processor that extracts and returns the relevant data from the list of transactions in a block.
For example, `BungeeBridgeProcessor` located in [`snapshotter/modules/computes`](https://github.com/PowerLoom/snapshotter-computes/blob/zkevm_quests/bungee_bridge.py) is one of the base Processor computes for ZkEVM Quest Tracking. This class uses the `GenericProcessorSnapshot` structure found in [`snapshotter/utils/callback_helpers.py`](https://github.com/Powerloom/pooler/blob/main/snapshotter/utils/callback_helpers.py).

Any compute for base snapshots basically needs to implement the `compute` function.

```python reference
https://github.com/Powerloom/pooler/blob/d8b7be32ad329e8dcf0a7e5c1b27862894bc990a/snapshotter/utils/callback_helpers.py#L190-L195
```

The `compute` function is the main part where we create and process snapshots. It uses these inputs:

  - `epoch`: Epoch details for which the snapshot is being generated.
  - `redis`: Redis connection object.
  - `rpc_helper`: RPC Helper object.
  
 `epoch` is `PowerloomSnapshotProcessMessage` object which contains the following information:
```python reference
https://github.com/PowerLoom/pooler/blob/main/snapshotter/utils/models/message_models.py#L46-L50
```

The Infrastructure is scalable enough to handle high throughput chains like ZkEvm in close to real time even with `Epoch`  size of 1 block.

The `BungeeBridgeProcessor` then goes through all preloaded block transactions, filters out, and then generates relevant snapshots for wallet addresses that received funds from the Bungee Bridge refuel contract during that epoch.

```python reference
https://github.com/PowerLoom/snapshotter-computes/blob/29199feab449ad0361b5867efcaae9854992966f/bungee_bridge.py#L40-L92
```

The format of the output data can vary based on what you need it for. However, the return type must always be a list of (`wallet_address`, [`pydantic`](https://pypi.org/project/pydantic/) snapshot object) (for bulk mode).

Each `wallet_address` is mapped to a `pydantic` snapshot object and submitted to the protocol state. 

### Configuration

A configuration file [`config/projects.json`](https://github.com/Powerloom/snapshotter-configs/blob/39e4713cdd96fff99d100f1dea7fb7332df9e491/projects.example.json) specifies the details of the snapshots to be generated. For instance, sample config for  [`BungeeBridgeProcessor`](https://github.com/PowerLoom/snapshotter-computes/blob/zkevm_quests/bungee_bridge.py) for `zkevm:bungee_bridge` might look like this:

```json
{
  "project_type": "zkevm:bungee_bridge",
  "projects":[],
  "preload_tasks":[
    "block_transactions"
  ],
  "bulk_mode": true,
  "processor":{
    "module": "snapshotter.modules.computes.bungee_bridge",
    "class_name": "BungeeBridgeProcessor"
  }
}
```

Critical dependencies, such as [`block_transactions`](https://github.com/Powerloom/pooler/blob/main/snapshotter/utils/preloaders/tx_receipts/preloader.py), are essential components defining the initial dataset processed by the snapshot builder.

## Expanding to Monitor Additional On-chain Activities

Extending the tracking of other on-chain activities through custom snapshot processors is a straightforward process. For detailed guidance on this topic, please refer to the [Build with Powerloom](/docs/category/building-a-new-use-case) section.
