Key terms, concepts, and acronyms used in Powerloom's Devnet

### We already have:

- Data Markets & Sources
- Specifications
    - Epochs
    - Snapshotter
        - System Design
        - Pre-loading
        - Payload Commit Service
        - Snapshot Generation
        - State Machine
    - Protocol State

### We need to add:

- Snapshot Composition
- What is an RPC URL?
- What are Project IDs?
- What is Prost Chain?
- What is a relayer?

---

## **Snapshotter Peers**

A Snapshotter is like a note-taker for important data changes and events on the blockchain, kind of like how a stock trader keeps track of stock prices. Snapshotter Peers take "snapshots" of the data at set times intervals or epochs in the Protocol. They are a key part of the Powerloom ecosystem, this data is then stored in a decentralized way.

## **Snapshots**

A Snapshot is a compressed archive of the state of a blockchain node at a specific block-height. Snapshots are essentially captures of data status at a particular time. They serve as a historical record that maps the changes and evolution of data on the blockchain. In the Powerloom ecosystem, these snapshots are taken by the Snapshotter Peers.

Each Snapshotter makes their observation/”read” available on a decentralized storage layer (eg. IPFS)

The read is specific to the state transitions spanning two specific block heights termed as Epochs. These block heights correspond to the chain where the data source contracts reside.

Each such observation is termed as a snapshot against a Content Identifier. These are submitted to the Protocol for consensus

## RPCs

RPCs, or Remote Procedure Calls, allow a program to request a service from another program on a different computer in a network. In blockchain, an RPC node lets users and applications interact with the blockchain without needing to know network details.

## Consensus Reached Snapshots

Consensus Reached Snapshots are a type of snapshot that is created when a majority of nodes in the network agree on the state of the data at a specific block height. This ensures that the snapshot accurately represents the agreed-upon state of the data across the network.

## Aggregated Snapshots

Aggregated Snapshots are a collection of multiple snapshots, combined into one. This can be useful for getting a broader view of the data's state over a longer period of time or across multiple block heights or epochs.

## Composed Data Set

A Composed Data Set is a collection of data that has been put together from various sources. In the context of Powerloom, this could refer to a set of data that has been compiled from various snapshots and other data sources.

## Market based filter, forming Data Markets

This could refer to the process of filtering data based on market demand and creating specialized markets for certain types of data. This allows for more efficient data exchange and can create new opportunities for monetization.

Data markets are defined by a schema that specifies state variables, event log topics, specific transactions across any number of smart contract instances that make up the decentralized application. eg. A defi protocol like uniswap

Any use-case like Uniswap is a data market but the data is generated from the fetch done by snapshots. It is a collection

## Epochs

An [Epoch](https://docs.powerloom.io/docs/Protocol/Specifications/Epoch/) in the context of blockchain typically refers to a range of block heights on the data source blockchain where smart contract applications run or simply put, it is a specific time period in the blockchain's life.

Each Snapshotter makes their observation/”read”

The read is specific to the state transitions spanning two specific block heights termed as Epochs. These block heights correspond to the chain where the data source contracts reside.

## Protocol State

Protocol State represents the current state of the network which snapshotter peers or anyone else can refer to if the entity needs access to current or historical data references. Protocol state is constantly updated as new epochs are released.

## What are Data Markets & Data Sources
