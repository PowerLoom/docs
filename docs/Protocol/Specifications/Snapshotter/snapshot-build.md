---
sidebar_position: 2
---

# Snapshot Generation

## Snapshot computation modules
---

As briefly introduced in the section on snapshotter implementations that [leverage Git Submodules for specific computation logic](/docs/protocol/specifications/snapshotter/implementations), the modules are specified in the configuration for project types under the key `processor`.

```json reference 
https://github.com/Powerloom/snapshotter-configs/blob/39e4713cdd96fff99d100f1dea7fb7332df9e491/projects.example.json#L15-L28
```

Let us take the example of the snapshot builder configured for the project type `zkevm:owlto_bridge` and locate it in the `snapshotter-computes` repo, in the `zkevm_quests` branch

```python reference
https://github.com/Powerloom/snapshotter-computes/blob/29199feab449ad0361b5867efcaae9854992966f/owlto_bridge.py#L1-L31
```

As you can observe, it implements the `compute()` interface expected from snapshotter implementations inheriting `GenericProcessorSnapshot`.

```python reference
https://github.com/Powerloom/pooler/blob/634610801a7fcbd8d863f2e72a04aa8204d27d03/snapshotter/utils/callback_helpers.py#L179-L196
```


## Base snapshots
---

Callback workers calculate base snapshots against an `epochId` which corresponds to collections of state observations and event logs between the blocks at height in the range `begin, end`. They call the use case specific computation logic as configured in the [computation modules section](#snapshot-computation-modules).

The data sources are specified against the `projects` key in the configuration shown in the section above.

### Data source specification: Non-bulk mode

1. if `bulk_mode` is `False` and an empty array is assigned against the `projects`

The snapshotter node attempts to retrieve data sources corresponding to the `projects` key from the protocol state.

```python reference title="Processor Distributor synchronizing projects from protocol"
https://github.com/Powerloom/pooler/blob/634610801a7fcbd8d863f2e72a04aa8204d27d03/snapshotter/processor_distributor.py#L321-L332
```

2. If the `projects` key is non-existent
   1. data sources can also be dynamically added on the protocol state contract which the [processor distributor](#processor-distributor) [syncs with](https://github.com/Powerloom/pooler/blob/d8b7be32ad329e8dcf0a7e5c1b27862894bc990a/snapshotter/processor_distributor.py#L1107)

```python reference
https://github.com/Powerloom/pooler/blob/634610801a7fcbd8d863f2e72a04aa8204d27d03/snapshotter/processor_distributor.py#L738-L751
```


3. Else, we can have a [static list of contracts](/docs/protocol/data-sources#static-data-sources)

### Data source specification: Bulk mode

4. If `bulk_mode` is `true`

In this case, the `projects` key is not checked by the snapshotter and usually left as an empty array.

Bulk Mode is highly effective in situations where 
* the list of data sources to be tracked is continually expanding or, 
* snapshots don't need to be submitted for every epoch for all the data sources, because 
  * the state change between epochs may not be of interest
  * once a certain state change is observed, no further changes need to be recorded. Example use cases include monitoring on-chain activities and tracking task or quest completion statuses on the blockchain.

```json reference title="Project configuration for bulk mode"
https://github.com/Powerloom/snapshotter-configs/blob/39e4713cdd96fff99d100f1dea7fb7332df9e491/projects.example.json#L17-L27
```

This allows for the flexibility to filter through all transactions and blocks without the need for predefined data sources. 

The `Processor Distributor` generates a `SnapshotProcessMessage` with bulk mode enabled for each project type. When snapshot workers receive this message, they leverage [common preloaders](/docs/protocol/specifications/snapshotter/preloading#shipped-preloaders)to filter out relevant data.

```python reference
https://github.com/Powerloom/pooler/blob/634610801a7fcbd8d863f2e72a04aa8204d27d03/snapshotter/processor_distributor.py#L717-L730
```

:::info
Since common datapoints like block details, transaction receipts etc are preloaded, this approach can efficiently scale to accommodate a large number of project types with little to no increase in RPC (Remote Procedure Call) calls.
:::

Whenever a data source is added or removed by the [signaling ecosystem](/docs/protocol/data-sources#data-source-signaling), the protocol state smart contract emits a `ProjectUpdated` event with the following data model.

```python reference
https://github.com/Powerloom/pooler/blob/5892eeb9433d8f4b8aa677006d98a1dde0458cb7/snapshotter/utils/models/data_models.py#L102-L105
```


### Format of specifying data sources against `projects`
* EVM-compatible wallet address strings
* `"<addr1>_<addr2>"` strings that denote the relationship between two EVM addresses (for eg ERC20 balance of `addr2` against a token contract `addr1`)


### Project ID generation

```python reference
https://github.com/Powerloom/pooler/blob/634610801a7fcbd8d863f2e72a04aa8204d27d03/snapshotter/utils/snapshot_worker.py#L51-L71
```
![Base snapshot project ID generation](/images/base_snapshot_project_id.png)

### Example of snapshot computation

#### Base snapshot of trade events for the [Uniswap V2 dashboard data market](/docs/category/uniswapv2-dashboard):
```python reference
https://github.com/Powerloom/snapshotter-computes/blob/6fb98b1bbc22be8b5aba8bdc860004d35786f4df/trade_volume.py#L14-L44
```


## Aggregate snapshots
---

Aggregate and higher order snapshots that build on base snapshots are configured in their specific repos like the following in our [Uniswap V2 Dashboard use case](/docs/category/uniswapv2-dashboard). This is where you see the [dependency graph of snapshot composition](/docs/protocol/data-composition#dependency-graph) in action.

:::info

* [Single project composition](/docs/protocol/data-composition#single-project-composition)
* [Multi project composition](/docs/protocol/data-composition#multiple-projects-composition)
* [Walkthrough of the snapshotter implementation for Uniswap V2 dashboard](docs/category/tour-of-the-existing-implementation)
:::

The order and dependencies of these compositions are specified as such according to the `aggregate_on` key. 

### `SingleProject` aggregation type

```json reference
https://github.com/Powerloom/snapshotter-configs/blob/fcf9b852bac9694258d7afcd8beeaa4cf961c65f/aggregator.example.json#L1-L10
```

* This type specifies generation of an aggregation snapshot for a single project across a span of epochs, relative to the current `epochId`.
  * The `filters.projectId` key specifies the substring that should be contained within a project ID on which base snapshot computation is completed for the epoch
  * For eg, a base snapshot build on a project ID `pairContract_trade_volume:0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc:UNISWAPV2` triggers the worker `AggreagateTradeVolumeProcessor` as defined in the `processor` config, against the pair contract `0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc`.
* The span of epochs on which corresponding base snapshots will be aggregated is determined by the logic contained in the module specified in the `processor` key

The following implementation aggregates [trade volume snapshots](/docs/build-with-powerloom/use-cases/existing-implementations/uniswapv2-dashboard/closer-inspection-of-the-snapshot-datasets#extracting-base-snapshots-trade-data-logic) across a span of 24 hours worth of epochs, if available. Else, it aggregates the entire span of epochs available on the protocol against the data market and reports it back.

```python reference
https://github.com/Powerloom/snapshotter-computes/blob/6fb98b1bbc22be8b5aba8bdc860004d35786f4df/aggregate/single_uniswap_trade_volume_24h.py#L110-L121
```

### `MultiProject` aggregation type

```json reference
https://github.com/Powerloom/snapshotter-configs/blob/fcf9b852bac9694258d7afcd8beeaa4cf961c65f/aggregator.example.json#L25-L31
```

* `projects_to_wait_for` specifies the exact project IDs on which this higher order aggregation will be generated 
* The aggregation snapshot build for this is triggered once a snapshot build has been achieved for an epochId

The configuration above generates a dataset that can be further used to render a dashboard that contains trade information across a large number of Uniswap v2 pair contracts.

### Project ID generation

In case of 'MultiProject` aggregations, their project IDs are generated with a combination of the hash of the dependee project IDs along with the namespace and project type string.

![Multiproject Aggregate Project ID generation](/images/aggregate_snapshot_project_id.png)

The following is the section where the relevant project IDs are generated according to their configuration type.

```python reference
https://github.com/Powerloom/pooler/blob/d8b7be32ad329e8dcf0a7e5c1b27862894bc990a/snapshotter/utils/aggregation_worker.py#L59-L92
```