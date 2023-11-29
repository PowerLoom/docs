---
sidebar_position: 0
---


# On-Chain Activity Tracking

Phase 2 quests are an important part of the Powerloom testnet, where we use Snapshotter Peers to watch testnet participants' activities on various blockchains. 

The Snapshotter Peer in Powerloom accurately measures key data points, helping us know when a participant completes a quest. This shows how well the Snapshotter Peer works in real situations, proving it's effective and reliable for complex tasks.

We've recently introduced an on-chain Quest for our testnet participants. For more details, you can read our announcement at [Powerloom's blog](https://blog.powerloom.io/dive-into-powerlooms-incentivized-testnet-quests-engage-experience-and-earn/).

In this initiative, we motivate users to engage in specific activities on the blockchain, which are monitored using our Snapshotter tool, referred to as the **Phase 2 quest**.

## How it works

The working of the Phase 2 Quest is similar to how [Pooler - UniswapV2 dashboard](../UniswapV2%20Dashboard/index.md) works. 


## Development for Phase 2 Quests

The Phase 2 quests represent a practical application of our snapshotter peer. These quests mainly function in Bulk Mode, owing to their singular occurrence and the constantly changing group of participants.

In this Development guide, we will explore the process of creating base snapshots. This includes a case study on how we retrieve snapshots on the Polygon ZKEVM and Bungee Bridge.

### Base Snapshots

The snapshot builders can be found under the snapshotter-specific implementation directory: [`snapshotter/modules/computes`](https://github.com/PowerLoom/snapshotter-computes/tree/1e145c7f458ce48b8cd2ac860c2ae4a78fad7ea9). Every snapshot builder must implement the interface of [`GenericProcessorSnapshot`](https://github.com/PowerLoom/pooler/blob/eth_uniswapv2/snapshotter/utils/callback_helpers.py)

```python reference
https://github.com/PowerLoom/pooler/blob/d8b7be32ad329e8dcf0a7e5c1b27862894bc990a/snapshotter/utils/callback_helpers.py#L179-L197

```

The `compute()` function is where you write the logic to create and process snapshots. It uses these inputs:

- `epoch`: Information about the current epoch.
- `redis`: A connection to Redis, which works asynchronously.
- `rpc_helper`: This helps with blockchain data requests.

For extra calculations, use `transformation_lambdas`. If `compute()` does all the work, set this to an empty list (`[]`). Otherwise, include a sequence of functions that all take inputs like the snapshot data, contract address, and the start and end of the epoch.

The `compute()` function should return a Pydantic model, which is then stored on IPFS by a special method in the system.

```python reference
https://github.com/PowerLoom/pooler/blob/d8b7be32ad329e8dcf0a7e5c1b27862894bc990a/snapshotter/utils/generic_worker.py#L179-L191
```
In the provided [`config/projects.json` example](https://github.com/PowerLoom/snapshotter-configs/blob/544f3f3355f0b25b99bac7fe8288cec1a4aea3f3/projects.example.json), we can see different snapshots being created. One of these is for `zkevm:bungee_bridge`.

```json
    {
      "project_type": "zkevm:bungee_bridge",
      "projects":[
        ],
      "preload_tasks":[
        "block_transactions"
      ],
      "processor":{
        "module": "snapshotter.modules.boost.bungee_bridge",
        "class_name": "BungeeBridgeProcessor"
      }
    },
```


Its preloader dependency is  [`block_transactions`](https://github.com/PowerLoom/pooler/blob/eth_uniswapv2/snapshotter/utils/preloaders/tx_receipts/preloader.py)  as seen in the  [preloader configuration](https://github.com/PowerLoom/pooler/tree/eth_uniswapv2#preloading).

The snapshot builder then goes through all preloaded block transactions, filters out, and then generates relevant snapshots for wallet address that received funds from the Bungee Bridge refuel contract during that epoch.

```python reference 

https://github.com/PowerLoom/snapshotter-computes/blob/29199feab449ad0361b5867efcaae9854992966f/bungee_bridge.py#L40-L92
```