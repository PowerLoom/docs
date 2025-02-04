---
sidebar_position: 2
---

# Payload Commit Service (deprecated)

Once the snapshots are generated and uploaded to a decentralized storage medium like IPFS, the payload commit service ensures that the record of the same is registered on the protocol. It also performs some housekeeping functions, such as caching finalized snapshots against an epoch. The following sequence diagram provides a complete picture of its functions.

![Payload Commit Service Workflow](/images/payload_commit_service_callflow.png)

1. Upon receiving the snapshot dataset's CID from snapshot builder processes, this service prepares an EIP-712 signed message containing the same. This identifies the snapshotter on the protocol state smart contract.
2. Submits the signed message to the relayer (if configured); otherwise, it uses an internal transaction manager to submit it as a transaction to the protocol state smart contract.
3. It also processes the finalization of snapshots for a given epoch:
   1. If the finalized snapshot for a given project against an `epochId` has the same CID as generated by snapshot builders, store the contents of the snapshot on a local disk cache.
   2. Else, it fetches the finalized snapshot dataset from IPFS and stores it in the local disk cache.
4. Generates a Snapshotter report
