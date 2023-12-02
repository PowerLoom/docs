---
sidebar_position: 1
---

# Preloading

Preloaders perform an important function of fetching low-level data for eg. block details, and transaction receipts so that subsequent base snapshot building can proceed without performing unnecessary redundant queries against the data source smart contracts.

Each project type within the project configuration as found in [config/projects.json](https://github.com/Powerloom/pooler/blob/5e7cc3812074d91e8d7d85058554bb1175bf8070/config/projects.example.json#L3-L12) can specify the preloaders that their base snapshot builds depend on. Once the dependent preloaders have completed their fetches, the Processor Distributor subsequently triggers the base snapshot builders for each project type.

```json reference
https://github.com/Powerloom/pooler/blob/5e7cc3812074d91e8d7d85058554bb1175bf8070/config/projects.example.json#L3-L12
```

![Preloading](/images/preloading.png)

## Interface

The preloaders implement one of the following two generic interfaces

### `GenericPreloader`

```python reference
https://github.com/Powerloom/pooler/blob/5e7cc3812074d91e8d7d85058554bb1175bf8070/snapshotter/utils/callback_helpers.py#L109-L126
```

### `GenericDelegatorPreloader`

Such preloaders are tasked with fetching large volumes of data and utilize delegated workers to whom they submit large workloads over a request queue and wait for the results to be returned over a response queue.

```python reference
https://github.com/Powerloom/pooler/blob/5e7cc3812074d91e8d7d85058554bb1175bf8070/snapshotter/utils/callback_helpers.py#L129-L161
```

## Shipped preloaders

At the moment, we have 3 generic preloaders built into the snapshotter template.

* [Block details](https://github.com/Powerloom/pooler/blob/33f838a2fd7a1ad335f5d0ab00c6fb5828821282/snapshotter/utils/preloaders/block_details/preloader.py) - prefetches block details for all blocks in an epoch and caches it in redis
* [Eth Price](https://github.com/Powerloom/pooler/blob/feat/single_snapshotter/snapshotter/utils/preloaders/eth_price/preloader.py) - prefetches ETH price for blocks in an epoch and caches it in redis
* [Transaction receipts](https://github.com/Powerloom/pooler/blob/feat/single_snapshotter/snapshotter/utils/preloaders/tx_receipts/preloader.py) - prefetches all transaction details present in each epoch and caches the data in Redis. Since fetching all block transactions is a lot of work, it utilizes the delegated workers architecture to parallelize and fetch data in a fast and reliable way
