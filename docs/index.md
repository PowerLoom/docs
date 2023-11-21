---
sidebar_position: 0
---
# Introduction 

# Powerloom Protocol Quickstart Guide

Welcome to the Powerloom Protocol Quickstart Guide. This guide is intended to provide you with a fundamental understanding of the Powerloom Protocol, its components, and its functionality. The Powerloom Protocol is a comprehensive solution designed for decentralized data aggregation and management in web3 applications.



![Powerloom Workflow](/images/introduction.png)

## Introduction

PowerLoom is a decentralized data protocol built to serve the data needs of developers building on smart contract platforms like Ethereum, Polygon etc. It enables peers to reach consensus on observations of state transitions and event emissions across multiple contracts.

## What is a snapshotter?

Snapshotters are peers running an implementation of the protocol (like Pooler) that participate in collecting data from configured contracts over epochs and reaching consensus on snapshots of that data through a protocol state smart contract.

## What is an Epoch?

An Epoch represents a range of block heights on the source blockchain (e.g. Ethereum mainnet) over which peers collect data and reach consensus on snapshots. The size of an epoch can be configured as needed.

## How powerloom works?

The protocol workflow involves snapshotters collecting data into snapshots over epochs, uploading snapshots to IPFS/Filecoin, and comparing the content IDs on the protocol state contract until consensus thresholds are met to finalize a snapshot.

## How developers can leverage the powerloom

Developers can leverage finalized snapshot data via the Core API to build dashboards, bots, aggregators etc. without having to manage their own blockchain data infrastructure. The composability model allows deriving higher order data points from finalized base snapshots.


## Getting Started

To begin using Powerloom Protocol, you need to understand the workflow and architecture of the system. This involves familiarizing yourself with the different components and how they interact within the protocol.

1. **Review Protocol Overview:** Start by reviewing the detailed Protocol Overview document. This document offers a comprehensive view of how the protocol functions.
2. **Explore the Pooler Implementation:** Visit the [Powerloom Pooler Section](/docs/Build-with-Powerloom/pooler/) to learn more about the Snapshotter implementation and its functionalities.

We also have a detailed Technical Community Update #1 Recording which walks through the details of the protocol: 

<iframe width="560" height="315" src="https://www.youtube.com/embed/kTTmu3vhuEY?si=cD_mDEH0ohUy0n9x" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Conclusion

This Quickstart Guide provides you with the necessary knowledge to begin exploring the Powerloom Protocol. For more detailed information, please refer to the other sections of this documentation, which cover the core protocol, build processes, specifications, and more.

## Staying informed
- [GitHub](https://github.com/powerloom)
- [Twitter](https://twitter.com/powerloomhq)
- [Blog](https://blog.powerloom.io)
- [Discord](https://discord.com/powerloom)

## Something missing?
If you find issues with the documentation or have suggestions on how to improve the documentation or the project in general, please [file an issue for us](https://github.com/powerloom/docs), or email us at support@powerloom.io 



---
Powerloom Protocol - The decentralized data layer for web3

