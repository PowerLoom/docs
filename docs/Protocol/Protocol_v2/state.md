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

## State modification



## State view

