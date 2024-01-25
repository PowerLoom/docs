---
sidebar_position: 0
---

# Introduction

Powerloom protocol is designed to be decentralized from the ground up. This means everything, from data market implementations to data relevance, is intended to be controlled by market economics. This represents a distinct departure from current centralized solutions where data is controlled by a single entity.

The overall architecture of the Powerloom protocol is illustrated below:
![Overall Architecture](/images/OverallArchitecture.png)

One of the most crucial components of the Powerloom protocol is the Snapshotter peer. A Snapshotter is a node responsible for reading data from various blockchains and sending it to the Powerloom consensus protocol for validation. Anyone can run a Snapshotter node and join the Powerloom network.

Building a new use case can often be tricky because more documentation and examples are needed. This section will provide a comprehensive walkthrough on building a new use case on top of the Powerloom Protocol.

We aim to build a community-owned repository of a broad use case implementation with anyone who can contribute. It needs a couple of `.env` variables linking to the repository with use case and configuration files.

We aim to build a marketplace where anyone can deploy their use case and start creating value.

Let's dive into the Snapshotter node and see how it all works!
