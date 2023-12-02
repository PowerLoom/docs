---
sidebar_position: 0
---

# Introduction

Powerloom protocol is designed to be decentralized from the ground up. That means everything from data markets implementations to data relevance, everything is supposed to be controlled by market economics. This is a very different approach from the current centralized solutions where the data is controlled by a single entity.

The overall architecture of Powerloom protocol is as follows:
![Overall Architecture](/images/OverallArchitecture.png)

One of the most important parts of the Powerloom protocol is the Snapshotter peer. Snapshotter is a node that is responsible for reading data from various blockchains and sending it to the Powerloom consensus protocol for validation. Anyone can run a snapshotter node and join the Powerloom network.

Building a new use case can often be very tricky because of the lack of documentation and examples. This section aims to provide a comprehensive walkthrough on how to build a new use case on top of Powerloom protocol.

We aim to build a community owned repository of wide use case implementation with anyone being able to contibute to it. All it needs is couple of `.env` variables linking to the repository with use case and configuration files.

Eventually we aim to build a marketplace where anyone can deploy their use case and start earning from it.

Let's dive in Snapshotter node and see how it all works!