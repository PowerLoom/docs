---
sidebar_position: 1
---

# Preloading

Preloaders perform an important function of fetching low-level data for eg. block details, and transaction receipts so that subsequent base snapshot building can proceed without performing unnecessary redundant queries against the data source smart contracts.

Each project type within the project configuration as found in [config/projects.json](https://github.com/PowerLoom/pooler/blob/5e7cc3812074d91e8d7d85058554bb1175bf8070/config/projects.example.json#L3-L12) can specify the preloaders that their base snapshot builds depend on. Once the dependent preloaders have completed their fetches, the Processor Distributor subsequently triggers the base snapshot builders for each project type.

```json
{
  "config": [{
      "project_type": "pairContract_pair_total_reserves",
      "preload_tasks":[
        "eth_price",
        "block_details"
      ],
      "projects":[
      ]
  }]
}
```

## Interface

The preloaders implement one of the following two generic interfaces

### `GenericPreloader`

