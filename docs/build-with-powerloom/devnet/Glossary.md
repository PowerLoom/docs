---
sidebar_position: 3
---

## Key terms, concepts, and acronyms used in Powerloom's Devnet

---

### Snapshotter Peers & Nodes

Snapshotter peers are participants in the Powerloom network who capture and verify data snapshots. Snapshotter nodes, run by Snapshotter peers, generate these snapshots at predetermined intervals or epochs. The peers are crucial for data accuracy and integrity in the decentralized Powerloom ecosystem.

### Snapshots

Snapshots are compressed archives of blockchain node states at specific block heights. They serve as a historical record of data changes and are taken by Snapshotter Peers. Each snapshot is a report of the observation, specific to state transitions or event logs between two block heights, and is submitted to the Protocol for consensus. Snapshots are essential for ensuring data integrity, enabling analysis, and tracking changes over time within the network.

### Epochs

An Epoch in the context of blockchain typically refers to a range of block heights on the data source blockchain where smart contract applications run, or, simply put, it is a specific period in the blockchain's life.

Each Snapshotter makes observations specific to the state transitions spanning two block heights termed Epochs. Check out our developer docs [here](/Protocol/Specifications/Epoch/) to learn more about Epochs.

### RPCs

Remote Procedure Calls (RPCs), allow a program to request a service from another program on a different computer in a network. In the blockchain, an RPC node lets users and applications interact with the blockchain without needing to know network details.

Extracting data from the blockchain state and generating the snapshot can be complex. The RPC Helper, has many helper functions to make this process easier. It handles all the retry and caching logic so developers can focus on efficiently building their use cases.

### Prost Chain

The "Prost Chain" refers to the foundational blockchain infrastructure the Powerloom Network utilizes, serving as the anchor chain for storing proofs. The Prost Chain also coordinates activity between different categories of peers on the network. For example, it coordinates consensus between snapshots to finalize snapshots per epoch; it also acts as the distribution point for releasing epochs.

### Protocol State (on Prost Chain)

Protocol State represents the current state of the network, which Snapshotter Peers or anyone else can refer to if the entity needs access to current or historical data references.

### Devnet
Devnet is a network environment for developers to test and develop blockchain applications. Devnet provides a sandbox environment to test ideas like data dashboards. As an individual, you can develop your own snapshotting logic, write the data application & use these snapshots without requiring any consensus on said snapshots from other snapshotter nodes.

:::success info
#### Our Devnet is live!
**Powerloom’s Devnet is Live!** Access the Devnet and build exciting data applications; you can mint a no-cost NFT slot on the Sepolia Network 🌟. Devnet mint page: [https://devnet-mint.powerloom.dev](https://devnet-mint.powerloom.dev/)

💡 To mint the NFT slot, ETH on the Sepolia network is required. If your balance is insufficient, you can obtain Sepolia ETH through the following link: https://faucet.quicknode.com/drip
:::

### Data Markets

Data markets are defined by a schema specifying state variables, event log topics, and specific transactions across any smart contract instances that make the decentralized application. eg. A defi protocol like uniswap. In a data market, datasets are snapshotted data collections, while data sources are the contracts that are being snapshotted.

Click [here](/Protocol/data-sources) to learn more about Data Markets.

### Environment Variables

Environment variables are external configurations that affect runtime behavior without modifying the code directly. They include network details, contract addresses, token parameters, security settings, feature flags, debugging options, and integration parameters. They offer flexibility, security, and maintainability by enabling dynamic adjustments of contract behavior across different deployment environments.

### IPFS (InterPlanetary File System) 
A decentralized storage protocol and network for storing and sharing files in a peer-to-peer manner. IPFS uses content-addressing and cryptographic hashing to distribute data across multiple nodes securely and efficiently.

### Burner Wallet

A lightweight and disposable cryptocurrency wallet designed for temporary or single-use transactions. Burner wallets are often used for small transactions or events where security and long-term storage are not priorities.

### Project IDs 

All data sources are tracked with a project ID on the protocol. Think of it as a stream of datasets, finalized by consensus against each epoch released on the protocol. The snapshotter node attempts to retrieve data sources corresponding to the projects key from the protocol state.
Find more details in the specifications of [snapshot generation](/Protocol/Specifications/Snapshotter/snapshot-build#project-id-generation).

### Snapshot Composition

The protocol state collects finalized snapshots for incremental epochs against contracts configured as data sources. These snapshots can be further composed according to the use case. 

We can compose snapshots on top of base snapshots for single or multiple contracts by: 
- Combining individual snapshots of trade volume and fees across multiple pair contracts.
- Spanning a specific set of epochs that satisfy a time duration (e.g., 24 hours).

To learn more about Snapshot Composition, start with this [guide](/Protocol/data-composition), then explore [Data Points](/build-with-powerloom/use-cases/existing-implementations/uniswap-dashboard/data-points) for a use case-driven approach, and finally read through [Closer Look at Snapshots](/build-with-powerloom/use-cases/existing-implementations/uniswap-dashboard/closer-look-at-snapshots) for a detailed understanding. 

### Relayers
Entities or nodes within a decentralized network responsible for relaying or forwarding messages, transactions, or data between different participants. Relayers play a crucial role in facilitating communication and interoperability within distributed systems.

### Pre-loaders
Software components, scripts, or routines used to load or initialize data, resources, or configurations before the main application or system starts. Pre-loaders ensure that necessary dependencies are available and set up properly to enable smooth operation of the application.

