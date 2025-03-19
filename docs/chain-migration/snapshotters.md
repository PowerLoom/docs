---
sidebar_position: 1
---

# Snapshotters 

## 🚨 CRITICAL: New release is Live! Action Required

> ⚡️ TL;DR: The Powerloom network is migrating to a new chain between `Thu Mar 27 2025 06:00:00 - 09:00:00 GMT+0000`! 

All snapshotter operators must update their nodes within the next 10 days.

## ⏰ What's Next
- Migration is **LIVE**. Use latest release as instructed below. 
- As long as the latest release is run, you DO NOT have to do any other steps.
- Submissions from older releases of the snapshotter node will cease to be valid after the **switchover epoch ID -- 55000**. This is non-negotiable.

## 🛠️ Migration Instructions

### Single Node Operators

```bash
# Navigate to your snapshotter directory, as cloned according to docs
cd powerloom-mainnet

# Pull latest changes
git fetch
git checkout main
git pull

# Stop existing node and cleanup
./diagnose.sh -y

# Deploy with new chain configuration
./build.sh
```

:::info
Learn more: [Complete setup steps](/docs/build-with-powerloom/snapshotter-node/lite-node-v2/getting-started.md) for Snapshotter Lite V2 Node.
:::

### Multi Node Operators
```bash
cd snapshotter-lite-multi-setup/
git fetch
git checkout master
git pull

# Clean existing setup
./diagnose.sh -y

# Interactive deployment
python3 multi_clone.py
```

:::info
Learn more: [Complete setup steps](https://github.com/PowerLoom/snapshotter-lite-multi-setup/blob/master/README.md) for multi node setup
:::

## ✅ Verification logs
Your node has successfully migrated when you see the following sort of logs that indicate the latest release is running and will switchover automatically.

### Logs: Successful startup checks
```
✅ Successfully fetched the latest block number <current mainnet block number>. Your ISP is supported!
Latest epoch ID detected on old chain:  <latest epoch ID>
Using old chain
✅ Snapshotter identity found in allowed snapshotters...
```

### Logs: Timer leading up to the switchover epoch

```
Current block: <current mainnet block number>, Latest epoch ID: xxxxx| {'module': 'EventDetector'}

Using old RPC for protocol state contract| {'module': 'EventDetector'}

Using the old chain, will switch over to the new chain in xxxx epochs| {'module': 'EventDetector'}
```

### Logs: When the switchover epoch ID 55000 is released on `Thursday March 27` between `06:00:00 - 09:00:00 GMT+0000`

```
✅ Switched to new chain, will wait for Epoch release now!

 ⌛ Waiting for Epoch Release on the new chain...
```

### Logs: When the epoch ID after switchover is released **(TBD)**

```
✅Switched to new chain, sending simulation again!

Using new RPC for protocol state contract
```

## ⚠️ Important Notes
- The old chain will cease to accept submissions after the switchover epoch
- All nodes must migrate before `Thu Mar 27 2025` to maintain network participation

## 🔍 Key Changes
- The latest audited protocol state contracts to be deployed on the new chain! :white_check_mark:
- Automatic chain switchover based on epoch ID :outbox_tray:
- Enhanced stability improvements in the node :gear:


## 🆘 Need Support?
- Join our [#🗣-snapshotter-discussion](https://discord.com/channels/777248105636560948/1063022869040353300) support channel on [Discord](https://discord.com/invite/powerloom)
