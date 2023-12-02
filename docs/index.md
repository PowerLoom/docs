---
sidebar_position: 0
---
# Introduction 

Powerloom Protocol is a decentralized data protocol primarily aimed at serving the ever-growing data needs of smart contract-based applications like DeFi, games, and more users. We incentivize participating peers to reach a consensus on state transitions and event emissions observations across many smart contracts.

By utilizing data compositions on smaller, consensus-reached data units, Powerloom stands as a peer-validated and accurate information source, empowering rich data applications like dashboards, bots, aggregators, and insights trackers.

![Powerloom Workflow](/images/introduction-image.png)

:::tip
**Powerloom in a nutshell**: Powerloom is like a decentralized library catalog for blockchain data.

The "snapshotters" are like librarians who are continually observing shelves of books (smart contracts) and cataloging what books are added or removed, what pages change in existing books, and what notes readers add in book margins (events).
:::

If you are a developer looking to build a data dashboard, DEX aggregator, or any web3 application that requires data, Powerloom offers out-of-the-box features that can assist you in focusing on building robust applications while simultaneously taking care of the data aspect. 

Here are some of the key features of Powerloom:

**Decentralized Data:** Powerloom allows developers to build applications on top of decentralized, consensus-backed data instead of relying on centralized APIs. This improves reliability and transparency.

**Real-Time Data:** The snapshotter network provides real-time data updates as transactions occur on the blockchain, enabling applications that need live data.

**Time-series queries**: Datasets are available across precise time periods captured in epochs which can be further filtered and composed to serve use cases. This is useful for analytics and tracking trends.

**Flexible Data Models:** Developers can contribute to data markets by building their own use cases and contributing to the "data markets" to track what's most valuable for their specific use case, beyond basic transactions.

**Modular and Extensible:** Powerloom has a modular architecture that makes it easy for developers to add support for new data sources, transform data, and build on top of existing data pipelines.

:::info
Stay updated with all the latest updates from the Powerloom team and the community by joining our [Discord](https://discord.com/powerloom)
:::

## Roles in the Powerloom Ecosystem
The Powerloom ecosystem is made up of 6 different roles that work together to provide trusted and consensus backed data to applications.

### Snapshotter
A Snapshotter is a node that captures crucial on-chain data transitions and event emissions. Snapshotter nodes are the backbone of the Powerloom ecosystem. They are responsible for capturing data from the blockchain and storing it in a decentralized manner. In order to become a snapshotter node, a node must stake a certain amount of Powerloom tokens. Snapshotter nodes are incentivized to capture data by receiving rewards in the form of Powerloom tokens for the work they do.

### Validator
Validators are responsible for validating blocks and securing the Prost Chain. In order to become a validator node, a node must stake a certain amount of Powerloom tokens. Validators are incentivized to validate blocks by receiving rewards in the form of Powerloom tokens for the work they do.

### Curator
Curators are responsible for building new use cases, keeping the current data market implementations up to date and ensuring that the data markets are healthy. Curators are incentivized to work through various grants, bounties and initiatives run by the Powerloom Foundation initially and later by the market participants.

### Signaller
A Signaller is a node that signals the importance of different data markets. They ensure that snapshotter resources are allocated to the most important data markets. Signallers are incentivized to signal by receiving rewards in the form of Powerloom tokens for the work they do.

### Consumer
Consumers are the end users of the data. They are the ones who use the data to build applications like dashboards, bots, aggregators, and insights trackers. Consumers need to pay a fee in the form of Powerloom tokens keep their data market active and to access the data

### Watchmen
Watchmen are the entities that are responsible for the accuracy of the data. They are responsible for ensuring that the data is accurate and that the snapshotter nodes are not malicious. Watchmen can basically challenge the data and if the data is found to be inaccurate, the snapshotter node that provided the data will be penalized and the watchman will be rewarded. However, since this is additional work for the network, it is important that the watchmen only challenge the data when they are sure that the data is inaccurate. Watchmen need to stake a certain amount of Powerloom tokens in order to challenge the data and if they are found to be wrong, their stake will be slashed. Watchmen are incentivized to challenge the data by receiving rewards in the form of Powerloom tokens for the work they do.

---
## See Powerloom in action :rocket:

Discover the practical application of Powerloom through Pooler, a Uniswap V2 Dashboard Implementation. This latest release of Pooler is a powerhouse for Uniswap V2 analytics and offering comprehensive data aggregations and flexibility to extend to more use cases. 

[UniswapV2 Dashboard](https://uniswapv2.powerloom.io)

---

## Building with Powerloom

To begin using Powerloom Protocol, you need to understand the workflow and architecture of the system. This involves familiarizing yourself with the different components and how they interact within the protocol.
The best way to start is by exploring the existing implementations present in [existing-implementations](/docs/category/existing-implementations), understanding how they work, and how you can leverage them to build your own use cases. We have also provided some examples of how you can build your own use cases in the [building-use-cases](/docs/category/building-a-new-use-case) section.


### Utilising existing implementations to build your data application

Although the data generated by Powerloom protocol is decentralised and anyone can access it, it is not always easy to understand how to use it. To make it easier for developers to use the data, each snapshotter node comes with a set of APIs that can be used to access the data. These APIs are designed to be easy to use and can be used to build data applications like dashboards, bots, aggregators, and insights trackers.

Discover Snapshotter core APIs connected to nodes currently hosted by Powerloom foundation to build your own data applications. [Snapshotter Core APIs Docs](/docs/category/snapshotter-core-api)


## Walkthrough

We've been working on Powerloom protocol for quite some time now and the protocol has evolved quite a bit. We have a detailed walkthrough of our network, how it functions and how one leverage the power of data using powerloom. You can watch these technical community calls:

### Technical Community Call #1
<iframe width="560" height="315" src="https://www.youtube.com/embed/kTTmu3vhuEY?si=cD_mDEH0ohUy0n9x" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

### Technical Community Call #2
<iframe width="560" height="315" src="https://www.youtube.com/embed/irRFUWtnfpw?si=BFAEfpNa2B_ahc3g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


## Something missing?
If you find issues with the documentation or have suggestions on how to improve the documentation or the project in general, please [file an issue for us](https://github.com/powerloom/docs), or email us at support@powerloom.io 

