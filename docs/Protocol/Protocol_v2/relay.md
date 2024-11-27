---
sidebar_position: 2
---

# Relayers

## Recap

Powerloom Protocol V1 that powered the Incentivized testnets and the Lite Node testnet were able to submit their snapshots to the protocol state in the following manner: 

1. The nodes submit their snapshots over HTTP to the relayers as EIP-712 signed message objects
2. The relayers submit each node's submission against each project ID as [individual smart contract transactions to the method `submitSnapshot()`](/docs/Protocol/Specifications/state-v1.md#function-submitsnapshotstring-memory-snapshotcid-uint256-epochid-string-memory-projectid-request-calldata-request-bytes-calldata-signature-public)

## What's new in V2

V2 relayers make use of the circuit relay transport protocol as implemented by the `libp2p` project. Briefly stated, this has two major advantages:

* Faster, lightweight connections 
  * Avoids overheads associated with HTTP connections: connection management, establishment, pooling, message payload size
* More geographically available and censorship resistant

To quote from the docs on circuit relays,

```
When a peer isn’t able to listen on a public address, it can dial out to a relay peer,
which will keep a long-lived connection open. 

Other peers will be able to dial through the relay peer using a 
`p2p-circuit` address, which will forward traffic to its destination.
```

:::info
[libp2p docs: Circuit Relay](https://docs.libp2p.io/concepts/nat/circuit-relay/)
:::

## Connection overview

As stated in the Protocol V2 overview, the circuit relay nodes ultimately allow the snapshotter nodes to connect and submit to the sequencer node. This is intermediated further by the [Rendezvous protocol](https://docs.libp2p.io/concepts/discovery-routing/rendezvous/).

:::note
Rendezvous points are typically nodes that are well-connected and stable in a network and can handle large amounts of traffic and data. They serve as a hub for nodes to discover.
:::

The setup for the nodes includes `env` details that encapsulate sequencer ID(s), and the rendezvous points which intermediate and facilitate the connection between snapshotters, relayers and sequencer(s).

## Final destination: Sequencer

The circuit relay nodes ultimately allow Snapshotters on the Powerloom network, located anywhere in the world, to submit their snapshots to the sequencer.

![snapshotter to sequencer via relay network](/images/SequencerRelayNetwork.png)

In future upgrades of the protocol, we will begin supporting a decentralized network of sequencers with its own incentive and reward structure.