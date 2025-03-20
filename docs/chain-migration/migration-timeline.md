---
sidebar_position: 1
---

# Migration Timeline

## Overview
The Powerloom network is migrating to a new chain powered by Arbitrum Nitro and Conduit. This document details the state transition process that will occur at epoch 55000.

## State Transition Timeline

### 1. Network State Freeze (Epoch 55000)
* All submissions on the old chain will stop
* Node operators should see freeze confirmation in logs
* Existing protocol state is captured for migration
* No new transactions will be processed on old chain
* $POWER holders can continue to bridge until the old chain is decommissioned and archived.

:::warning
We can not guarantee the possibility of the old chain continuing to function after the Ethereum Pectra upgrade. Hence it is advised for you to follow the migration guide depending on your role of participation in the network:
:::

### 2. State Transition Window (~6 Hours)
* Complete protocol state migration to new chain
* All balances, stakes, and rewards are transferred
* Node operators can monitor progress through logs
* No submissions will be processed during this period
* Progress can be monitored via status page

### 3. V2 Chain Genesis
* New chain begins with verified state
* Snapshotter nodes auto-switch to new chain
* First V2 epoch released with migrated state
* Normal operations resume on upgraded infrastructure
* Enhanced performance with Arbitrum Nitro

### 4. Protocol State Preservation
* All historical data maintained
* Existing stakes and rewards intact
* Uninterrupted continuation of protocol operations
* No action required from stakers during transition
* Complete backward compatibility maintained
