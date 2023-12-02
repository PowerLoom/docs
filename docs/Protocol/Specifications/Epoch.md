---
sidebar_position: 1
---

# Epoch

An epoch denotes a range of block heights on the data source blockchain where smart contract applications run and whose data we are interested in.

All peers synchronize and achieve consensus around incremental epochs according to their specific responsibilities. For example, snapshotter peers reach consensus around snapshots—base and aggregate—per epoch. This information gets finalized into the protocol state as snapshot datasets available as content identifiers on decentralized storage mediums like IPFS and Filecoin.

The size of an epoch is configurable, referred to as `size(E)`.

## Epoch Generator

The epoch generator is a trusted service that keeps track of the head of the chain as it moves ahead and a marker `h₀` against the max block height from the last released epoch.

This makes the beginning of the next epoch, `h₁ = h₀ + 1`.

Once the head of the chain has moved sufficiently ahead so that an epoch can be published, an epoch finalization service takes into account the following factors:

- Chain reorganization reports where the reorganized limits are a subset of the epoch qualified to be published.
- A configurable 'offset' from the bleeding edge of the chain.

Then, it publishes an epoch `(h₁, h₂)` so that `h₂ - h₁ + 1 == size(E)`. The next epoch is then tracked from `h₂ + 1`.

![Epoch Release Process](https://raw.githubusercontent.com/Powerloom/onchain-consensus/phase2/docs/images/epoch_generator.png)

## State Transitions

For every `epochId`, the following are a sequence of states that a 'project' goes through, from the point of its release until a snapshot is finalized after reaching consensus on the protocol.

The snapshotter nodes participate in these states according to the data sources configured by the data markets they participate in, and the status of the same can be diagnosed further with their internal APIs.

### 1. `EPOCH_RELEASED`

When an epoch is released on the protocol by the [epoch generator service](#epoch-generator).

### 2. `PRELOAD`

For every project type's preloader configuration, this state is considered successful once all the preloading dependencies are satisfied.

### 3. `SNAPSHOT_BUILD`

This state is considered successful when the snapshot data structure is computed and made ready for submission to the protocol for consensus. This applies to both base and aggregate snapshots.

### 4. `SNAPSHOT_SUBMIT_PAYLOAD_COMMIT`

This is an internal state specific to snapshotter implementations where the snapshot-building worker processes, upon a successful `STATE_BUILD`, queue them up with the Payload Commit Service.

### 5. `RELAYER_SEND`

The Payload commit service has sent the snapshot to a transaction relayer to submit to the protocol state contract.

### 6. `SNAPSHOT_FINALIZE`

Snapshot is finalized on the protocol.

## Force Consensus service 

Force consensus is an optional mechanism that can be run by anyone in the network and is designed to trigger consensus checks for projects that didn't reach consensus automatically with a 51% majority within the submission window. This will force consensus if possible if the project submissions meet all internal criteria for consensus after the submission window is closed.

Force Consensus works slightly differently than Epoch Generator and is heavily optimized to handle a lot of projects. The sequence diagram explaining the flow is given below.

![Force consensus mechanism](https://raw.githubusercontent.com/PowerLoom/onchain-consensus/feat/force_consensus_only_relevant_projects/docs/images/force_consensus.png)

- [Epoch Generator Source Code on Github](https://github.com/Powerloom/onchain-consensus/blob/63d09aa9ab1d98a2fed55e05b7760c12692fea83/epoch_generator.py)
