---
sidebar_position: 1
---

:::warning
The sequencer listening interfaces for specific data markets are listed in the following trusted sequencer JSON file hosted on the Powerloom Github repository:

https://github.com/PowerLoom/snapshotter-lite-local-collector/blob/feat/trusted-relayers/sequencers.json

DO NOT attempt to connect to any other sequencer interfaces supplied by anyone claiming to represent Powerloom if they are not listed in the above file.
:::

# Sequencer Overview

The sequencer has the following primary functions:

1. **Snapshot Collection:** Receive snapshot submissions per epoch across project IDs from all participating snapshotters in a data market
2. **Snapshot Finalization:** Finalize snapshot submission for each project ID according to consensus rules
3. **Batch Upload Snapshot Submissions:** Create multiple batches of datasets of snapshot submissions and finalized CIDs across project IDs within an epoch.
4. **Anchor Proof of Batch:** Upload these batches to IPFS or a decentralized storage layer. Commit the storage identifier to the protocol state smart contract for validators and other peers to reference for subsequent workflows according to their roles.

![Powerloom Protocol V2 sequencer](/images/Sequencer.png)

## Snapshot collection and finalization

The sequencer maintains an internal clock corresponding to the release and end of the submission window for an epoch. It receives snapshot submissions from snapshotter peers over libp2p streams.

It also performs important verification checks:

* identity verification by referencing an EIP-712 signature field contained within the submission payloads against the snapshotter identities allowed for a data market on the protocol state smart contract
* submission window verification check by referencing the protocol state head block number as attached in the header of the submission sent by a snapshotter peer
* DDoS protection that checks the number and frequency of submissions received from a snapshotter peer per epoch

As the submission window for an epoch closes, the finalized submission for each project ID is decided upon by the sequencer according to rules of consensus, out of all the submissions sent out by participating snapshotter peers.

## Batch upload and anchor proof

Multiple such finalizations are decided upon all project IDs within a data market and they are batched together in multiple datasets, if required, at the end of every epoch's submission window. These datasets are then uploaded to IPFS or a decentralized storage layer, and references to their storage (for eg, a content identifier aka CID) are committed to the protocol state smart contract.

The finalized snapshot submissions for all corresponding project IDs are placed in an 'intermediate' finalized state on the protocol state. They can be considered to be trusted, but are awaiting attestation from validators that participate in the protocol.

:::info
Read more on how validators submit attestations on intermediate finalized states
:::


Batches contain submission details for multiple project IDs with the following information per project:

* Submission objects from snapshotter peers that contain their respectively signed EIP-712 objects
* Finalized snapshot as reported by sequencer 

![Batch submission section of protocol V2 workflow](/images/protov2-submission-batching.png)

### Merkle tree of submission IDs

An important feature of each batch is that the dataset against it contains the root hash of a Merkle tree constructed out of the submission IDs sent out by the snapshotter peers. Utilizing this, snapshotter peers can verify whether their submissions were included in batches committed to the protocol state smart contract for an epoch.

The submission IDs contained in a batch are added to the leaves of the Merkle tree as determined by the lexicographical ordering of their corresponding project IDs. 

Each batch's Merkle tree builds on the tree from the preceding batch within the same epoch.

