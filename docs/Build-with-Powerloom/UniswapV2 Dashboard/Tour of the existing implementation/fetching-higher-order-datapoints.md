---
sidebar_position: 2
---

# Fetching higher order datapoints


This section details how to fetch and process higher-order data points in Pooler, focusing on project IDs related to Uniswap V2 pair contracts and their aggregates.

### Understanding Project IDs

Project IDs are unique identifiers in Pooler that correspond to specific pair contracts or aggregate datasets.

#### From Protocol State to Data Sources

1. **Protocol State Contract:** The protocol state contract on PowerLoom Protocol's blockchain maintains the list of all project IDs.
2. **Data Source Reference:** These project IDs are linked to specific data sources (e.g., smart contract addresses).

```python
# Example of fetching project IDs from the protocol state contract
protocol_state_contract = "0x..."
project_ids = fetch_project_ids(protocol_state_contract)
```

#### Project Configuration JSON

- **Config File:** `projects.json` defines project types and associated smart contract addresses.
- **Structure:**
  - `project_type`: Defines the type of project (e.g., 'UniswapV2Pair').
  - `projects`: Array of smart contract addresses.
  - `processor`: Specifies the data processing module.

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

#### Generating Project IDs

Project IDs are generated based on the `project_type` and smart contract addresses.

```python
def generate_project_id(project_type, contract_address):
    return f"{project_type}:{contract_address}"

# Example
project_id = generate_project_id("UniswapV2Pair", "0xABC...")
```

### Working with Project Types

1. **Pair Contracts:** Represents Uniswap V2 pair contracts.
2. **Aggregates:** Higher-order data points calculated from base data.

#### Fetching and Processing Data

- **Fetching Data:** Use the project ID to fetch data from the Pooler system.
- **Processing Data:** The specified processor in `projects.json` handles data transformation.

```python
# Fetching data for a project ID
data = pooler.fetch_data(project_id)

# Processing data using the specified processor
processed_data = process_data(data, PairTotalReservesProcessor)
```

## Conclusion

By following these steps, developers can efficiently fetch and process higher-order data points in Pooler, facilitating the development of insightful analytical tools and dashboards for DeFi platforms like Uniswap V2. This documentation aims to make the process more accessible and developer-friendly for hackathon participants and new contributors.