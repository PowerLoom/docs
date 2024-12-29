---
sidebar_position: 3
---
# Sequencer: Finalizer

## Overview

![Finalizer](/images/finalizer-architecture.png)

The **Finalizer** plays a pivotal role within the **Sequencer** system, serving as the last step in the batch processing pipeline. It is responsible for finalizing the batches prepared and forwarded by the Event Collector and subsequently submitting these finalized batches to the transaction relayer service.

Designed as an auto-scaled service, the Finalizer dynamically adjusts its capacity to handle fluctuating batch submission volumes, ensuring consistent performance and reliability.

Functionalities:

- **Process Submissions:** Retrieve submission details from the Finalizer Queue and initiate the finalization process.
- **Finalize Submissions:** Identify the most frequent SnapshotCID for each project in a batch and update the eligible submission counts for snapshotter identities matching the most frequent one.
- **Merkle Tree Construction:**

    ![Merkle Tree Construction](/images/merkle-tree.png)
  - Generate a Merkle tree using the submission IDs from the batch.
  - Compute the root hash of the tree and construct a batch object.
  - Store the batch object on IPFS.
  - Create a second Merkle tree using the finalized CIDs to ensure data integrity and immutability.
  - Return the finalized IPFS batch submission data.
- **Finalized Batch Transmission:** Transmit the finalized IPFS batch submission data to the transaction relayer service.

These finalized snapshot submissions for all corresponding project IDs are placed in an `intermediate` finalized state on the protocol state. They can be considered to be trusted, but are awaiting attestation from [**validators**](/docs/Protocol/Protocol_v2/validator.md) that participate in the protocol.

## On-Chain updates via Relayer
The Finalizer component leverages the [**Relayer**](/docs/Protocol/Protocol_v2/relay.md) service to transmit essential updates to the Protocol State Contract, ensuring seamless synchronization across system components:

### Batch Processing Updates
- **Batch Submission:** Sends finalized IPFS batch submission data for each batch, corresponding to a specific data market and epoch combination, to the relayer for on-chain publishing.