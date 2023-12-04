---
sidebar_position: 1
---

# Tracking Wallet Interactions

Let's say you want to do something as simple as tracking all the smart contract addresses a particular wallet interacts with from now on. You can do this by running a snapshotter node and writing a simple compute processor very similar to what we saw in the [activity tracking](/docs/category/on-chain-activity-tracking) section.

## Pre-requisites

:::tip
Prerequisites: Before we dive into the implementation of new data points, you may want to look at the concept of how the pooler functions and how it retrieves and processes the data. 

[On-Chain Activity Tracking](/docs/build-with-powerloom/use-cases/existing-implementations/activity-tracking/)
:::

## Scenario: Tracking Wallet Transactions

Let's use the example of tracking transactions of a wallet for Eth Chain. This involves capturing snapshots of transactions and their associated data.

## Steps to Implement this New Data Point

1. **Getting Started**:
   You can follow [this guide](/docs/build-with-powerloom/snapshotter-node/getting-started#for-code-contributors) to get started with the node setup for custom implementations.

2. **Configure Snapshot Workers**:
   In the `config/projects.json` file of your forked repository, add a new entry for your snapshot worker class. This class will be responsible for handling the new data snapshotting task.
   - Define the `project_type` as something like `"eth:tracking_wallet_interactions"`.
   - Set `"bulk_mode"` to `true` 
   - Under `"processor"`, specify the module and class name of your new processor.
  
    ```json
    {
        "project_type": "eth:tracking_wallet_interaction",
        "projects":[],
        "preload_tasks":[
            "block_transactions"
        ],
        "bulk_mode": true,
        "processor":{
            "module": "snapshotter.modules.computes.tracking_wallet_interaction",
            "class_name": "TrackingWalletInteractionProcessor"
        }
    }
    ```

3. **Create a New Data Model**: 
   Develop a new data model in `utils/models/message_models.py`. Let's assume we are only capturing the contract addresses that a wallet interacts with. Your model should be tailored to capture and represent data specific to the wallet interactions.
   The data model in this case will look something like this
   ```python

    class TrackingWalletInteractionSnapshot(BaseModel):
        wallet_address: str
        contract_address: str
    ```

4. **Focus on Wallet Interactions**:
   You can simply fork and modify the BungeeBridgeProcessor to suit your needs. In this case, we will modify the data collection logic to concentrate on the wallet interactions.

A sample implementation of such a processor will look something like this

```python
import json
from typing import List
from typing import Tuple
from typing import Union

from redis import asyncio as aioredis

from .utils.event_log_decoder import EventLogDecoder
from .utils.models.message_models import TrackingWalletInteractionSnapshot
from snapshotter.utils.callback_helpers import GenericProcessorSnapshot
from snapshotter.utils.default_logger import logger
from snapshotter.utils.models.message_models import EthTransactionReceipt
from snapshotter.utils.models.message_models import PowerloomSnapshotProcessMessage
from snapshotter.utils.redis.redis_keys import epoch_txs_htable
from snapshotter.utils.rpc import RpcHelper


class TrackingWalletInteractionProcessor(GenericProcessorSnapshot):
    transformation_lambdas = None

    def __init__(self) -> None:
        self.transformation_lambdas = []
        self._logger = logger.bind(module='TrackingWalletInteractionProcessor')

    async def compute(
        self,
        epoch: PowerloomSnapshotProcessMessage,
        redis_conn: aioredis.Redis,
        rpc_helper: RpcHelper,

    ) -> Union[None, List[Tuple[str, TrackingWalletInteractionSnapshot]]]:
        min_chain_height = epoch.begin
        max_chain_height = epoch.end

        if max_chain_height != min_chain_height:
            self._logger.error('Currently only supports single block height')
            raise Exception('Currently only supports single block height')

        # get txs for this epoch
        txs_hset = await redis_conn.hgetall(epoch_txs_htable(epoch.epochId))
        all_txs = {k.decode(): EthTransactionReceipt.parse_raw(v) for k, v in txs_hset.items()}

        wallet_address = '0xae2Fc483527B8EF99EB5D9B44875F005ba1FaE13'
        wallet_txs = list(
            map(
                lambda x: x.dict(), filter(
                    lambda tx: tx.from_field == wallet_address and tx.to,
                    all_txs.values(),
                ),
            ),
        )

        snapshots = []
        for tx in wallet_txs:
            snapshots.append(
                (
                    f"{wallet_address}_{tx['to']}",
                    TrackingWalletInteractionSnapshot(
                        wallet_address=wallet_address,
                        contract_address=tx['to'],
                    ),
                ),
            )

        return snapshots
```

5. **Test your Processor**:
   You can test your processor by running the snapshotter node and checking the output of the snapshots.

4. **Commit and Share Your Work**:
   Once your implementation is complete and tested, commit your changes to your implementation branch. Share your work with the community by creating a pull request to the main Computes repository, if desired.


If you have any questions while building / integrating, you can reach us out on our [discord](https://discord.com/powerloom).

If you're interested in understanding the working of core components of the protocol, you can check out the [protocol overview](/docs/category/protocol-overview) section.