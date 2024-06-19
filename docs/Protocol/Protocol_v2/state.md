---
sidebar_position: 4
---

# Protocol State

## Overview

### Additional features

The protocol state in V2 of the protocol has the following changes introduced to support new features like batched submissions and validator attestations.

* Batched snapshot submissions from sequencer
* Attestation on submission batches from validators

### Removed

* [Method to directly accept submissions from allowed snapshotters](/docs/Protocol/Specifications/protocol-state.md#function-submitsnapshotstring-memory-snapshotcid-uint256-epochid-string-memory-projectid-request-calldata-request-bytes-calldata-signature-public)
* Snapshot submissions as content identifiers(CIDs) per epoch
  * Occurrence count of their submissions
  * Mapping between allowed snapshotter identities and the CIDs they submitted


### Continued from Snapshotter Lite testnet

:::note
Most of the [V1 protocol state](/docs/Protocol/Specifications/protocol-state.md) implemented for the different phases of the incentivized testnets and the lite node testnet continues in V2.
:::

* Slot based snapshotter identities (slot IDs)
* Snapshot CIDs per epoch per project with the max occurrence frequency
* Time slots allotted to slot IDs against snapshotter identities


## Deployed contract

The contract address where the V2 protocol state can be found is contained within the `env.example` file for the type of node beind deployed:

* [Snapshotter Lite Node V2]((https://github.com/PowerLoom/snapshotter-lite-v2/blob/15ce2872ac3cbdce47955b26f84b6c634fbbb6ab/env.example#L7))

## ABI

The [Application Binary Interface (ABI) to interact with the smart contract](https://github.com/PowerLoom/snapshotter-lite-v2/blob/feat/new_proto_bidirectional/snapshotter/static/abis/ProtocolContract.json) can be found contained within the repositories of the corresponding node type.

---

## State transitions

### Snapshot state

```solidity
enum SnapshotStatus {
    PENDING,
    FINALIZED
}
```
The state of a snapshot CID against a project ID is `PENDING` when reported by the sequencer and `FINALIZED` when the same is attested to by the validator.

The `PENDING` state can be considered to be an intermediate, trusted state since it is reported by the sequencer which has no incentive to be a bad actor unless its security is compromised.

---

## State modification

### Snapshot submission in batches by [sequencer](/docs/Protocol/Protocol_v2/sequencer.md)

```solidity
function submitSubmissionBatch(
        string memory batchCid,
        uint256 batchId,
        uint256 epochId,
        string[] memory projectIds,
        string[] memory snapshotCids
    ) public onlySequencer
```

An epoch as identified by `epochId` can contain multiple batches of snapshot submissions from the sequencer, as referenced by the `batchId`.

The entire contents of this batch are made available on IPFS on the CID `batchCid`.

The elements of the arrays `projectIds` and `snapshotCids` are present as a 1:1 mapping that the sequencer reports as finalized CID against each of the project IDs.

### Attestation against submission batches by [validator](/docs/Protocol/Protocol_v2/validator.md)

```solidity
function submitBatchAttestation(
        uint256 batchId,
        uint256 epochId,
        bytes32 finalizedCidsRootHash
    ) public onlyValidator
```

Validators submit their attestations against batches of snapshot submissions in an `epochId` by refererring to their `batchId`.

The attestation is the `finalizedCidsRootHash` which is the hash of the merkle tree root constructed from the finalized CIDs across the projects contained in a batch.

### Finalization against attestation consensus

`shouldFinalizeBatchAttestation()` is used as the state check whether the consensus rule around attestations submitted by the network of validators is satisfied, followed by a call to `finalizeSnapshotBatch()` that finalizes the snapshot CIDs against the project IDs contained in a `batchId` for an `epochId`.

```solidity
function shouldFinalizeBatchAttestation(
  uint256 batchId, 
  uint256 currentAttestationCount
) private view returns (bool)
```

```solidity
function finalizeSnapshotBatch(uint256 batchId, uint256 epochId) private
```
---

## State view

### `allSnapshotters(address)`
Mapping to check for existence of snapshotter identity on protocol state

### `slotSnapshotterMapping(uint256)`

Mapping from slot ID to registered snapshotter node's signing wallet address.

### `timeSlotPreference(uint256)`

Mapping from slot ID to registered time slot in a day.

### `slotCounter()`

Number of registered slots on the protocol state.

### `snapshotsReceivedSlot`

```solidity
mapping(string projectId => mapping(uint256 slotId => mapping(uint256 epochId => bool))) public snapshotsReceivedSlot;
```
Whether snapshot was received agains a slot ID within an epoch ID.

### `maxSnapshotsCidMap`

```solidity
mapping(string procjectId => mapping(uint256 epochId => string snapshotCid)) public maxSnapshotsCidMap;
```

The snapshot CID reported to have reached consensus against a `projectId` for an `epochId`

### `batchIdToProjects`

```solidity
mapping(uint256 batchId => string[] projectids) public batchIdToProjects;
```

Project IDs contained within a Batch ID.

### `epochIdToBatchIds`

```solidity
mapping(uint256 epochId => uint256[] batchIds) epochIdToBatchIds;
```

Batch IDs of submissions sent out for an epoch by the sequencer.

### Validator attestations

```solidity
mapping(uint256 batchId => mapping(address => bool)) public attestationsReceived;
mapping(uint256 batchId => mapping(bytes32 finalizedCidsRootHash=> uint256 count)) public attestationsReceivedCount;
mapping(uint256 batchId => uint256 count) public maxAttestationsCount;
mapping(uint256 batchId => bytes32 finalizedCidsRootHash) public maxAttestationFinalizedRootHash;
mapping(uint256 batchId => bool) public batchIdAttestationStatus;
```

Storing attestations received from validator identities and their counts of attestations against finalized root hashes of merkle trees built from CIDs.

```solidity
mapping(uint256 batchId => bytes32 finalizedCidsRootHash) public batchIdSequencerAttestation;
mapping(uint256 batchId => address[] validators) public batchIdDivergentValidators;
```

State of the initial attestation as reported by the sequencer as finalized CIDs against the project IDs and the state of them if they diverge from the consensus on attestations as reached by validators.

## Events

### Snapshot submissions

* **SnapshotBatchSubmitted:** Emitted upon the sequencer submitting a batch of snapshot submissions along with their claimed finalizations for an `epochId`

```solidity
event SnapshotBatchSubmitted(
  uint256 batchId, 
  string batchCid, 
  uint256 indexed epochId, 
  uint256 timestamp
);
```

* **DelayedBatchSubmitted:** Emitted when the sequencer submits a batch past the submission deadline for an epoch

```solidity
event DelayedBatchSubmitted(
  uint256 batchId, 
  string batchCid, 
  uint256 indexed epochId, 
  uint256 timestamp
);
```

* **SnapshotBatchFinalized:** Emitted when a majority of the validators have submitted their attestations on a `batchId` submitted by the sequencer

```solidity
event SnapshotBatchFinalized(
  uint256 indexed epochId, 
  uint256 indexed batchId, 
  uint256 timestamp
);
```

### Validation

* **SnapshotBatchAttestationSubmitted:** Emitted when a validator `validatorAddr` submits their attestation for a `batchId` batch
```solidity
event SnapshotBatchAttestationSubmitted(
  uint256 batchId, 
  uint256 indexed epochId, 
  uint256 timestamp, 
  address indexed validatorAddr
);
```

* **DelayedAttestationSubmitted:** Emitted when a validator `validatorAddr` submits their attestation for a `batchId` batch past the submission deadline

```solidity
event DelayedAttestationSubmitted(
  uint256 batchId, 
  uint256 indexed epochId, 
  uint256 timestamp, 
  address indexed validatorAddr
);
```
