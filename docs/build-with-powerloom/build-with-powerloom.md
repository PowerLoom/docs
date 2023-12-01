---
sidebar_position: 3
---

# Building applications using Powerloom


Powerloom Protocol offers a versatile platform for developers to build various blockchain-based applications.

## Data Dashboards

Data Dashboards can leverage Powerloom to display blockchain data in an interactive and user-friendly format. They can visualize metrics such as Total Value Locked (TVL), token prices, and liquidity trends and can be customized as per the needs. 

[See UniswapV2 Dashboard in Action](https://uniswapv2.powerloom.io)

### Extending Pooler to implement new datapoints

The possibilities are endless with the diverse range of datasets you can implement. To illustrate this, we have a guide that that can help you! 

[Extending UniswapV2 Dashboard](/docs/build-with-powerloom/uniswapv2-dashboard/extending-uniswapv2-dashboard.md)


---

#### Trading Bots

Trading bots can utilize Powerloom's real-time data to make automated trading decisions based on predefined algorithms or market signals.

#### On-chain Activity Trackers

Build on-chain tracker to monitor and report blockchain activities like transactions, smart contract interactions, and network changes.

---

## Development Instructions

If you are planning to take up the development on Powerloom, here's quick intructions to get started: 

We have dedicated [Deploy](https://github.com/powerloom/deploy) repo that packages all of the components and help you run things seemlessly. For Developers, you can get started with the Deploy repo with a simple command: `./build-dev.sh`. 

For Pooler to work properly, it needs certain configuration files:

- You need a file named `settings.json` in the `pooler/auth/settings` folder. To set this up, just copy the file [`config/auth_settings.example.json`](https://github.com/PowerLoom/pooler/blob/main/config/auth_settings.example.json) to `config/auth_settings.json`. This step sets up security for Pooler's main API.
- 
- settings files in `config/`
[`config/projects.json`](https://github.com/PowerLoom/pooler/blob/main/config/projects.example.json): Each entry in this configuration file defines the most fundamental unit of data representation in Powerloom Protocol, that is, a project. It is of the following schema

```json

{
    "project_type": "snapshot_project_name_prefix_",
    "projects": ["array of smart contract addresses"], // Uniswap v2 pair contract addresses in this implementation
    "preload_tasks":[
      "eth_price",
      "block_details"
    ],
    "processor":{
        "module": "snapshotter.modules.uniswapv2.pair_total_reserves",
        "class_name": "PairTotalReservesProcessor" // class to be found in module snapshotter/modules/pooler/uniswapv2/pair_total_reserves.py
    }
}

```

-   Copy over  [`config/projects.example.json`](https://github.com/PowerLoom/pooler/blob/main/config/projects.example.json)  to  `config/projects.json`. For more details, read on in the  [UniswapV2 Dashboard Implementation](../build-with-powerloom/uniswapv2-dashboard/index.md) for this current implementation.

In Pooler, `config/aggregator.json` is a file that outlines different types of data aggregation tasks performed over a span of snapshots. To set this up:

- **Setting Up:** Start by copying `config/aggregator.example.json`((https://github.com/PowerLoom/pooler/blob/main/config/aggregator.example.json)) to `config/aggregator.json`.

- **Calculating Time Span:** The time span for data aggregation is based on the epoch size and block time of the data source network.

-  **Example Configuration:** 
   - **Goal:** To calculate total trade volume over 24 hours for a specific trading pair.
   - **Key Setting (`aggregate_on`):** Set to `SingleProject` for focusing on one trading pair.
   - **Filters:** Specify which project ID to target for the snapshot.
   - **Trigger:** The snapshot is built when a `SnapshotFinalized` event occurs for the chosen project ID.
   - **Worker Activation:** Configured in the `processor` section. For example, for the project ID `pairContract_trade_volume:0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc:UNISWAPV2`, it activates the `AggreagateTradeVolumeProcessor`.

- **Configuration Example:**
   ```json
   {
       "config": [
           {
               "project_type": "aggregate_pairContract_24h_trade_volume",
               "aggregate_on": "SingleProject",
               "filters": {
                   "projectId": "pairContract_trade_volume"
               },
               "processor": {
                   "module": "snapshotter.modules.uniswapv2.aggregate.single_uniswap_trade_volume_24h",
                   "class_name": "AggreagateTradeVolumeProcessor"
               }
           }
       ]
   }
   ```


The following configuration generates a collection of data sets of 24 hour trade volume as calculated by the worker above across multiple pair contracts. This can be seen by the  `aggregate_on`  key being set to  `MultiProject`. *  `projects_to_wait_for`  specifies the exact project IDs on which this collection will be generated once a snapshot build has been achieved for an  [`epochId`](../protocol/specifications/epoch.md).

```json

{
    "config": [
        "project_type": "aggregate_24h_top_pairs_lite",
        "aggregate_on": "MultiProject",
        "projects_to_wait_for": [
            "aggregate_pairContract_24h_trade_volume:0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc:UNISWAPV2",
            "pairContract_pair_total_reserves:0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc:UNISWAPV2",
            "aggregate_pairContract_24h_trade_volume:0xae461ca67b15dc8dc81ce7615e0320da1a9ab8d5:UNISWAPV2",
            "pairContract_pair_total_reserves:0xae461ca67b15dc8dc81ce7615e0320da1a9ab8d5:UNISWAPV2",
            "aggregate_pairContract_24h_trade_volume:0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852:UNISWAPV2",
            "pairContract_pair_total_reserves:0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852:UNISWAPV2",
            "aggregate_pairContract_24h_trade_volume:0x3041cbd36888becc7bbcbc0045e3b1f144466f5f:UNISWAPV2",
            "pairContract_pair_total_reserves:0x3041cbd36888becc7bbcbc0045e3b1f144466f5f:UNISWAPV2",
            "aggregate_pairContract_24h_trade_volume:0xd3d2e2692501a5c9ca623199d38826e513033a17:UNISWAPV2",
            "pairContract_pair_total_reserves:0xd3d2e2692501a5c9ca623199d38826e513033a17:UNISWAPV2",
            "aggregate_pairContract_24h_trade_volume:0xbb2b8038a1640196fbe3e38816f3e67cba72d940:UNISWAPV2",
            "pairContract_pair_total_reserves:0xbb2b8038a1640196fbe3e38816f3e67cba72d940:UNISWAPV2",
            "aggregate_pairContract_24h_trade_volume:0xa478c2975ab1ea89e8196811f51a7b7ade33eb11:UNISWAPV2",
            "pairContract_pair_total_reserves:0xa478c2975ab1ea89e8196811f51a7b7ade33eb11:UNISWAPV2"
        ],
        "processor": {
            "module": "snapshotter.modules.uniswapv2.aggregate.multi_uniswap_top_pairs_24h",
            "class_name": "AggreagateTopPairsProcessor"
        }
    ]
}
```

To set up Pooler:

1. **Starting Point:** Use the workers and contracts as they are in the example files.

2. **Main Configuration (`config/settings.json`):**
   - Copy `config/settings.example.json` to `config/settings.json`. [Example file here](https://github.com/PowerLoom/pooler/blob/main/config/settings.example.json).
   - Key settings to configure:
     - `instance_id`: Your node's unique public key for joining the network. Get this after your application is approved (see the [deploy repository](https://github.com/PowerLoom/deploy)).
     - `namespace`: A unique identifier for your project's activities around which all consensus activity takes place.
     - **RPC Settings:** Set up URLs and rate limits for RPC services. 
       -  **Rate limiting** - Rate limits are service provider specific, different RPC providers have different rate limits. Example rate limit config for a node looks something like this
       `"100000000/day;20000/minute;2500/second"`

       - `rpc.full_nodes`: This will correspond to RPC nodes for the chain on which the data source smart contracts live (for eg. Ethereum Mainnet, Polygon Mainnet, etc).
       - `anchor_chain_rpc.full_nodes`: This will correspond to RPC nodes for the anchor chain on which the protocol state smart contract lives (Prost Chain).
       - `protocol_state.address`: Address of the protocol state smart contract on the anchor chain. The ABI is in [`ProtocolContract.json`](https://github.com/PowerLoom/pooler/blob/main/pooler/static/abis/ProtocolContract.json).

## Monitoring and Debugging

Login to the pooler docker container using  `docker exec -it deploy-boost-1 bash`  (use  `docker ps`  to verify its presence in the list of running containers) and use the following commands for monitoring and debugging

-   To monitor the status of running processes, you simply need to run  `pm2 status`.
-   To see all logs you can run  `pm2 logs`
-   To see logs for a specific process you can run  `pm2 logs <Process Identifier>`
-   To see only error logs you can run  `pm2 logs --err`

