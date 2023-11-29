---
sidebar_position: 2
---

# Snapshot Generation

## Bulk mode

Bulk Mode is highly effective in situations where the project list is continually expanding or where snapshots don't need to be submitted in every epoch, perhaps because the data hasn't changed significantly. Example use cases include monitoring on-chain activities and tracking task or quest completion statuses on the blockchain.

The system monitors all transactions and blocks without the need for predefined data sources. The `Processor Distributor` generates a `SnapshotProcessMessage` with bulk mode enabled for each project type. When snapshot workers receive this message, they leverage [preloaded transaction receipts](/docs/Protocol/Specifications/Snapshotter/preloading.md#shipped-preloaders), filtering out relevant transactions to generate snapshots for all data sources that interacted with the blockchain during that epoch. Snapshot worker then generates relevant project Ids for these snapshots and submits them for further processing.

An important advantage of Bulk Mode is that, since all transaction receipts are preloaded, this approach can efficiently scale to accommodate a large number of project types with little to no increase in RPC (Remote Procedure Call) calls.

Every time a new project is added for either of these two types on the protocol state smart contract by an off-chain data source-detector and signaller, a ProjectUpdated event is emitted according to the following data model

## Base snapshots

## Aggregate snapshots