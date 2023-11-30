---
sidebar_position: 0
---

# Introduction

## Pooler - UniswapV2 Data Market

Pooler is a Uniswap-specific implementation within the PowerLoom Protocol ecosystem, designed as a snapshotter. It functions by synchronizing with other snapshotter peers over a smart contract on the PowerLoom Protocol testnet. This architecture, guided by state transitions, is both easily comprehensible and modifiable.

:::tip
**Pooler in a Nutshell:**

Forex, the foreign exchange market, involves currency trading and is known for its high liquidity and 24/7 operation. Pooler, in a parallel sense, operates continuously, capturing snapshots of Uniswap trades. Like Forex traders who analyze currency fluctuations to make profits, Pooler users can analyze trade volumes, liquidity reserves, and other metrics to understand market trends and potential profits in the Uniswap market.

In essence, Pooler is to Uniswap what Forex platforms are to currency trading – a tool for real-time tracking and analysis, facilitating better understanding and potentially profitable decision-making in the dynamic world of cryptocurrency trading.
:::

![Uniswap Dashboard Rendering](/images/dashboard-rendering.png)

### How it works
Let's explore the details of the Pooler implementation. The image provided illustrates the operational flow of the UniswapV2 Dashboard as it functions via Powerloom's snapshotter network.

#### Undestanding each element:

- **The UniswapV2 Dashboard**:Experience our tailored UniswapV2 Dashboard, which displays specific data points for selected token pairs. Visit the dashboard at [uniswapv2.powerloom.io](https://uniswapv2.powerloom.io).

- **Calls against Aggregate project ID (E.g. 24h top pairs)**: This is an API call made to the Powerloom network to retrieve aggregated data, such as the top trading pairs over the past 24 hours. The 'project ID' is an unique identifier for the specific data request.

- **Core API webserver**: This component is a webserver that's part of a backend service. It's responsible for handling API requests.

- **Foundation hosted node**: This node is a part of the Powerloom network infrastructure, hosted by the Powerloom Foundation. It's one of the points where the API server can connect to get blockchain data.

- **Redis cache**: Redis is an in-memory data structure store, used as a database, cache, and message broker. Here, it is used to cache data, to improve the performance of the dashboard by quickly accessing frequently requested data without needing to repeatedly fetch it from the primary data source.

- **Query against Aggregate project ID**: Similar to the second element, this represents a query made to the Powerloom network using the project ID to fetch aggregated data.

- **Powerloom chain Deployed contract**: This is a smart contract deployed on the Powerloom chain.
  
- **CID**: 'CID' stands for Content Identifier, used by the IPFS network (InterPlanetary File System). It indicates that once the data is validated and finalized by the Powerloom network, it is assigned a CID and can be stored and accessed on IPFS.

- **IPFS**: IPFS is a protocol and peer-to-peer network for storing and sharing data in a distributed file system. In this context, IPFS is used to distribute and store the snapshots of data created by the Powerloom network.

#### Workflow: 
1. The user accesses the Uniswap v2 dashboard through uniswap2.powerloom.io.
2. The dashboard makes calls to the Powerloom network to get the latest aggregated data.
3. These calls are handled by the core_api.py webserver, which interacts with the foundation hosted nodes.
4. The foundation nodes fetch the relevant data from the blockchain and the Redis cache to optimize the response times.
5. Once the data is retrieved, it is further aggregated and validated, then stored on the IPFS network with a unique CID for easy retrieval.



### Data Points and Aggregated Metrics in Pooler

Data points are key metrics sourced from Uniswap V2 pair contracts, detailing how token trades are conducted. Our Pooler system processes this data into aggregated metrics, providing an overview of market trends, such as trade frequencies and average prices. These insights aid users in understanding market movements and asset performance, crucial for informed trading decisions within Uniswap V2.

 For an in-depth look, visit [Tour of Existing Implementation](../UniswapV2%20Dashboard/Tour%20of%20the%20existing%20implementation/index.md).


---
### Pooler APIs

The Core API is a crucial element, allowing access to finalized protocol states on the anchor chain’s smart contract. Pooler’s functionality can be observed in action through the Uniswap v2 dashboards, like [uniswapv2.powerloom.io](https://uniswapv2.powerloom.io/), powered by the Pooler foundation's API. 

Access [Pooler API Documentation](../Pooler-API-Docs/)

---

### Development and Extension

Pooler’s design enables extensions and custom use case implementations. It offers a detailed guide for extending its capabilities, particularly with Uniswap v2 data points. Developers can add new configurations and data models as needed, ensuring Pooler’s adaptability to various requirements. We have a dedicated section in the documentation which walkthrough the details on further implementation and usecases

Check out our guide on [Extending UniswapV2 Dashboard](/docs/Build-with-Powerloom/UniswapV2%20Dashboard/Extending-Uniswapv2-Dashboard.md)