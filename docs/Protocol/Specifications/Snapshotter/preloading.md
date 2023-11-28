---
sidebar_position: 1
---

# Preloading

Preloaders perform an important function of fetching low-level data for eg. block details, and transaction receipts so that subsequent base snapshot building can proceed without performing unnecessary redundant calls that ultimately save on access costs on RPC and other queries on the underlying node infrastructure for the source data blockchain.

Each project type within the project configuration as found in config/projects.json can specify the preloaders that their base snapshot builds depend on. Once the dependent preloaders have completed their fetches, the Processor Distributor subsequently triggers the base snapshot builders for each project type.

```json reference
https://github.com/PowerLoom/pooler/blob/5e7cc3812074d91e8d7d85058554bb1175bf8070/config/projects.example.json#L3-L12
```

