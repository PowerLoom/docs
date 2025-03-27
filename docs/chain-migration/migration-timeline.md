---  
sidebar_position: 1  
---  

# Migration Timeline  

## 🚀 **Overview**  
Powerloom is migrating to a new chain powered by **Arbitrum Nitro** at **epoch 55,000**. This document outlines the migration process.  

## ⏳ **State Transition Timeline**  

### 1. 🔒 **Major Operational Freeze** (~24 hours before Epoch 55,000) - Done ✅
- Node minting, burning, and vested token claims paused  
- Reward claims paused  
- Staking and unstaking paused (existing stakers continue earning rewards)  

### 2. 🛑 **Network State Freeze** (Epoch 55,000) - Done ✅
- All submissions on the old chain stop  
- Node operators should see freeze confirmation in logs (see [verification logs](/docs/chain-migration/snapshotters.md#-verification-logs) for more details)
- Existing protocol state is captured for migration  
- No new transactions on the old chain  
- $POWER holders can still bridge until the old chain is decommissioned  

:::warning  
⚠️ The old chain may stop working after the **Ethereum Pectra upgrade**.  
Follow the migration guide based on your role in the network to avoid issues.  
:::  

### 3. 🔄 **State Transition Window** (~6 hours) - Done ✅
- Complete protocol state migration to the new chain  
- Balances, stakes, and rewards transferred  
- No submissions processed during this period  
- Track progress on the status page  

### 4. 🚀 **V2 Chain Switchover** - In progress ⏳
- New chain launches with verified state  
- Snapshotter nodes auto-switch to the new chain  
- First V2 epoch starts with migrated state (Epoch 55001)
- Normal operations resume with Arbitrum Nitro's enhanced performance  

### 5. 🔒 **Protocol State Preservation**  
- All historical data retained  
- Existing stakes and rewards intact  
- Uninterrupted protocol operations  
- No action required from stakers during the transition
