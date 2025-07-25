---
sidebar_position: 1
---

# Preloading

Preloaders play a crucial role in fetching low-level data, such as block details and transaction receipts. This ensures that subsequent base snapshot building can proceed without unnecessary redundant queries against the data source smart contracts.

Each project type within the project configuration, found in [config/projects.json](https://github.com/powerloom/pooler/blob/5e7cc3812074d91e8d7d85058554bb1175bf8070/config/projects.example.json#L3-L12), can specify the preloaders that their base snapshot builds depend on. Once the dependent preloaders have completed their fetches, the Processor Distributor subsequently triggers the base snapshot builders for each project type.

```json reference
https://github.com/powerloom/pooler/blob/5e7cc3812074d91e8d7d85058554bb1175bf8070/config/projects.example.json#L3-L12
```

![Preloading](/images/preloading.png)

## Interface

The preloaders implement one of the following two generic interfaces:

### `GenericPreloader`

```python reference
https://github.com/powerloom/pooler/blob/5e7cc3812074d91e8d7d85058554bb1175bf8070/snapshotter/utils/callback_helpers.py#L109-L126
```

### `GenericDelegatorPreloader`

These preloaders are tasked with fetching large volumes of data and utilize delegated workers. They submit large workloads over a request queue and wait for the results to be returned over a response queue.

```python reference
https://github.com/powerloom/pooler/blob/5e7cc3812074d91e8d7d85058554bb1175bf8070/snapshotter/utils/callback_helpers.py#L129-L161
```

## Shipped preloaders

Currently, the snapshotter template includes three generic preloaders:

* [Block details](https://github.com/powerloom/pooler/blob/33f838a2fd7a1ad335f5d0ab00c6fb5828821282/snapshotter/utils/preloaders/block_details/preloader.py) -  Prefetches block details for all blocks in an epoch and caches them in Redis.
* [Eth Price](https://github.com/powerloom/pooler/blob/feat/single_snapshotter/snapshotter/utils/preloaders/eth_price/preloader.py) - Prefetches ETH price for blocks in an epoch and caches it in Redis.
* [Transaction receipts](https://github.com/powerloom/pooler/blob/feat/single_snapshotter/snapshotter/utils/preloaders/tx_receipts/preloader.py) - Prefetches all transaction details present in each epoch and caches the data in Redis. Since fetching all block transactions is a substantial workload, it utilizes the delegated workers architecture to parallelize and fetch data quickly and reliably.