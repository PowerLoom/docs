---
sidebar_position: 5
---

# Data market specific implementations

![Submodule architecture of snapshotter](/images/submodule_architecture.png)

The Snapshotter Peer is designed with a modular and highly configurable architecture, allowing for easy customization and seamless integration with a diverse set of data markets.

## Snapshotter Core

This foundational component defines all the essential interfaces and handles a wide range of tasks, from listening to epoch release events to distributing tasks and managing snapshot submissions. Read more about it in the detailed section on its [components](/docs/protocol/specifications/snapshotter/components).


## Data market specific

Use case specific logic of generating snapshots as well as other configuration are available as [Git submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules) which can be pulled in as desired. Presently you can find diverse use cases that serve customized datapoints and track activity for the following across multiple data source chains like Ethereum Mainnet, Polygon zkEVM, Polygon PoS etc.

* DEXs like Uniswap v2, Quickswap
* Bridges like bungee.exchange, Owlto finance

The architecture has been designed to facilitate the seamless interchange of configuration and modules. Adapting the system to different use cases is as straightforward as changing a Git branch.

You can observe the corresponding branches within [snapshotter-configs](https://github.com/PowerLoom/snapshotter-configs/) and [snapshotter-computes](https://github.com/PowerLoom/snapshotter-computes/) repos:

* `eth_uniswapv2`
* `eth_uniswapv2_5_pairs` in `snapshotter-configs` that corresponds to `eth_uniswapv2_lite` in `snapshotter-computes`
* `zkevm_quests`

### Configuration Files

Configuration files, located in the `/config` directory are linked to [snapshotter-configs](https://github.com/PowerLoom/snapshotter-configs/) repo, play a pivotal role in defining project types, specifying paths for individual compute modules, and managing various project-related settings.


### Compute Modules

The heart of the system resides in the `snapshotter/modules` directory that's linked to [snapshotter-computes](https://github.com/PowerLoom/snapshotter-computes/), where the actual computation logic for each project type is defined. These modules drive the snapshot generation process for specific project types.


# Useful links

* [Snapshot generation specifications](/docs/protocol/specifications/snapshotter/snapshot-build)
* [Data markets and sources](/docs/protocol/data-sources)
* [Composition of snapshots and higher order datapoints](/docs/protocol/data-composition)