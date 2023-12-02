---
sidebar_position: 0
---

# Introduction

The Powerloom protocol is designed to be decentralized from the ground up. This means everything, from data market implementations to data relevance, is intended to be controlled by market economics. This represents a distinct departure from current centralized solutions where data is controlled by a single entity.

The overall architecture of the Powerloom protocol is illustrated below:
![Overall Architecture](/images/OverallArchitecture.png)

One of the most crucial components of the Powerloom protocol is the Snapshotter peer. A Snapshotter is a node responsible for reading data from various blockchains and sending it to the Powerloom consensus protocol for validation. Anyone can run a Snapshotter node and join the Powerloom network.

Building a new use case can often be challenging due to the lack of documentation and examples. This section aims to provide a comprehensive walkthrough on how to build a new use case on top of the Powerloom protocol.

Our goal is to create a community-owned repository of wide-use case implementations with anyone able to contribute to it. All that's required is a couple of `.env` variables linking to the repository with use case and configuration files.

Ultimately, we envision building a marketplace where anyone can deploy their use case and start earning from it.

Let's dive into the Snapshotter node and see how it all works!
