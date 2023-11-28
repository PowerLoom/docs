---
sidebar_position: 1
---

# Preloading

Preloaders perform an important function of fetching low-level data for eg. block details, and transaction receipts so that subsequent base snapshot building can proceed without performing unnecessary redundant queries against the data source smart contracts.

Each project type within the project configuration as found in [config/projects.json](https://github.com/PowerLoom/pooler/blob/5e7cc3812074d91e8d7d85058554bb1175bf8070/config/projects.example.json#L3-L12) can specify the preloaders that their base snapshot builds depend on. Once the dependent preloaders have completed their fetches, the Processor Distributor subsequently triggers the base snapshot builders for each project type.

```json
{
  "config": [{
      "project_type": "pairContract_pair_total_reserves",
      "preload_tasks":[
        "eth_price",
        "block_details"
      ],
      "projects":[
      ]
  }]
}
```

## Interface

The preloaders implement one of the following two generic interfaces

### [`GenericPreloader`](https://github.com/PowerLoom/pooler/blob/5e7cc3812074d91e8d7d85058554bb1175bf8070/snapshotter/utils/callback_helpers.py#L109-L126)

```python
class GenericPreloader(ABC): 
     __metaclass__ = ABCMeta 
  
     def __init__(self): 
         pass 
  
     @abstractmethod 
     async def compute( 
         self, 
         epoch: EpochBase, 
         redis_conn: aioredis.Redis, 
         rpc_helper: RpcHelper, 
     ): 
         pass 
  
     @abstractmethod 
     async def cleanup(self): 
         pass 

```

### [`GenericDelegatorPreloader`](https://github.com/PowerLoom/pooler/blob/5e7cc3812074d91e8d7d85058554bb1175bf8070/snapshotter/utils/callback_helpers.py#L129-L161)

Such preloaders are tasked with fetching large volumes of data and utilize delegated workers to whom they submit large workloads over a request queue and wait for the results to be returned over a response queue.

```python
class GenericDelegatorPreloader(GenericPreloader): 
     _epoch: EpochBase 
     _channel: aio_pika.abc.AbstractChannel 
     _exchange: aio_pika.abc.AbstractExchange 
     _q_obj: aio_pika.abc.AbstractQueue 
     _consumer_tag: str 
     _redis_conn: aioredis.Redis 
     _task_type: str 
     _epoch_id: int 
     _preload_successful_event: asyncio.Event 
     _awaited_delegated_response_ids: set 
     _collected_response_objects: Dict[int, Dict[str, Dict[Any, Any]]] 
     _logger: loguru._logger.Logger 
     _request_id_query_obj_map: Dict[int, Any] 
  
     @abstractmethod 
     async def _on_delegated_responses_complete(self): 
         pass 
  
     @abstractmethod 
     async def _on_filter_worker_response_message( 
         self, 
         message: aio_pika.abc.AbstractIncomingMessage, 
     ): 
         pass 
  
     @abstractmethod 
     async def _handle_filter_worker_response_message(self, message_body: bytes): 
         pass 
  
     @abstractmethod 
     async def _periodic_awaited_responses_checker(self): 
         pass 

```

## Shipped preloaders

At the moment, we have 3 generic preloaders built into the snapshotter template.

* [Block details](https://github.com/PowerLoom/pooler/blob/33f838a2fd7a1ad335f5d0ab00c6fb5828821282/snapshotter/utils/preloaders/block_details/preloader.py) - prefetches block details for all blocks in an epoch and caches it in redis
* [Eth Price](https://github.com/PowerLoom/pooler/blob/feat/single_snapshotter/snapshotter/utils/preloaders/eth_price/preloader.py) - prefetches ETH price for blocks in an epoch and caches it in redis
* [Transaction receipts](https://github.com/PowerLoom/pooler/blob/feat/single_snapshotter/snapshotter/utils/preloaders/tx_receipts/preloader.py) - prefetches all transaction details present in each epoch and caches the data in Redis. Since fetching all block transactions is a lot of work, it utilizes the delegated workers architecture to parallelize and fetch data in a fast and reliable way
