---
sidebar_position: 2
---

# Fetching higher order datapoints


This section details how to fetch and process higher-order data points in Pooler, focusing on project IDs related to Uniswap V2 pair contracts and their aggregates.

## Understanding Project IDs

Project IDs are unique identifiers in Pooler that correspond to specific pair contracts or aggregate datasets.

1. **Protocol State Contract:** The protocol state contract on PowerLoom Protocol's blockchain maintains the list of all project IDs.
2. **Data Source Reference:** These project IDs are linked to specific data sources (e.g., smart contract addresses).


### Project Configuration 

  #### Config File: `projects.json` defines project types and associated smart contract addresses.
  - **Structure:**
-   `project_type`  - unique identifier prefix for the usecase,  [used to generate project ID](../../../Protocol/Specifications/Snapshotter/snapshot_build.md)
-   `projects` - smart contracts to extract data from, pooler can generate different snapshots from multiple sources as long as the Contract ABI is same
-   `processor` - the actual compuation logic reference, while you can write the logic anywhere, it is recommended to write your implementation in pooler/modules folder
```json reference
https://github.com/PowerLoom/pooler/blob/1452c166bef7534568a61b3a2ab0ff94535d7229/config/projects.example.json#L1-L35
```

```json
{
  "project_type": "UniswapV2Pair",
  "projects": ["0xABC...", "0xDEF..."],
  "processor": {
    "module": "snapshotter.modules.uniswapv2.pair_total_reserves",
    "class_name": "PairTotalReservesProcessor"
  }
}
```

There's currently no limitation on the number or type of usecases you can build using snapshotter. Just write the Processor class and pooler libraries will take care of the rest.

## Core APIs

This component is one of the most important and allows you to access the finalized protocol state on the smart contract running on the anchor chain. Find it in  [`core_api.py`](https://github.com/PowerLoom/pooler/blob/main/pooler/core_api.py).

The  [pooler-frontend](https://github.com/powerloom/pooler-frontend)  that serves the Uniswap v2 dashboards hosted by the PowerLoom foundation on locations like  [https://uniswapv2.powerloom.io/](https://uniswapv2.powerloom.io/)  is a great example of a frontend specific web application that makes use of this API service.

Among many things, the core API allows you to  **access the finalized CID as well as its contents at a given epoch ID for a project**.

The main endpoint implementations can be found as follows:

```python reference
https://github.com/PowerLoom/pooler/blob/5e7cc3812074d91e8d7d85058554bb1175bf8070/snapshotter/core_api.py#L186-L268
```

```python reference
https://github.com/PowerLoom/pooler/blob/5e7cc3812074d91e8d7d85058554bb1175bf8070/snapshotter/core_api.py#L273-L324
```

The first endpoint in GET /last_finalized_epoch/{project_id} returns the last finalized EpochId for a given project ID and the second one is GET /data/{epoch_id}/{project_id}/ which can be used to return the actual snapshot data for a given EpochId and ProjectId.

These endpoints along with the combination of a bunch of other helper endpoints present in Core API can be used to build powerful Dapps and dashboards.

You can observe the way it is used in pooler-frontend repo to fetch the dataset for the aggregate projects of top pairs trade volume and token reserves summary:

```js
try {
      response = await axios.get(API_PREFIX+`/data/${epochInfo.epochId}/${top_pairs_7d_project_id}/`);
      console.log('got 7d top pairs', response.data);
      if (response.data) {
        for (let pair of response.data.pairs) {
          pairsData7d[pair.name] = pair;
        }
      } else {
        throw new Error(JSON.stringify(response.data));
      }
    }
    catch (e){
      console.error('7d top pairs', e);
    }
```

Check out our [Pooler API Docs](../../../Pooler-API-Docs/) for more information.

Coming up, we're going to have a closer look at snapshot datasets in Pooler. You'll learn how they are made and how to get data from them. 