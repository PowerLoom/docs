---
sidebar_position: 3
---

# Validator

## Overview

![Protocol V2 validator worklow](/images/validator-workflow.png)

As the snapshot submission batches are [anchored on the protocol state by the sequencer](/docs/Protocol/Protocol_v2/sequencer.md#batch-upload-and-anchor-proof), the validators become responsible for submitting their attestations on these batches.

## State transitions

![Snapshot submission, validation and finalization state transitions](/images/validator-resubmission-workflow.png)

### Batch submission

When the sequencer submits a batch, it puts the snapshots contained within in a `PENDING` state on the protocol state. It also causes the emission of a `SnapshotBatchSubmitted` event.

:::info
Learn more:
* [Sequencer batch submission](/docs/Protocol/Protocol_v2/sequencer.md#batch-upload-and-anchor-proof)
* [Protocol State: State transition of snapshots](/docs/Protocol/Protocol_v2/state.md#snapshot-state)
:::

### Batch validation

The finalized CID of every project ID committed by the sequencer in the `PENDING` state moves to a `FINALIZED` state when a majority of the validators submit their attestations on that finalization.

In the case where a majority of validators do not agree to the finalization, a resubmission workflow is triggered. This time, the validators work on re-creating the snapshots against the project IDs that did not reach consensus for finalization, and re-submit them to the protocol state to be resolved by the same consensus rules.

#### Trigger for batch validation

For the current iteration of the Protocol V2 release, upon an `EpochReleased` event for an epoch `e(i)` the attestation for finalizations committed by the sequencer for epoch `e(i-1)` begins.

This will soon be replaced by a faster finality trigger that will not have to wait for the next epoch release. For practical purposes, on a high throughput chain with smaller epochs, this process is near instant.

