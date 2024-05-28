---
sidebar_position: 3
---
# Offchain Sequencer

![Powerloom Protocol V2 offchain sequencer](/images/OffChainSequencer.png)

The offchain sequencer has the following primary functions:

1. **Snapshot Collection:** Receive snapshot submissions per epoch across project IDs from all participating snapshotters in a data market
2. **Snapshot Finalization:** Finalize snapshot submission for each project ID according to consensus rules
3. **Batch Upload Snapshot Submissions:** Create multiple batches of datasets of snapshot submissions and finalized CIDs across project IDs within an epoch.
4. **Anchor Proof of Batch:** Upload these batches to IPFS or a decentralized storage layer. Commit the storage identifier to the protocol state smart contract for validators and other peers to reference for subsequent workflows according to their roles.


## Snapshot collection and finalization

The sequencer maintains an internal clock corresponding to the release and end of submission window for an epoch. The collector component (not to be confused with the local collector component within a Snapshotter node) receives snapshot submissions from snapshotter peers over a libp2p circuit relay node. 

It also performs identity verification by referencing an EIP-712 signature field contained within the submission payloads against the snapshotter identities allowed for a data market on the protocol state smart contract.

![Collector libp2p circuit relay connection](/images/Collector-relay.png)

As the submission window for an epoch closes, the finalized submission for each project ID is decided upon by the sequencer according to rules of consensus, out of all the submissions sent out by participating snapshotter peers.

Multiple such finalizations are decided upon all project IDs within a data market and they are batched together in multiple datasets, if required. These datasets are then uploaded to IPFS or a decentralized storage layer, and references to their storage (for eg, a content identifier aka CID) are committed to the protocol state smart contract.

The finalized snapshot submissions for all corresponding project IDs are placed in an 'intermediate' finalized state on the protocol state. They can be considered to be trusted, but are awaiting attestation from validators that participate in the protocol.

:::info
Read more: Validators
:::

