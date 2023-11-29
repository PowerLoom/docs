---
sidebar_position: 2
---

# Snapshot Generation

## Bulk mode

Bulk Mode is highly effective in situations where the project list is continually expanding or where snapshots don't need to be submitted in every epoch, perhaps because the data hasn't changed significantly. Example use cases include monitoring on-chain activities and tracking task or quest completion statuses on the blockchain.

The system monitors all transactions and blocks without the need for predefined data sources. The `Processor Distributor` generates a `SnapshotProcessMessage` with bulk mode enabled for each project type. When snapshot workers receive this message, they leverage [preloaded transaction receipts](/docs/Protocol/Specifications/Snapshotter/preloading.md#shipped-preloaders), filtering out relevant transactions to generate snapshots for all data sources that interacted with the blockchain during that epoch. Snapshot worker then generates relevant project Ids for these snapshots and submits them for further processing.

An important advantage of Bulk Mode is that, since all transaction receipts are preloaded, this approach can efficiently scale to accommodate a large number of project types with little to no increase in RPC (Remote Procedure Call) calls.

Every time a new project is added for either of these two types on the protocol state smart contract by an off-chain data source-detector and signaller, a ProjectUpdated event is emitted according to the following data model

## Snapshot computation modules

As briefly introduced in the section on snapshotter implementations that [leverage Git Submodules for specific computation logic](/docs/Protocol/Specifications/Snapshotter/implementations.md), the modules are specified in the configuration for project types under the key `processor`.

```json reference 
https://github.com/PowerLoom/snapshotter-configs/blob/39e4713cdd96fff99d100f1dea7fb7332df9e491/projects.example.json#L15-L28
```

Let us take the example of the snapshot builder configured for the project type `zkevm:owlto_bridge` and locate it in the `snapshotter-computes` repo, in the `zkevm_quests` branch

```python reference
https://github.com/PowerLoom/snapshotter-computes/blob/29199feab449ad0361b5867efcaae9854992966f/owlto_bridge.py#L1-L31
```

As you can observe, it implements the `compute()` interface expected from snapshotter implementations inheriting `GenericProcessorSnapshot`.

```python reference
https://github.com/PowerLoom/pooler/blob/634610801a7fcbd8d863f2e72a04aa8204d27d03/snapshotter/utils/callback_helpers.py#L179-L196
```


## Base snapshots

Callback workers calculate base snapshots against an `epochId` which corresponds to collections of state observations and event logs between the blocks at height in the range `begin, end`. They call the use case specific computation logic as configured in the [computation modules section](#snapshot-computation-modules).

The data sources are determined according to the following specification for the `projects` key in the configuration:

* an empty array against the `projects` indicates no specific data source is defined, if `bulk_mode` is `False`
  * the snapshotter node attempts to retrieve data sources corresponding to the `projects` key from the protocol state

```python reference
https://github.com/PowerLoom/pooler/blob/634610801a7fcbd8d863f2e72a04aa8204d27d03/snapshotter/processor_distributor.py#L304-L332
```

* If the `projects` key is non-existent
  * data sources can also be dynamically added on the protocol state contract which the [processor distributor](#processor-distributor) [syncs with](https://github.com/PowerLoom/pooler/blob/d8b7be32ad329e8dcf0a7e5c1b27862894bc990a/snapshotter/processor_distributor.py#L1107)

```python reference
https://github.com/PowerLoom/pooler/blob/634610801a7fcbd8d863f2e72a04aa8204d27d03/snapshotter/processor_distributor.py#L738-L751
```


* Else, we can have a [static list of contracts](/docs/Protocol/data_sources.md#static-data-sources)

### Format of data sources added as `projects`
* EVM-compatible wallet address strings
* `"<addr1>_<addr2>"` strings that denote the relationship between two EVM addresses (for eg ERC20 balance of `addr2` against a token contract `addr1`)


### Project ID Generation

```python reference
https://github.com/PowerLoom/pooler/blob/634610801a7fcbd8d863f2e72a04aa8204d27d03/snapshotter/utils/snapshot_worker.py#L51-L71
```

## Aggregate snapshots

Aggregate and higher order snapshots that build on computed base snapshots are configured in their specific repos like the following in our Uniswap V2 Dashboard use case.

```python reference
https://github.com/PowerLoom/snapshotter-configs/blob/fcf9b852bac9694258d7afcd8beeaa4cf961c65f/aggregator.example.json#L1-L29
```

The order and dependencies of these compositions are specified as such according to the `aggregate_on` key

### `SingleProject` aggregation type



### `MultiProject` aggregation type